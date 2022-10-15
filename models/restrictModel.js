import { Schema, model } from "mongoose";

const restrictSchema = new Schema( {
    registerdAt: {
        type: Date,
        expires: 60 * 60,
        default: Date.now()
    },
    current_ip: {
        type: String,
        require: true,
        unique: true
    },
    until_restrict: {
        type: Number,
        require: false,
        default: 7
    }

} );

const restrictModel = new model( "restrict", restrictSchema );
export default restrictModel;