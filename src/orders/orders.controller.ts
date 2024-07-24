import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDTO } from './orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('place-order')
  placeOrder(@Body() order: OrderDTO) {
    return this.ordersService.placeOrder(order);
  }

  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }
}
