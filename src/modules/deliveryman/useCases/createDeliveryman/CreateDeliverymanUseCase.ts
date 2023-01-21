import { hash } from "bcrypt"
import { prisma } from "../../../../database/prismaClient";
import { ICreateUser } from "../../../../dtos/UserDTO";


export class CreateDeliverymanUseCase {
  async execute({ password, username}: ICreateUser) {
    // Verificar se ja existe um delivery
    const deliveryExists = await prisma.deliveryman.findFirst({
      where: {
        username,
      }
    })

    if(deliveryExists) {
      throw new Error("Deliveryman already exists")
    }

    // Criptografar a senha
    const hashPassword = await hash(password, 10);
    
    // Salvar a senha do delivery
    const delivery = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return delivery;
  } 
} 