import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatIconModule,MatCardModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnDestroy{
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  orderDetails:any;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.pipe(takeUntil(this._unsubscribeAll)).subscribe((params:Params) => {
      if (window.history.state && window.history.state.order) {
        const order = window.history.state.order;
        this.orderDetails = order
      }
    });
  }

  onNavigateBack(){
    history.back()
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
