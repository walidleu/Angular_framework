import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule, HttpResponse} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  public products! : Product[];
  public keyword : string ="" ;
  public totalPages : number = 0;
  public pageSize : number = 3;
  public currentPage : number = 1;

  constructor(private productService:ProductService,
              private router : Router){

  }
  ngOnInit() {
    this.getProducts()
  }


  getProducts(){
    this.productService.getProducts(this.keyword,this.currentPage,this.pageSize)
      .subscribe({
        next: resp =>{
          this.products = resp.body as Product[]
          let totalProducts : number = parseInt(resp.headers.get('x-total-count')!)
          this.totalPages = Math.floor(totalProducts / this.pageSize);
          if(totalProducts % this.pageSize){
            this.totalPages = this.totalPages+1;
          }
        },
        error : err => {console.log(err)}
      });
    //this.products$=this.productService.getProducts(1,2)!;
  }

  handleChecked(product : Product){
    this.productService.checkProduct(product).subscribe({
      next : updatedProduct =>{
        product.checked=!product.checked
      }
    })

  }

  handleDelete(product : Product){
    if(confirm("Etes vous sure?"))
    this.productService.deleteProduct(product).subscribe({
      next : data =>{
        this.getProducts()
      }
      }

    );
  }
  handleEdit(product:Product){
    this.router.navigateByUrl(`/editProduct/${product.id}`)
}
  handleGoToPage(page : number){
    this.currentPage=page;
    this.getProducts()
  }
}

