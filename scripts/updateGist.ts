type CityStat = {
	city: string;
	count: number;
	percentage: number;
};

type StatsResponse = {
	total: number;
	cities: CityStat[];
};

const STATS_ENDPOINT = "https://wrbyuqqtpdrvudgtskaq.supabase.co/functions/v1/stats_cities";
const API_KEY = process.env.GITMAP_API_KEY!;
const GIST_ID = process.env.GITMAP_GIST_ID!;
const GITMAP_GIST_TOKEN = process.env.GITMAP_GIST_TOKEN!;
const BAR_WIDTH = 20;

if (!API_KEY || !GIST_ID || !GITMAP_GIST_TOKEN) {
  throw new Error("Missing required environment variables");
}

const renderBar = (percentage: number) => {
  const filled = Math.round((percentage / 100) * BAR_WIDTH);
  const empty = BAR_WIDTH - filled;
  return "█".repeat(filled) + "░".repeat(empty);
};

const renderMarkdown = (stats: StatsResponse) => {
  if (!stats.cities.length) {
    return "📍 **Gitmap – My Commit Locations**\n\n_No commit data yet_";
  }

  const lines = stats.cities.slice(0, 5).map((c, i) => {
    const index = String(i + 1).padStart(2, " ");
    const city = c.city.padEnd(10, " ");
    const commits = `${c.count} commits`.padEnd(10, " ");
    const bar = renderBar(c.percentage);
    const percent = `${c.percentage.toFixed(1)}%`.padStart(6, " ");

    return `${index} ${city} ${commits} ${bar} ${percent}`;
  });

  return [
    "📍 Gitmap – My Commit Locations",
    "",
    ...lines,
    "",
  ].join("\n");
};

const main = async () => {
	const statsRes = await fetch(STATS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
			api_key: API_KEY,
		}),
  });

  if (!statsRes.ok) {
    throw new Error(`Failed to fetch stats: ${statsRes.status}`);
  }

  const stats = (await statsRes.json()) as StatsResponse;
  const markdown = renderMarkdown(stats);

  const gistRes = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${GITMAP_GIST_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({
      files: {
        "gitmap.md": {
          content: markdown,
        },
      },
    }),
  });

  if (!gistRes.ok) {
    const text = await gistRes.text();
    throw new Error(`Failed to update gist: ${text}`);
  }
}

main().catch((err) => {
  console.error("❌ GitMap Gist update failed");
  console.error(err);
  process.exit(1);
});
