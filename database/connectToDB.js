import { connect } from "mongoose";

export const connectToDB = ( mongo_uri ) => {
    try {
        connect( mongo_uri, { useNewUrlParser: true } ).then( connected => console.log( "connected to databasea:", connected.connection.name ) );
    } catch( error ) {
        console.log( error.message, " in connectDB" );
    }
}
