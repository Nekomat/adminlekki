import { Component,OnInit } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { AddCategorieComponent } from '../add-categorie/add-categorie.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
 constructor(private dialogCtrl : MatDialog ,
     private fire : Firestore ,
     private service : DataService
  ){} 
 //open add product 
 OpenAddProduct(){
  this.dialogCtrl.open(AddProductComponent) 
  this.dialogCtrl.afterAllClosed.subscribe(()=>{
    this.allProduct=[]
    this.allProductForSearch=[]
    this.ngOnInit()
  })
 }
 //open edit product 
 OpenEditProduct(data){
  this.service.product=data
  this.dialogCtrl.open(EditProductComponent)
  this.dialogCtrl.afterAllClosed.subscribe(()=>{
    this.allProduct=[]
    this.allProductForSearch=[]
    this.ngOnInit()
  })

 }
  // ouvrir cate modal 
  OpenCateModal(){
    this.dialogCtrl.open(AddCategorieComponent)
    this.dialogCtrl.afterAllClosed.subscribe(()=>{
      this.allProduct=[]
      this.allProductForSearch=[]
      this.ngOnInit()
    })
  }
 allProduct:Array<any>=[]
 allProductForSearch:Array<any>=[]
async ngOnInit() { 
  this.allProduct=[]
  this.allProductForSearch=[]
    // prendre tout les produits 
    const refProduct = await getDocs(collection(this.fire,"PRODUCTS")) 
    refProduct.forEach(element=>{
    this.allProduct.push(element.data()) 
    })
    this.allProductForSearch=this.allProduct
 }
//  rechercher un produits
word=""
  Search(event){ 
 if(this.word){
  this.allProduct = this.allProductForSearch.filter(e=> e.name.toLowerCase().includes(this.word.toLowerCase()))
  if(!this.allProduct[0]){
    this.allProduct=[]
  }
 }else{
  this.allProduct=this.allProductForSearch
 }
  
  }
}
