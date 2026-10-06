const grid = document.getElementById("contributionGrid");
const monthsContainer = document.getElementById("months");
const totalElement = document.getElementById("total");
const activeDaysElement = document.getElementById("activeDays");
const streakElement = document.getElementById("streak");
const peakElement = document.getElementById("peak");
const errorElement = document.getElementById("errorMessage");

const contributionLevels = {
    NONE: "level-0",
    FIRST_QUARTILE: "level-1",
    SECOND_QUARTILE: "level-2",
    THIRD_QUARTILE: "level-3",
    FOURTH_QUARTILE: "level-4"
};

async function getContributions() {
    try {
        const response = await fetch("/api/contributions");

        if (!response.ok) {
            throw new Error("Unable to retrieve GitHub data.");
        }

        const data = await response.json();
        renderCalendar(data);
    } catch (error) {
        console.error(error);
        errorElement.style.display = "block";
    }
}

function renderCalendar(data) {
    renderMonths(data.months);
    renderContributionGrid(data.days);
    renderStatistics(data);
}

function renderMonths(months) {
    monthsContainer.innerHTML = "";

    months.forEach(month => {
        const monthElement = document.createElement("span");
        monthElement.className = "month";
        monthElement.textContent = month.name;
        monthElement.style.width = `${month.totalWeeks * 17}px`;
        monthsContainer.appendChild(monthElement);
    });
}

function renderContributionGrid(days) {
    grid.innerHTML = "";

    days.forEach(day => {
        const cell = document.createElement("div");
        const level = contributionLevels[day.contributionLevel];

        cell.className = `contribution-cell ${level}`;
        cell.dataset.date = formatDate(day.date);
        cell.dataset.count = day.contributionCount;

        cell.setAttribute(
            "aria-label",
            `${formatDate(day.date)}: ${day.contributionCount} contributions`
        );

        grid.appendChild(cell);
    });
}

function renderStatistics(data) {
    const days = data.days;

    const activeDays = days.filter(day => day.contributionCount > 0).length;
    const peak = Math.max(...days.map(day => day.contributionCount));
    const streak = calculateCurrentStreak(days);

    totalElement.textContent = data.totalContributions.toLocaleString();
    activeDaysElement.textContent = activeDays.toLocaleString();
    peakElement.textContent = peak.toLocaleString();
    streakElement.textContent = `${streak} day${streak === 1 ? "" : "s"}`;
}

function calculateCurrentStreak(days) {
    let streak = 0;
    let index = days.length - 1;

    // today may not have a commit yet, don't let that break the streak
    if (days[index].contributionCount === 0) {
        index--;
    }

    for (; index >= 0; index--) {
        if (days[index].contributionCount === 0) break;
        streak++;
    }

    return streak;
}

function formatDate(dateString) {
    return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

getContributions();
