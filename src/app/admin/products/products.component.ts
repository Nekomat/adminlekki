import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
 constructor(private dialogCtrl : MatDialog){} 
 //open add product 
 OpenAddProduct(){
  this.dialogCtrl.open(AddProductComponent)
 }
 //open edit product 
 OpenEditProduct(){
  this.dialogCtrl.open(EditProductComponent)
 }
}
