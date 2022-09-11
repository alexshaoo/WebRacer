class response {
    success: boolean; //Easy way for frontend to determine success
    status: number; //Http status code
    errors: string[]; //Array of errors
    response: object; //response is a wild card
    auth: object; //Auth will be token, false, etc.
    constructor(status=400, errors=[], response={}, success=false, auth={}) {
        this.success = success;
        this.status = status;
        this.auth = auth;
        this.errors = [];
        this.errors.push(...errors);
        this.response = response;
    }
}

interface responseInterface {
    success: boolean;
    status: number;
    errors: string[];
    response: object;
}

export {response, responseInterface}