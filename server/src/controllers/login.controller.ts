import { LoginRequest } from "../models";
import { UserCredentials } from "../schemas/user-credentials.schema";

export const LoginController = {
    Post: (req: LoginRequest) => {
        const user = UserCredentials.findOne({ username: req.username}).catch(err => console.error(err));
    }
}