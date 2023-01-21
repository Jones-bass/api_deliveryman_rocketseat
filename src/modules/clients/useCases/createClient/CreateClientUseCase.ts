import { hash } from "bcrypt"
import { prisma } from "../../../../database/prismaClient";
import { ICreateUser } from "../../../../dtos/UserDTO";


export class CreateClientUseCase {
  async execute({ password, username}: ICreateUser) {
    // Validar se o cliente existe
    const clientExists = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
        }
      }
    })

    if(clientExists) {
      throw new Error("Client already exists")
    }
    // Criptografar a senha
    const hashPassword = await hash(password, 10);

    // Salvar a senha
    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return client;
  } 
}