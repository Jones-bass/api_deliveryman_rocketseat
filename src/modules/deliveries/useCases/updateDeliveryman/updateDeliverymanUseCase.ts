import { prisma } from "../../../../database/prismaClient";
import { IUpdateDeliveryDTO } from "../../../../dtos/UpdateDeliveryDTO ";


export class UpdateDeliverymanUseCase {
  async execute({ id_delivery, id_deliveryman}: IUpdateDeliveryDTO) {
    const result = await prisma.deliveries.update({
      where: {
        id: id_delivery
      },
      data: {
        id_deliveryman
      }
    })

    return result
  }
}