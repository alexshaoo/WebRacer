import express from "express";
import cors from "cors";
import env from "dotenv";
// import path from "path";
import {response} from "./models/response"; //Created pre-formatted uniform response

const app = express();

env.config();
app.use(cors());
app.use(express.json());

// routes
import apiRoute from "./routes/api.route";
import authRoute from "./routes/auth.route";
import codeRoute from "./routes/code.route";
import testRoute from "./routes/test.route";

// api routing
app.use("/api", apiRoute);
app.use("/auth", authRoute);
app.use("/code", codeRoute);
app.use("/test", testRoute);


// default render to github page
app.get('/', (req, res) => {
	// res.redirect("zrwaite.github.io/WebRacer");
});

//Test that express is working in general
app.get("/testres", (req, res) => {
	let result = new response(200, [], {page: "test"}, true);
	res.status(result.status).json(result); //Return 200 result
});

//Once the frontend is integrated, this prevents the frontend from accessing backend files. 
app.get("/backend/*", (req, res) => {
	let result = new response(403, [], {response: "nice try buddy"});
	res.status(result.status).json(result); //Doesn't allow people access to backend files
});

app.get('/waiting-room', (req, res) => {
    // res.redirect("www.google.ca");
})

// app.get("/files/*", getFile);

export default app; //Export server for use in index.js
