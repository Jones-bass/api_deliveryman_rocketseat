import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../../database/prismaClient";
import { ICreateUser } from "../../../../../dtos/UserDTO";



export class AuthenticateDeliveryUseCase {
  async execute({ username, password }: ICreateUser) {
    // Receber username, password

    // Verificar se o deliveryman cadastrado
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      }
    })


    if (!deliveryman) {
      throw new Error("Username or password invalid!")
    }

    // Verificar se senha corresponde ao seu username
    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!")
    }

    // Gerar token
    const token = sign({ username }, "16c1767eb229c41a5670ae626ac934a8", {
      subject: deliveryman.id,
      expiresIn: "1d"
    })

    return token
  }
}