import { Container } from 'inversify';
import { IController } from "./controller.interface";
import { LoginController } from "./login.controller";

export const ControllerTypes = {
    LOGIN_CONTROLLER: 'LOGIN_CONTROLLER'
}


const controllerContainer = new Container();

controllerContainer.bind<IController>(ControllerTypes.LOGIN_CONTROLLER).to(LoginController);

export default controllerContainer;
