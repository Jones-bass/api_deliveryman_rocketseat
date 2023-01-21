import { hash } from "bcrypt"
import { prisma } from "../../../../database/prismaClient"
import { ICreateClient } from "../../dtos/CreateUserDTO";


export class CreateClientUseCase {
  async execute({ password, username}: ICreateClient) {
    
    const clientExists = await prisma.clients.findFirst({
      where: {
        username,
      }
    })

    if(clientExists) {
      throw new Error("Client already exists")
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return client;
  } 
}