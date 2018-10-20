// based on https://brianflove.com/2016/10/04/typescript-declaring-mongoose-schema-model/
import { Document, Schema, Model, model} from "mongoose";
import { IUser } from "../models";
import { randomBytes, pbkdf2 } from "crypto";

const saltLength = 32;
const hashIterations = 8;
const hashLength = 128;
const digest = 'sha512';

export interface IUserModel extends IUser, Document {
  setPassword(password: string): void;
  validatePassword(password: string): boolean;
}

export const UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true
    },
    hashedPassword: String,
    salt: String
});

UserSchema.methods.setPassword = function(password: string): void {
    randomBytes(saltLength, (err, buf) => {
        //TODO: log error
        this.salt = buf;
    })
    pbkdf2(password, this.salt, hashIterations, hashLength, digest, (err, derivedKey) => {
        //TODO: log error
        this.hashedPassword = derivedKey;
    });
};

UserSchema.methods.validatePassword = function(password: string): boolean {
    let hash: any;
    pbkdf2(password, this.salt, hashIterations, hashLength, digest, (err, derivedKey) => {
        //TODO: log error
        hash = derivedKey;
    });
    return this.hashedPassword == hash;
}
  
export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);