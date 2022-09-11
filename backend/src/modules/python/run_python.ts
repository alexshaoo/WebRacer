import {NodeVM}from 'vm2';
import path from "path";
import fs from "fs";

import { getPythonQuestionInput, pythonQuestionType } from './python_questions';


const runPython = async (question:pythonQuestionType, usercode:string) => {
	usercode = usercode.replace(/'/g, "\"");
	const vm = new NodeVM({
		require: {
			external: {
				modules: ["python-shell"],
				transitive: true
			},
			builtin:["fs", "path"]
		}
	});
	let input = getPythonQuestionInput(question); //get the input test values for the question
	if (!input) return -1; 

	const defaultOutput = {
		tests: [],
		errors: [],
		complete: false
	}
	const filePath = path.join(__dirname, "../../../mvp_database/test_output.json");
	if (!fs.existsSync(filePath)) fs.appendFileSync(filePath, JSON.stringify(defaultOutput));

	vm.run(`
		const path = require("path");
		const fs = require("fs");
		const {PythonShell} = require('python-shell');
		const defaultOutput = {
			tests: [],
			errors: [],
			complete: false
		}
		const usercode = '`+usercode+`';
		const filePath = '`+filePath+`';
		index = 0;
		final = true;
		input = `+JSON.stringify(input)+`
		for (let i=0; i<input.length; i++){
			let code = "input = " + JSON.stringify(input[i]) + ";" + usercode;
			PythonShell.runString(code, undefined, function (err, results) {
				let output = JSON.parse(fs.readFileSync(filePath).toString());
				if (output.tests.length>index || output.complete) output = defaultOutput;
				output.tests.push(results);
				output.errors.push(err);
				if (i+1==input.length) output.complete = true;
				fs.writeFileSync(filePath, JSON.stringify(output));
			});
		}
	`, 'run_python.ts');
	return input.length;
}

export {runPython};