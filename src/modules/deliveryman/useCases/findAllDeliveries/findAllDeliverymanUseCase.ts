import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliverymanUseCase {
  async execute(id_deliveryman: string) {
    const deliveries = await prisma.deliveryman.findMany({
      where: {
        id: id_deliveryman
      },
      select: {
        deliveries: true,
        username: true,
        id: true,
      }
    })

    return deliveries;
  } 
}