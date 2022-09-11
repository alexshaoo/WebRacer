import {getJavascriptQuestionInput, javascriptQuestionType, getJavascriptQuestionTime}  from "../javascript/javascript_questions";
const {VM} = require('vm2');
interface responseOutput {
	success: boolean;
	times: number[];
	outputs: any[];
	errors: any[];
	results: any[];
}

const runJavascript = async (question: javascriptQuestionType, usercode: string) => {
	let response:responseOutput = {success: false, times: [], results: [], outputs: [], errors: []}
	const questionTime = getJavascriptQuestionTime(question)*1000;
	let input = getJavascriptQuestionInput(question); //get the input test values for the question
	if (!input) return response; 
	for (let i=0; i<input.length; i++){ 
		response.outputs.push(null);
		response.errors.push(null);
		response.results.push(null);
		//Create sandbox virtual machine:
		const vm = new VM({
			timeout: questionTime,
			sandbox: {},
			eval: false,
			fixAsync: true,
			wasm : false
		});
		//Run each test
		//Declare our input variable, append user code.
		let code = "const input = " + JSON.stringify(input[i]) + ";\n" + usercode;
		//Use the sandbox to run user code
		let startTime = (new Date()).getTime();
		try {
			let output = vm.run(code);
			response.outputs[i]=output;
		} catch (e){
			response.errors[i]=e;
		}
		let endTime = (new Date()).getTime();
		response.times.push((endTime-startTime)/1000);
	}	
	return response;
}

export {runJavascript};