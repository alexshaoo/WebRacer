import path from "path";
import fs  from "fs";
import {runHtml} from "../../modules/html/run_html";
import checkResult from "../../modules/html/check_html_output";
import {Request, Response} from "express";
import {htmlQuestionType, convertToHtmlQuestionType} from "../../modules/html/html_questions";
import {response, responseInterface} from "../../models/response"; //Created pre-formatted uniform response



const getExampleCode = (question:string) => {
	const filePath = path.join(__dirname, "./example_code/", question+".js");
	if (!fs.existsSync(filePath)) return false;
	return fs.readFileSync(filePath).toString();
}

const htmlTest = async (req: Request, res: Response) => {
	let result:responseInterface = new response(); //Create new standardized response
	let questionId = req.query.question;
	let question:htmlQuestionType = "a1";
	if (questionId==undefined) result.errors.push("question query required");
	else {
		let conversionResult = convertToHtmlQuestionType(questionId.toString())
		if (!conversionResult.success) {
			result.errors.push("question not found");
			result.status = 404;
		} else question = conversionResult.question;
	}
	const code = getExampleCode(question);
	if (!code) {
		result.status = 404;
		result.errors.push("test not found");
	}
	if (result.errors.length==0) {
		const startTime = new Date().getTime();
		let numTests:number;
		if (code) numTests = await runHtml(question, code);
		setTimeout(() => checkResult(req, res, result, numTests, startTime, question), 10);
	} else{
		res.status(result.status).json(result);
	}
}

export {htmlTest};