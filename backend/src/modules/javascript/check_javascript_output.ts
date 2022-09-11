import { javascriptQuestionType, getJavascriptQuestionOutput} from "./javascript_questions";
import deepEqual from "deep-equal";

const validateOutput = (output:any[], question:javascriptQuestionType) => {
	let tests = []; 
	const validOutput = getJavascriptQuestionOutput(question); //Gets the valid output from the question
	for (let i=0; i<output.length; i++){ //For each test case
		if (deepEqual(validOutput[i], output[i])){
			tests.push({success: true})
		} else {
			tests.push({success: false})
		}
	}
	return tests;
}
export {validateOutput}