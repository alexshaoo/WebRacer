import path from "path";
import fs from "fs";
import {Request, Response} from "express";
import {getPythonQuestionTime, pythonQuestionType, getPythonQuestionOutput} from "./python_questions";
import {responseInterface} from "../../models/response"; //Created pre-formatted uniform response
import { wipePythonCodeData } from "./write_python_output";
import deepEqual from "deep-equal";



const validateOutput = (output:any[], question:pythonQuestionType) => {
	let tests = []; 
	const validOutput = getPythonQuestionOutput(question); //Gets the valid output from the question
	for (let i=0; i<output.length; i++){ //For each test case
		if (deepEqual(validOutput[i], output[i])){
			tests.push({
				test: i,
				success: true
			})
		} else {
			tests.push({
				test: i,
				success: false
			})
		}
	}
	return tests;
}



const checkPythonOutput = (req: Request, res:Response, result:responseInterface, numTests:number, startTime:number, question:pythonQuestionType):void => {
	let currentTime = new Date().getTime();
	//Check if the user code has exceeded max alloted time.
	if (startTime+getPythonQuestionTime(question)*1000<currentTime) { 
		result.status=200;
		result.success=true;
		result.response={success: false, output: "code timed out"};
		res.status(result.status).json(result);
		return;
	}
	//Get example_output file
	//This is a temporary solution, each user should have a unique file 
	//This unique file should be deleted once the request is done.
	const filePath = path.join(__dirname, "../../../mvp_database/test_output.json");
	let output = JSON.parse(fs.readFileSync(filePath).toString());
	if (output.tests.length == numTests) { //If all tests have been completed
		wipePythonCodeData(); //Clean file for next request
		result.response = {
			results: validateOutput(output.tests, question), //Get results of output
			time: (((currentTime-startTime)/1000).toString()+"s") //get the time it took them
		}
		result.status = 200;
		result.success = true;
		res.status(result.status).json(result);
	} else { //if not all tests are complete, wait 0.01 seconds and try again.
		setTimeout(() => checkPythonOutput(req, res, result, numTests, startTime+1, question), 10);
	}
}
export default checkPythonOutput