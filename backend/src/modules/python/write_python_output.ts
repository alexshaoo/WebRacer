import path from "path";
import fs from "fs";

const wipePythonCodeData = () => {
	//Write the default data to the file, so the next request has a clean palet.
	const filePath = path.join(__dirname, "../../../mvp_database/test_output.json");
	let defaultOutput = {
		tests: [],
		errors: [],
		complete: false
	}
	if (!fs.existsSync(filePath)) fs.appendFileSync(filePath, JSON.stringify(defaultOutput));
	fs.writeFileSync(filePath, JSON.stringify(defaultOutput));
}

export { wipePythonCodeData};