import { UsersService } from './../../core/services/users/users.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, map, Subject } from 'rxjs';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../core/services/products/products.service';
import { Order } from '../../core/models/order';
import { user } from '../../core/models/user';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { product } from '../../core/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,MatInputModule,MatTableModule,MatButtonModule,MatFormFieldModule,MatIconModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent  implements OnInit, OnDestroy{
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  usersService = inject(UsersService)
  ordersService = inject(OrdersService)
  productsService = inject(ProductsService)
  router = inject(Router)
  combinedData: any[] = [];

  ngOnInit(): void {
    this.getOrderList()
  }

  getOrderList() {
    forkJoin({
      orders: this.ordersService.getOrders(),
      users: this.usersService.getUsers(),
      products: this.productsService.getProducts()
    }).pipe(
      map(({ orders, users, products }) => this.combineData(orders, users, products))
    ).subscribe(combinedData => {
      this.combinedData = combinedData;
    });
  }
  
  combineData(orders: Order[], users: user[], products: any[]): any[] {
    return orders.map(order => {
      const user = users.find(u => u.Id === order.UserId);
      const enrichedProducts = order.Products.map(op => {
        const productDetail = products.find(p => p.ProductId === op.ProductId);
        return {
          ...op,
          ...productDetail
        };
      });
      const totalPrice = enrichedProducts.reduce((sum, product) => sum + (product.ProductPrice * product.Quantity), 0);
      return {
        ...order,
        user: user,
        Products: enrichedProducts,
        totalPrice: totalPrice
      };
    });
  }

  onNavigate(order:any){
    this.router.navigate([`orders/orders-details/${order.OrderId}`], { state: { order } });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
