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

class UserNotFoundError extends Error {
    constructor (message) {
        super(message);
        this.name = "UserNotFoundError";
    }
}

module.exports = {
    MissingFieldsError,
    InvalidUsernameError,
    UserNotFoundError,
}