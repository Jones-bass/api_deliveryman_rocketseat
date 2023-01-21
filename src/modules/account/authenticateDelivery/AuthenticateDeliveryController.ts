import { Request, Response } from "express";
import { AuthenticateDeliveryUseCase } from "./AuthenticateDeliveryUseCase";

export class AuthenticateDeliveryController{
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateDeliveryUseCase = new AuthenticateDeliveryUseCase();
    const result = await authenticateDeliveryUseCase.execute({
      username,
      password
    }) 

    return response.json(result);
  }
}