import { Inject, Injectable } from '@nestjs/common';
import { OrderDTO } from './orders.dto';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(@Inject('ORDERS_SERVICE') private rabbitClient: ClientProxy) {}
  placeOrder(order: OrderDTO) {
    this.rabbitClient.emit('order-placed', order);

    return { message: 'Order Placed!' };
  }

  getOrders() {
    return this.rabbitClient
      .send({ cmd: 'fetch-orders' }, {})
      .pipe(timeout(5000));
  }
}
