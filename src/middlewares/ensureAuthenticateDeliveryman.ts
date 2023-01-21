import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string
}

export async function ensureAuthenticateDeliveryman(
  request: Request, response: Response, next: NextFunction) {
    const authHeader  = request.headers.authorization;

    if(!authHeader) {
      return response.status(401).json({
        message: "Token missing"
      });
    }

    const [, token] = authHeader.split(" ");

    try { 
      const { sub } = verify(token, "16c1767eb229c41a5670ae626ac934a8") as IPayload;

      request.id_deliveryman = sub;

      return next()
    } catch (err) {
      return response.status(401).json({
        message: "Invalid token!"
      });
    }
  }