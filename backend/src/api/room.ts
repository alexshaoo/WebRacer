import {Request, Response, NextFunction} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response

import Room from "../models/roomSchema";
import mongoose from "mongoose";


function addPlayerToRoom(user_id: number, room_id: number) {
	//change the second argument to appending
    // Room.updateOne({id:room_id},{Room.players: user_id})
}


/* register controller */
export default class roomController {
	static async getRoom(req: Request, res: Response, next: NextFunction) {
		let result:responseInterface = new response(); //Create new standardized response
		// let room = await Room.findOne({roomName: roomName});

		//Get request code
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async postRoom(req: Request, res: Response, next: NextFunction) {
		let result:responseInterface = new response(); //Create new standardized response
		//Post request code
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async putRoom(req: Request, res: Response, next: NextFunction) {
		let result:responseInterface = new response(); //Create new standardized response
		//Put request code
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async deleteRoom(req: Request, res: Response, next: NextFunction) {
		let result:responseInterface = new response(); //Create new standardized response
		//Delete request code
		res.status(result.status).json(result); //Return whatever result remains
	}
}
