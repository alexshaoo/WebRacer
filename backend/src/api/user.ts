import {Request, Response, NextFunction} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import bcrypt from "bcrypt";
import {createToken} from "../auth/tokenFunctions";
import User from "../models/userSchema";

const buildPostBody = async (req: any) => {

	// Create the post request
	let exists = false;
	let undefinedParams: string[] = [];
	let body: any = {};
	["username", "password", "email"].forEach((param) => {
		if (req.body[param]==undefined) undefinedParams.push(param);
	});

	if (undefinedParams.length == 0) { 
		let hash = bcrypt.hashSync(req.body.password, 10);
		if (hash !== "0") {
			let postBody = {
				username: req.body.username,
				email: req.body.email,
				hash: hash,
			};
			body = postBody;
			exists = true;
		}
	}
	return {exists: exists, body: body, errors: undefinedParams};
};

const buildPutBody = async (req: any) => {
	
	// Create the put request
	let successful = false;
	let undefinedParams: string[] = [];
	let body: any = {};
	let id: any;

	try {
		id = req.body.id;
	} catch (e) {
		undefinedParams.push("id");
	}

	if (undefinedParams.length == 0) {
		console.log(Object.keys(req.body).length);
		for (var key in req.body) {
			if (key != "id") {
				body[key] = req.body[key];
			}
		}
		successful = true;
	}
	return {successful: successful, body: body, id: id, errors: undefinedParams};
};


/* register controller */
export default class userController {
	static async getUser(req: Request, res: Response, next: NextFunction) {
		let result:responseInterface = new response(); //Create new standardized response
		let username = req.query.username;
		try {
			let user = await User.findOne({username: username});
			if (user) {
				result.response = user;
				result.status = 200;
				result.success = true;
			} else {
				result.errors.push("user does not exist");
				result.status = 404;
			}
		} catch (e) {
			result.errors.push("isk");
		}
		//Get request code
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async postUser(req: Request, res: Response, next: NextFunction) {

		let result:responseInterface = new response(); //Create new standardized response
		let {exists, body, errors} = await buildPostBody(req);
		let newUser;
		if (exists) {
			try {
				newUser = new User(body);
				await newUser.save(); //Saves branch to mongodb
				let token = await createToken({username: body.username, email: body.email, hash: body.hash});
				result.success = true;
				result.status = 201;
				result.response = {
					token: token,
					result: newUser,
				};
			} catch (e: any) {
				result.status = 404;
				result.errors.push("Error creating new user", e);
			}
		} else {
			errors.forEach((error)=>result.errors.push("missing "+error));
		}
		res.status(result.status).json(result);
	}
	static async putUser(req: Request, res: Response, next: NextFunction) {

		let result:responseInterface = new response(); //Create new standardized response
		let {successful, body, id, errors} = await buildPutBody(req);
		let updatedUser;
		if (successful) {
			try {

				updatedUser = await User.findByIdAndUpdate(id, body);

				result.success = true;
				result.status = 201;
				result.response = updatedUser;
				// body.forEach((key) => {
				// 	if (key != "id") {

				// 	}
				// })
			} catch (e: any) {
				result.status = 404;
				result.errors.push("Error creatin g request", e);
			}
		} else {
			errors.forEach((error)=>result.errors.push("missing "+error));
		}
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async deleteUser(req: Request, res: Response, next: NextFunction) {
		let result:responseInterface = new response(); //Create new standardized response
		//Delete request code
		res.status(result.status).json(result); //Return whatever result remains
	}
}
