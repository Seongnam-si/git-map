import "dotenv/config";
import fs from "fs";
import path from "path";
import fetchCityStats from "./fetchCityStats";
import makeGitmapSection from "./makeGitmapSection";
import renderGitmapTable from "./renderGitmapTable";

const README_PATH = path.resolve(process.cwd(), "README.md");
const ENDPOINT = process.env.GITMAP_STATS_ENDPOINT;
const API_KEY = process.env.GITMAP_API_KEY;

if (!ENDPOINT || !API_KEY) {
	throw new Error("unfound env config");
}

const updateReadme = async () => {
	const readme = fs.readFileSync(README_PATH, "utf-8");
	const stats = await fetchCityStats({
		endpoint: ENDPOINT,
		apiKey: API_KEY
	});
	const table = renderGitmapTable(stats);
	const updated = makeGitmapSection(readme, table);

	fs.writeFileSync(README_PATH, updated);
};

updateReadme().catch((err) => {
	console.error("update failed: ", err);
	process.exit(1);
});
