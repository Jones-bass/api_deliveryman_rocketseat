import { Request, Response } from "express";
import { FindAllDeliverymanUseCase } from "./findAllDeliverymanUseCase";

export class FindAllDeliverymanController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request;

    const findAllDeliverymanUseCase = new FindAllDeliverymanUseCase();
    const deliveries = await findAllDeliverymanUseCase.execute(id_deliveryman) 

    return response.json(deliveries);
  }
}