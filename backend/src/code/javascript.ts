import {runJavascript} from "../modules/javascript/run_javascipt";
import {Request, Response} from "express";
import {javascriptQuestionType, convertToJavascriptQuestionType, getNumJavascriptQuestions} from "../modules/javascript/javascript_questions";
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {validateOutput} from "../modules/javascript/check_javascript_output";

interface codeOutputType {
	outputs: any[];
	errors: any[];
	results: any[];
	times: number[];
}

const postCode = async (req: Request, res: Response) => {
	let result:responseInterface = new response(); //Create new standardized response
	let questionId = req.query.question; //Get question id 
	let question:javascriptQuestionType = "a1"; //Set default value
	if (questionId==undefined) result.errors.push("question query required"); //Check if request send question
	else {
		let conversionResult = convertToJavascriptQuestionType(questionId.toString()); //Convert string into valid questionId
		if (!conversionResult.success) { //If question can't be converted,
			result.errors.push("question not found"); //The question doesn't exist
			result.status = 404;
		} else question = conversionResult.question; //If found, use question
	}
	const code = req.body.code; //Get user code
	if (!code) result.errors.push("code param required"); 
	if (result.errors.length==0) { //If nothing has gone wrong up to this point
		let codeOutput:codeOutputType;
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
};
export default postCode; 