import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { product } from '../../core/models/product';
import { ProductsService } from '../../core/services/products/products.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatPaginatorModule, CommonModule, MatButtonModule,
    MatIconModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogActions, MatDialogClose],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  _productsService = inject(ProductsService)
  fb = inject(FormBuilder)
  matDialog = inject(MatDialog)
  toastrService = inject(ToastrService)
  products = signal<product[]>([])
  totalProductsCount: number = 0;
  pageSize = 5;
  page = 0;
  quantity = new FormControl(0, [Validators.required])

  ngOnInit(): void {
    this.getProductsList()
  }

  getProductsList() {
    this._productsService.getProducts().pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe((res: product[]) => {
      this.totalProductsCount = res.length;
      this.updateDisplayedProducts(res);
    })
  }

  updateDisplayedProducts(products: product[]): void {
    if (this.page === 0) {
      const startIndex = (this.page) * this.pageSize;
      const endIndex = Math.min(startIndex + this.pageSize, products.length);
      this.products.set(products.slice(startIndex, endIndex));
    } else {
      const startIndex = (this.page - 1) * this.pageSize;
      const endIndex = Math.min(startIndex + this.pageSize, products.length);
      this.products.set(products.slice(startIndex, endIndex));
    }
  }

  pageChanged(event: any): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getProductsList();
  }

  onOpenEditDialog(product: product) {
    product.AvailablePieces ? this.quantity.patchValue(product.AvailablePieces) : this.quantity.patchValue(0)
    let dialogRef = this.matDialog.open(this.editDialog,
      {
        width: '650px'
      })
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this._productsService.editProductQuantity(product.ProductId, this.quantity.value).pipe(
          takeUntil(this._unsubscribeAll)
        ).subscribe((res: any) => {
          this.getProductsList()
          this.quantity.reset();
          this.toastrService.success('Updated Successfully')
        })
      }
    })
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
