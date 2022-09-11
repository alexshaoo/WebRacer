import path from "path";
import fs  from "fs";
import {Request, Response} from "express";
import {javascriptQuestionType, convertToJavascriptQuestionType, getNumJavascriptQuestions} from "../../modules/javascript/javascript_questions";
import {response, responseInterface} from "../../models/response"; //Created pre-formatted uniform response
import { validateOutput } from "../../modules/javascript/check_javascript_output";
import { runJavascript } from "../../modules/javascript/run_javascipt";

interface codeOutputType {
	outputs: any[];
	errors: any[];
	results: any[];
	times: number[];
}

const getExampleCode = (question:string) => {
	const filePath = path.join(__dirname, "./example_code/", question+".js");
	if (!fs.existsSync(filePath)) return false;
	return fs.readFileSync(filePath).toString();
}

const javascriptTest = async (req: Request, res: Response) => {
	let result:responseInterface = new response(); //Create new standardized response
	let questionId = req.query.question;
	let question:javascriptQuestionType = "a1";
	if (questionId==undefined) result.errors.push("question query required");
	else {
		let conversionResult = convertToJavascriptQuestionType(questionId.toString())
		if (!conversionResult.success) {
			result.errors.push("question not found");
			result.status = 404;
		} else question = conversionResult.question;
	}
	let code = getExampleCode(question);
	if (!code) {
		result.status = 404;
		result.errors.push("test not found");
	}
	if (result.errors.length==0) { //If nothing has gone wrong up to this point
		let codeOutput:codeOutputType;
		if (!code) code = "";
		codeOutput = await runJavascript(question, code); //Runs the code, returns the number of tests being run
		let testResults = await validateOutput(codeOutput.outputs, question)
		let responseList = [];
		for (let i=0; i<getNumJavascriptQuestions(question); i++){
			if (codeOutput.errors[i] && !testResults[i].success) responseList.push({
				test: i,
				success: testResults[i].success,
				error: codeOutput.errors[i],
				time: codeOutput.times[i]
			});
			else responseList.push({
				test: i,
				success: testResults[i].success,
				time: codeOutput.times[i]
			});
		}
		result.response = responseList;
		result.status = 200;
		result.success= true;
	} 
	res.status(result.status).json(result); 
}

export {javascriptTest};