// setup env variables config
import dotenv from "dotenv";
dotenv.config();

// create express server 
import express from "express";
const app = express();

import router from "./routes/routes.js";
import { logger } from "./middlewares/logger.js";
import { mongo_uri } from "./utils/constants.js";
import { connectToDB } from "./database/connectToDB.js";

app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );
app.use( express.static( 'public' ) );
app.set( 'view engine', 'ejs' );

// connect to database
connectToDB( mongo_uri );

app.use( logger );
app.use( "/", router );

// listen at port 
const port = process.env.PORT || 5000;
app.listen( port, () => console.log( "running on:", port ) );