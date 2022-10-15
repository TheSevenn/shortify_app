import { read_document_by } from "../database/actions/read.js";
import urlModel from "../models/urlModel.js";

export const short_url = async ( req, res ) => {
    try {
        const url_id = req.params.url_id;
        const response = await read_document_by( url_id, "uid", urlModel );
        const original_url = response && response.original_url.substr( 0, 4 ) === "http" ? response.original_url : `https://${response.original_url}`;
        if( response && response.url_id && response.original_url )
            res.status( 200 ).redirect( `${original_url}` );
        else res.status( 404 ).render( 'errror', {
            status_code: '404',
            error_message: "cannot find what you are looking for",
            dev_qoute: "Ughh! after all we are humans not super heroes."
        } );
    } catch( error ) {
        console.log( error.message );
        res.render( 'error', {
            status_code: '500',
            error_message: "something went wrong on our side.",
            dev_qoute: "Huhh! looks like our developers are on vacation"
        } )
    }

}