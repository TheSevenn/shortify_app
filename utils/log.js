import { node_env } from "./constants.js";

export const log = ( document, file_name, at_line ) => {
    if( node_env === "DEV" )
        console.log( "output is: ", document, " at line: ", at_line, " in file: ", file_name );
}

const loger = console.log;
import path from "path";

function line( num = 2 ) {
    const e = new Error();
    const regex = /\((.*):(\d+):(\d+)\)$/
    const match = regex.exec( e.stack.split( "\n" )[ num ] );
    const filepath = match[ 1 ];
    const fileName = path.basename( filepath );
    const line = match[ 2 ];
    const column = match[ 3 ];
    return {
        filepath,
        fileName,
        line,
        column,
        str: `${getTime()} - ${fileName}:${line}:${column}`
    };
}