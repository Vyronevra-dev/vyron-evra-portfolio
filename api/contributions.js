export default async function handler(req, res) {
    const query = `
    {
        user(login: "Vyronevra-dev") {
            contributionsCollection {
                contributionCalendar {
                    totalContributions
                }
            }
        }
    }`;

    const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    });

    const data = await response.json();
    const total = data.data.user.contributionsCollection.contributionCalendar.totalContributions;
    res.json({ total });
}