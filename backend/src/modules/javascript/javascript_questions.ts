const javascriptQuestions = { //Object for setting questions
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
			"hellohello",
			"6969",
			"6969"
		],
		hints: [
			"Make sure to convert to a type that can be concatenated"
		]
	},
	"a2" : {
		question: "Add two numbers",
		inputFormat: "input = {a:number, b: number}",
		maxTime: 0.5,
		inputs: [
			{a:1, b:5},
			{a:5, b:-3},
			{a:69, b:-100},
		],
		outputs: [
			6,
			2,
			-31
		],
		hints: [
			"Watch out for negative numbers!"
		]
	},
	"a3" : {
		question: "Find username in list. Remove any test formatting that a user could enter accidentally",
		inputFormat: "input = {users:[], username: string}",
		maxTime: 0.5,
		inputs: [
			{users:["Amy", "Bridget", "Chris", "Dave"], username:"Amy"},
			{users:["Amy", "Bridget", "Chris", "Dave"], username:"Dave "},
			{users:["Amy", "Bridget", "Chris", "Dave"], username:"Evan"},
			{users:["Amy", "Bridget", "Chris", "Dave", "Evan", "Fred", "Greg", "Harry"], username:"Dave\n"},
		],
		outputs: [
			true,
			true,
			false,
			true
		],
		hints: [
			"Whitespace should be removed before checking!"
		]
	}
}

//Create javascript question type for secure type validation
const javascriptQuestionList = ["a1", "a2", "a3"] as const;
type javascriptQuestionType = typeof javascriptQuestionList[number]; 

const getJavascriptQuestionInput = (question:javascriptQuestionType) => {return javascriptQuestions[question].inputs;}
const getJavascriptQuestionTime = (question:javascriptQuestionType) => {return javascriptQuestions[question].maxTime;}
const getJavascriptQuestionOutput = (question:javascriptQuestionType) => {return javascriptQuestions[question].outputs;}
const getNumJavascriptQuestions = (question:javascriptQuestionType) => {return javascriptQuestions[question].inputs.length;}

const convertToJavascriptQuestionType = (testQuestion:string) => {
	let success = false;
	let question:javascriptQuestionType = "a1";
	javascriptQuestionList.forEach((qName:javascriptQuestionType) => {
		if (qName===testQuestion) {success = true; question = qName;}
	})
	return {question: question, success: success}
}

export{getNumJavascriptQuestions, getJavascriptQuestionInput, getJavascriptQuestionTime, getJavascriptQuestionOutput, javascriptQuestionType, convertToJavascriptQuestionType};