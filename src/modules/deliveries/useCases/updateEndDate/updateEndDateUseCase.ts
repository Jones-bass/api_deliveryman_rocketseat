import { prisma } from "../../../../database/prismaClient";
import { IUpdateDeliveryDTO } from "../../../../dtos/UpdateDeliveryDTO ";


export class UpdateEndDateUseCase {
  async execute({ id_delivery, id_deliveryman}: IUpdateDeliveryDTO) {
    const result = await prisma.deliveries.updateMany({
      where: {
        id: id_delivery,
        id_deliveryman,
      },
      data: {
       end_at: new Date(),
      }
    })

    return result
  }
}