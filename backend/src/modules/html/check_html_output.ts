import path from "path";
import fs from "fs";
import {Request, Response} from "express";
import {getHtmlQuestionTime, htmlQuestionType, getHtmlQuestionOutput} from "./html_questions";
import {responseInterface} from "../../models/response"; //Created pre-formatted uniform response

// const validateOutput = (output:objectJson, question:htmlQuestionType) => {
// }

const checkHtmlOutput = (req: Request, res:Response, result:responseInterface, numTests:number, startTime:number, question:htmlQuestionType):void => {
	let currentTime = new Date().getTime();
	//Check if the user code has exceeded max alloted time.
	if (startTime+getHtmlQuestionTime(question)*1000<currentTime) { 
		result.status=200;
		result.success=true;
		result.response={success: false, output: "code timed out"};
		res.status(result.status).json(result);
		return;
	}
	result.response = {
		results: "success", 
		time: (((currentTime-startTime)/1000).toString()+"s") //get the time it took them
	}
	result.status = 200;
	result.success = true;
	res.status(result.status).json(result);
}
export default checkHtmlOutput