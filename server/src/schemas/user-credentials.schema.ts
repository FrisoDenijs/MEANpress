import { Document, Schema, Model, model } from "mongoose";
import { randomBytes, pbkdf2 } from "crypto";

const saltLength = 32;
const hashIterations = 8;
const hashLength = 128;
const digest = 'sha512';

export interface IUserCredentials {
    username: string;
    hashedPassword: string;
    salt: string;
}

export interface IUserCredentialsModel extends IUserCredentials, Document {
    validatePassword(password: string): boolean;
    setPassword(password: string): void;
}

export var UserCredentialsSchema: Schema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true
    },
    password: String,
    salt: String
});

UserCredentialsSchema.methods.setPassword = function (password: string): void {
    randomBytes(saltLength, (err, buf) => {
        console.error(err);
        this.salt = buf.toString();
    });
    pbkdf2(password, this.salt, hashIterations, hashLength, digest, (err, derivedKey) => {
        console.error(err);
        this.hashedPassword = derivedKey;
    });
};

UserCredentialsSchema.methods.validatePassword = function (password: string): boolean {
    let hash: any;
    pbkdf2(password, this.salt, hashIterations, hashLength, digest, (err, derivedKey) => {
        //TODO: log error
        hash = derivedKey;
    });
    return this.hashedPassword === hash;
}

export const UserCredentials: Model<IUserCredentialsModel> = model<IUserCredentialsModel>("UserCredentials", UserCredentialsSchema);
