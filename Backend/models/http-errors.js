export class HttpErrors extends Error{
    constructor(message, errorCode){
        super(message);
        this.code = errorCode;
    }
}