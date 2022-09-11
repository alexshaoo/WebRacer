const htmlQuestions = { //Object for setting questions
	"a1" : {
		question: "Concatenate input to itself",
		inputFormat: "input = {a:any}",
		maxTime: 0.5,
		inputs: [
			{a:"hello"},
			{a:"69"},
			{a:69},
		],
		outputs: [
			["hellohello"],
			["6969"],
			["6969"]
		],
		hints: [
			"Make sure to convert to a type that can be concatenated"
		]
	}
}

//Create javascript question type for secure type validation
const htmlQuestionList = ["a1"] as const;
type htmlQuestionType = typeof htmlQuestionList[number];  

const getHtmlQuestionInput = (question:htmlQuestionType) => {return htmlQuestions[question].inputs;}
const getHtmlQuestionTime = (question:htmlQuestionType) => {return htmlQuestions[question].maxTime;}
const getHtmlQuestionOutput = (question:htmlQuestionType) => {return htmlQuestions[question].outputs;}

const convertToHtmlQuestionType = (testQuestion:string) => {
	let success = false;
	let question:htmlQuestionType = "a1";
	htmlQuestionList.forEach((qName:htmlQuestionType) => {
		if (qName===testQuestion) {success = true; question = qName;}
	})
	return {question: question, success: success}
}


export{getHtmlQuestionInput, getHtmlQuestionTime, getHtmlQuestionOutput, htmlQuestionType, convertToHtmlQuestionType};