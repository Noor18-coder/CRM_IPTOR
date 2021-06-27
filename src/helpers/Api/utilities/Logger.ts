
export class Logger {

    static info(message:string, data?:any) {
        const date = new Date();
        console.info(date.toUTCString() + ': ' +  message , JSON.stringify(data));
    }

    static  trace(message:string, data:any) {
        const date = new Date();
        console.trace(date + ': '  +  message , JSON.stringify(data));
    }

    static  warn(message:string, data:any) {
        const date = new Date();
        console.warn(date + ': '  +  message , JSON.stringify(data));
    }
}
