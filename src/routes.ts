import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliveryController } from "./modules/account/authenticateDelivery/AuthenticateDeliveryController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { CreateDeliverymanController } from "./modules/deviveryman/useCases/createDeliveryman/CreateDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()

const authenticateClientController = new AuthenticateClientController()
const authenticateDeliveryController = new AuthenticateDeliveryController()

routes.post("/delivery/authenticate/", authenticateDeliveryController.handle);
routes.post("/client/authenticate/", authenticateClientController.handle);

routes.post("/client/", createClientController.handle);
routes.post("/deliveryman/", createDeliverymanController.handle);

routes.post("/delivery/", ensureAuthenticateClient, createDeliveryController.handle);

export { routes }