
window.addEventListener( 'load', () => {
    const short_url = document.querySelector( "#short_url" );
    const copy_content = document.querySelector( "#copy_content" );
    copy_content.addEventListener( 'click', () => {
        navigator.clipboard.writeText( short_url.textContent.trim() ).then( copy_content.title = "copied" )
    } );
} );
function fetchUrl() {
    const shorten = document.querySelector( "#shorten" );
    const url = document.querySelector( "#url" );
    console.log( url, "indexjs", 8 );

    shorten.addEventListener( 'click', async ( e ) => {
        e.preventDefault();
        const response = await fetch( "http://localhost:5500/shortify", {
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify( { original_url: url.value } ), method: 'POST'
        } );
        console.log( response );
    } );
}