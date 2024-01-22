import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {

  }


  getProducts(keyword : string ,page:number , size:number){
    return this.http.get(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:'response'});
  }

  checkProduct(product : Product):Observable<Product>{
    return this.http.patch<Product>(`http://localhost:8089/products/${product.id}`,
      {checked:!product.checked})
  }

  deleteProduct(product : Product){
    return this.http.delete<Product>(`http://localhost:8089/products/${product.id}`,)
  }

  addProduct(product : Product):Observable<Product>{
    return this.http.post<Product>(`http://localhost:8089/products`,
      product)
  }

  getProductById(productId : number):Observable<Product>{
    return this.http.get<Product>(`http://localhost:8089/products/${productId}`)
  }

  updateProduct(product : Product):Observable<Product>{
    return this.http.put<Product>(`http://localhost:8089/products/${product.id}`,product)
  }
}
