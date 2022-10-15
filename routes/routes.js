import express from "express";
const router = express.Router();

import { url_shortify } from "../controllers/url_shortify.js";
import { short_url } from "../controllers/short_url.js";
import { restrict_request } from "../middlewares/restrict_request.js";

router.route( '/' ).get( restrict_request, ( req, res ) => {
    res.render( 'index', { short_url: null, original_url: null } )
} ).post( restrict_request, url_shortify );

router.get( '/:url_id', short_url );

export default router;