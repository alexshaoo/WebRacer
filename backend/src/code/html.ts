import {runHtml} from "../modules/html/run_html";
// import checkResult from "../modules/javascript/check_javascript_output";
import {Request, Response} from "express";
import {htmlQuestionType, convertToHtmlQuestionType} from "../modules/html/html_questions";
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response

const postCode = async (req: Request, res: Response) => {
	let result:responseInterface = new response(); //Create new standardized response
	let questionId = req.query.question; //Get question id 
	let question:htmlQuestionType = "a1"; //Set default value
	if (questionId==undefined) result.errors.push("question query required"); //Check if request send question
	else {
		let conversionResult = convertToHtmlQuestionType(questionId.toString()); //Convert string into valid questionId
		if (!conversionResult.success) { //If question can't be converted,
			result.errors.push("question not found"); //The question doesn't exist
			result.status = 404;
		} else question = conversionResult.question; //If found, use question
	}
	const code = req.body.code; //Get user code
	if (!code) result.errors.push("code param required"); 
	// if (result.errors.length==0) { //If nothing has gone wrong up to this point
	// 	const startTime = new Date().getTime();
	// 	let numTests:number;
	// 	if (code) numTests = await runHtml(question, code); //Runs the code, returns the number of tests being run
	// 	//Waits 0.01 seconds, then sends first request for result.
	// 	setTimeout(() => checkResult(req, res, result, numTests, startTime, question), 100); 
	// } else 
	res.status(result.status).json(result); 
};
export default postCode; 
