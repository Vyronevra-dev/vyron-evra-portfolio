const QUERY = `
query ($username: String!) {
  user(login: $username) {
    login
    contributionsCollection {
      contributionCalendar {
        totalContributions
        months { name year firstDay totalWeeks }
        weeks { contributionDays { date contributionCount contributionLevel weekday } }
      }
    }
  }
}`;

export default async function handler(req, res) {
    try {
        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
                "User-Agent": "Vyronevra-Portfolio"
            },
            body: JSON.stringify({ query: QUERY, variables: { username: "Vyronevra-dev" } })
        });

        const result = await response.json();

        if (!response.ok || result.errors || !result.data) {
            console.error("GitHub error:", result);
            return res.status(502).json({ error: "GitHub request failed." });
        }

        const cal = result.data.user.contributionsCollection.contributionCalendar;

        res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
        return res.status(200).json({
            totalContributions: cal.totalContributions,
            months: cal.months,
            days: cal.weeks.flatMap(w => w.contributionDays)
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Unable to load contributions." });
    }
}