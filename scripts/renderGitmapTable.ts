type CityStats = {
	city: string;
	count: number;
	percentage: number;
}

type GitmapStats = {
	total: number;
	cities: CityStats[];
}

const BAR_WIDTH = 10;

const renderGitmapTable = (stats: GitmapStats | null): string => {
	if (!stats || !stats.cities || stats.cities.length === 0) {
		return  `🗺️ GitMap - My Coding Locations

_No commit data yet_`;
	}

	const header = `🗺️ GitMap - My Coding Locations`;

  const rows = stats.cities
    .slice(0, 5)
    .map(({ city, percentage }) => {
      const filled = Math.round((percentage / 100) * BAR_WIDTH);
      const empty = BAR_WIDTH - filled;
      const bar = "█".repeat(filled) + "░".repeat(empty);

      return `| ${city} | ${bar} ${percentage}% |`;
	});

  return [header, "" , ...rows].join("\n");
};

export default renderGitmapTable;
