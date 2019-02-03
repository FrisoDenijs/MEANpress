import { Document, Schema, Model, model } from "mongoose";
import { randomBytes, pbkdf2 } from "crypto";

const saltLength = 32;
const hashIterations = 8;
const hashLength = 128;
const digest = 'sha512';

export interface IUser {
    username: string;
    password: string;
    salt: string;
}

export interface IUserModel extends IUser, Document {
    validatePassword(username: string, password: string): boolean;
    setPassword(username: string, password: string): void;
}

export var UserSchema: Schema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true
    },
    password: String,
    salt: String
});

UserSchema.methods.setPassword = function (password: string): void {
    randomBytes(saltLength, (err, buf) => {
        //TODO: log error
        this.salt = buf;
    })
    pbkdf2(password, this.salt, hashIterations, hashLength, digest, (err, derivedKey) => {
        //TODO: log error
        this.password = derivedKey;
    });
};

UserSchema.methods.validatePassword = function (password: string): boolean {
    let hash: any;
    pbkdf2(password, this.salt, hashIterations, hashLength, digest, (err, derivedKey) => {
        //TODO: log error
        hash = derivedKey;
    });
    return this.password === hash;
}