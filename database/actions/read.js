
export const read_document_by = async ( original_url, type, model ) => {
    const response = await type === "url" ? model.findOne( { original_url: original_url } ) : model.findOne( { url_id: original_url } );
    if( response ) return response;
    else return null;
}
