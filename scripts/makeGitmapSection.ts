const GITMAP_START = "<!-- GITMAP_START -->";
const GITMAP_END = "<!-- GITMAP_END -->";

const makeGitmapSection = (readme: string, newContent: string): string => {
	const pattern = new RegExp(
		`${GITMAP_START}[\\s\\S]*?${GITMAP_END}`,
    "m"
	);

	return readme.replace(
    pattern,
    `${GITMAP_START}\n${newContent}\n${GITMAP_END}`
  );
};

export default makeGitmapSection;
