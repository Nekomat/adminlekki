import { Component,OnInit } from '@angular/core';
import { collection, Firestore, getDocs, query,where } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { PaddProductComponent } from '../padd-product/padd-product.component';
import { PeditProductComponent } from '../pedit-product/pedit-product.component';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit {
  constructor(private dialogCtrl : MatDialog ,
     private fire : Firestore,
     private service : DataService
    ){} 
  //open add product 
 OpenAddProduct(){
  this.dialogCtrl.open(PaddProductComponent) 
  this.dialogCtrl.afterOpened.subscribe(()=>{
    this.ngOnInit()
  })
 }
 //open edit product 
 OpenEditProduct(data){
  this.service.product=data
  this.dialogCtrl.open(PeditProductComponent)
 }
 
 product:Array<any>=[]
 productSearch:Array<any>=[]
 async ngOnInit() { 
  this.product = []
    const refHisProduct  = await getDocs(query(collection(this.fire,"PRODUCTS"), where('pharId',"==",this.service.adminPharId)))
    refHisProduct.forEach(element =>{
      this.product.push(element.data()) 
    })
    this.productSearch=this.product 
 } 
//  recherche d'un produit 
 word=""

 Search(){
  if(this.word){
    this.product = this.productSearch.filter(e=>e.name.toLowerCase().includes(this.word.toLowerCase()))
  }else{
    this.product = this.productSearch
  }
 }
}
