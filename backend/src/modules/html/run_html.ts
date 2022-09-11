// const Sandbox = require("sandbox");
import {getHtmlQuestionInput, htmlQuestionType}  from "../html/html_questions";
interface codeOutput {
	result: any;
	console: any;
}

const runHtml = async (question: htmlQuestionType, usercode: string) => {
	// const sandbox = new Sandbox(); //Create new sandbox environment
	let input = getHtmlQuestionInput(question); //get the input test values for the question
	if (!input) return -1; 
	for (let i=0; i<input.length; i++){ 
		//Run each test
		//Declare our input variable, append user code.
		let code = "const input = " + JSON.stringify(input[i]) + ";\n" + usercode;
		//Use the sandbox to run user code
		//Callback function writes the results to json file
		console.log(code);
	}
	return input.length;
}

export {runHtml};