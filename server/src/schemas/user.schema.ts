// based on https://brianflove.com/2016/10/04/typescript-declaring-mongoose-schema-model/
import { Document, Schema, Model, model} from "mongoose";
import { IUser } from "../models";

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
    //TODO: salt and hash password
    this.hashedPassword = password;
};

UserSchema.methods.validatePassword = function(password: string): boolean {
    //TODO: salt and hash password
    return this.hashedPassword === password;
}
  
export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);