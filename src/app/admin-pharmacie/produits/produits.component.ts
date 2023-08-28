import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaddProductComponent } from '../padd-product/padd-product.component';
import { PeditProductComponent } from '../pedit-product/pedit-product.component';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent {
  constructor(private dialogCtrl : MatDialog){} 
  //open add product 
 OpenAddProduct(){
  this.dialogCtrl.open(PaddProductComponent)
 }
 //open edit product 
 OpenEditProduct(){
  this.dialogCtrl.open(PeditProductComponent)
 }
}
