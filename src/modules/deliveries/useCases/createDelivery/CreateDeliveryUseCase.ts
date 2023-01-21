import { prisma } from "../../../../database/prismaClient";
import { IDeliveryClient } from "../../../../dtos/DeliveryClientDTO";

export class CreateDeliveryUseCase {
  async execute({ item_name, id_client}: IDeliveryClient) {
    const delivery = await prisma.deliveries.create({
      data:{
        item_name,
        id_client,
      }
    })

    return delivery;
  }
}