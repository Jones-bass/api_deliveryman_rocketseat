import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliveryController } from "./modules/account/authenticateDelivery/AuthenticateDeliveryController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/findAllDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/findAllAvailableController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/updateDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveries/useCases/updateEndDate/updateEndDateController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliverymanController } from "./modules/deliveryman/useCases/findAllDeliveries/findAllDelivymanController";

const routes = Router();

const createClientController = new CreateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()

const authenticateClientController = new AuthenticateClientController()
const authenticateDeliveryController = new AuthenticateDeliveryController()

const findAllAvailableController = new FindAllAvailableController()
const updateDeliverymanController = new UpdateDeliverymanController()
const findAllDeliveriesController = new FindAllDeliveriesController()
const findAllDeliverymanController = new FindAllDeliverymanController()
const updateEndDateController = new UpdateEndDateController()

routes.post("/client/", createClientController.handle);
routes.post("/client/authenticate/", authenticateClientController.handle);
routes.get("/client/deliveries", ensureAuthenticateClient, findAllDeliveriesController.handle)

routes.post("/deliveryman/", createDeliverymanController.handle);
routes.get("/deliveryman/deliveries", ensureAuthenticateDeliveryman, findAllDeliverymanController.handle)

routes.post("/delivery/", ensureAuthenticateClient, createDeliveryController.handle);
routes.post("/delivery/authenticate/", authenticateDeliveryController.handle);
routes.put("/delivery/updateEndDate/:id", ensureAuthenticateDeliveryman, updateEndDateController.handle);

routes.get("/delivery/available", ensureAuthenticateDeliveryman, findAllAvailableController.handle)
routes.put("/delivery/updateDeliveryman/:id", ensureAuthenticateDeliveryman, updateDeliverymanController.handle)

export { routes }