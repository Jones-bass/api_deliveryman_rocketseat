import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../../database/prismaClient";
import { ICreateClient } from "../../../dtos/CreateUserDTO";


export class AuthenticateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    // Receber username, password

    // Verificar se o username cadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username,
      }
    })


    if (!client) {
      throw new Error("Username or password invalid!")
    }

    // Verificar se senha corresponde ao seu username
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!")
    }

    // Gerar token
    const token = sign({ username }, "1bdfa317c7abff4bb7ad1e5657e268f7", {
      subject: client.id,
      expiresIn: "1d"
    })

    return token
  }
}