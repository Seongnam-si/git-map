type CityStats = {
	city: string;
	count: number;
	percentage: number;
}

type GitmapStats = {
	total: number;
	cities: CityStats[];
}

const renderGitmapTable = (stats: GitmapStats | null): string => {
	if (!stats || !stats.cities || stats.cities.length === 0) {
		return  `🗺️ GitMap - My Coding Locations

_No commit data yet_`;
	}

	const header = `🗺️ GitMap - My Coding Locations

| City | % |
|------|---|`;

  const rows = stats.cities
    .slice(0, 5)
    .map(({ city, percentage }) => `| ${city} | ${percentage}% |`)
    .join("\n");

  return `${header}
${rows}`;
};

export default renderGitmapTable;
