import {runPython} from "../modules/python/run_python";
import checkPythonResult from "../modules/python/check_python_output";
import {Request, Response} from "express";
import {pythonQuestionType, convertToPythonQuestionType} from "../modules/python/python_questions";
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response

const postCode = async (req: Request, res: Response) => {
	let result:responseInterface = new response(); //Create new standardized response
	let questionId = req.query.question; //Get question id 
	let question:pythonQuestionType = "a1"; //Set default value
	if (questionId==undefined) result.errors.push("question query required"); //Check if request send question
	else {
		let conversionResult = convertToPythonQuestionType(questionId.toString()); //Convert string into valid questionId
		if (!conversionResult.success) { //If question can't be converted,
			result.errors.push("question not found"); //The question doesn't exist
			result.status = 404;
		} else question = conversionResult.question; //If found, use question
	}
	const code = req.body.code; //Get user code
	if (!code) result.errors.push("code param required"); 
	if (result.errors.length==0) { //If nothing has gone wrong up to this point
		const startTime = new Date().getTime();
		let numTests:number;
		if (code) numTests = await runPython(question, code); //Runs the code, returns the number of tests being run
		//Waits 0.01 seconds, then sends first request for result.
		setTimeout(() => checkPythonResult(req, res, result, numTests, startTime, question), 10); 
	}
	else res.status(result.status).json(result); //On failure, immediately send request
};
export default postCode; 
