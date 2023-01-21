import { Router } from "express";
import { AuthenticateClientController } from "./modules/clients/useCases/account/authenticateClient/AuthenticateClientController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { AuthenticateDeliveryController } from "./modules/deviveryman/useCases/account/authenticateDelivery/AuthenticateDeliveryController";
import { CreateDeliverymanController } from "./modules/deviveryman/useCases/createDeliveryman/CreateDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController()
const createDeliveryController = new CreateDeliverymanController()

const authenticateClientController = new AuthenticateClientController()
const authenticateDeliveryController = new AuthenticateDeliveryController()

routes.post("/client/", createClientController.handle);
routes.post("/client/authenticate/", authenticateClientController.handle);

routes.post("/delivery/", createDeliveryController.handle);
routes.post("/delivery/authenticate/", authenticateDeliveryController.handle);


export { routes }