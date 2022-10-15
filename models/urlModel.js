import { Schema, model } from "mongoose";

const UrlSchema = new Schema( {
    url_id: {
        type: String,
        require: true,
        unique: true
    },
    original_url: {
        type: String,
        require: true,
        unique: true
    }
    // short_url: {
    //     type: String,
    //     require: true,
    //     unique: true
    // }
} );

const urlModel = new model( 'urls', UrlSchema );
export default urlModel;