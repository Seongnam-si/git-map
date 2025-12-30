export type CityStat = {
	city: string;
  count: number;
  percentage: number;
};

export type GitMapStats = {
  total: number;
  cities: CityStat[];
};

type FetchStatsParams = {
  endpoint: string; 
  apiKey: string;   
};

const fetchCityStats = async ({
	endpoint,
	apiKey
}: FetchStatsParams): Promise<GitMapStats> => {
	const res = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			api_key: apiKey
		})
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(
			`Failed to fetch stats_cities ${res.status}= ${text}`
		);
	}

	const data = (await res.json()) as GitMapStats;

	if (!data || !Array.isArray(data.cities)) {
		throw new Error("Invalid stats_cities response");
	}

	return data;
};

export default fetchCityStats;
