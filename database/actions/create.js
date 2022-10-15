
export const create_document = async ( document, model ) => {
    const newDocument = new model( {
        url_id: document.url_id.trim(),
        original_url: document.original_url.trim()
    } );
    const response = await newDocument.save();
    if( response ) return response;
    else return null;
}