import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<product[]> {
    return this.httpClient.get<product[]>('../../../../assets/db/porducts.json');
  }

  editProductQuantity(productId: number, quantity: any) {
    return this.httpClient.get('../../../../assets/db/porducts.json').pipe(
      map((res: any) => {
        const updatedProducts = res.map((element: any) => {
          if (element.ProductId === productId) {
            element.AvailablePieces = quantity;
          }
          return element;
        });
        console.log(updatedProducts); //here data updated successfully 
        // (Note -> you can use Json Server to update file) without it you won't able to update file 
        // or make Json file as ts file and make it export)
        return updatedProducts;
      })
    );
  }
}