import crypto from "crypto";
import { read_document_by } from "../database/actions/read.js";
import { create_document } from "../database/actions/create.js";
import urlModel from "../models/urlModel.js";
import { log } from "../utils/log.js";
import { base_url } from "../utils/constants.js";

export const url_shortify = async ( req, res ) => {
    const original_url = req.body.original_url;
    const restrict_in = req.restrict_in;
    console.log( restrict_in );
    try {
        if( restrict_in > 0 ) {

            if( original_url ) {
                const response = await read_document_by( original_url, "url", urlModel );
                console.log( response );
                if( response && response.url_id ) {
                    res.status( 200 ).render( 'index', {
                        short_url: `${base_url}/${response.url_id}`,
                        original_url: response.original_url,
                        restrict_in: req.restrict_in
                    } );
                }
                else {
                    const url_patch = original_url.substring( 8 ).split( "/" )[ 0 ].substring( 2, 4 );
                    const url_uuid = crypto.randomUUID().split( "-" )[ 0 ].substring( 0, 5 );
                    const url_id = url_patch + url_uuid;
                    const response = await create_document( {
                        url_id: url_id,
                        original_url: original_url,
                        restrict_in: req.restrict_in
                    }, urlModel );
                    console.log( original_url, url_id, response );
                    if( response && response.url_id ) res.status( 200 ).render( 'index', {
                        short_url: `${base_url}/${response.url_id}`,
                        original_url: response.original_url
                    } );
                }
            } else res.status( 400 ).render( 'error', {
                status_code: '400',
                error_message: "it seems that your URL is invalid or empty",
                dev_qoute: "Ohh! looks like you forgot something?"
            } );
        } else res.status( 403 ).render( 'error', {
            status_code: '403',
            error_message: "You have exhausted your limit of 7 shortify/hour",
            dev_qoute: "Wow! now lets wait for an hour..."
        } );
    } catch( error ) {
        log( error.message, "url_shortify.js", 21 );
        res.status( 500 ).render( 'error', {
            status_code: '500',
            error_message: "something went wrong on our side.",
            dev_qoute: "Huh! looks like our developers are on vacation"
        } );
    }
}


/*.json( {
    "status": "true",
    "short_url": `${base_url}/shortify/${response.url_id}`
} )*/