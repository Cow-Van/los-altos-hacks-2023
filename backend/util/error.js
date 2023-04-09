class MissingFieldsError extends Error {
    constructor (message) {
        super(message);
        this.name = "MissingFieldsError";
    }
}

class InvalidUsernameError extends Error {
    constructor (message) {
        super(message);
        this.name = "InvalidUsernameError";
    }
}

module.exports = {
    MissingFieldsError,
    InvalidUsernameError,
}