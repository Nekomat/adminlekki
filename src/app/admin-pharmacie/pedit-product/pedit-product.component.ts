import { Component,OnInit } from '@angular/core';
import { deleteDoc, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-pedit-product',
  templateUrl: './pedit-product.component.html',
  styleUrls: ['./pedit-product.component.scss']
})
export class PeditProductComponent implements OnInit {
constructor(
  private formCtrl : FormBuilder,
  private service : DataService,
  private fire : Firestore ,
  private storage : Storage ,
  private dialogCtrl:MatDialog
){}
 section:FormGroup=this.formCtrl.group({
  name:[this.service.product.name,[Validators.required]],
  price:[this.service.product.price,[Validators.required]],
  poids:[this.service.product.poids,[Validators.required]],
  categorie:[this.service.product.cateName,[Validators.required]] ,
  description:[this.service.product.description,[Validators.required]],
  disponible:[this.service.product.disponible,[Validators.required]]
 })
 sousCate:Array<any>=[]
 pharName=""
async ngOnInit() {
   const refPhar = await getDoc(doc(this.fire,"PHARMACIES", this.service.adminPharId))  
   if(refPhar.exists()){
      let take :any = refPhar.data()
      this.sousCate = take.categories
      this.pharName = take.name
   }
 }
//  get file 
file:any
GetFile(event){
 this.file=event.target.files[0]
}
// update product 
loader=false
async Update(){
  if(this.section.valid){
    this.loader=true
    if(this.file){
      const refProductImge = ref(this.storage , "Product/"+this.file.name) 
      let refImg = await uploadBytes(refProductImge,this.file)
      this.service.product.photo = await getDownloadURL(refImg.ref) 
    }
    updateDoc(doc(this.fire,'PRODUCTS',this.service.product.id),{
      name:this.section.value.name,
        price:this.section.value.price,
        poids:this.section.value.poids,
        pharId:this.service.adminPharId,
        pharName:this.pharName,
        photo:this.service.product.photo,
        cateName:this.section.value.categorie,
        description:this.section.value.description,
        disponible:this.section.value.disponible
    })
    alert('Produit modifié')
    this.dialogCtrl.closeAll()
    this.loader = false
  }else {
    alert('Veuillez bien remplir le formulaire')
  } 
}
// effacer le produits 
 deleteProduct(){
  let value = confirm('Voulez-vous supprimé ce produit ') 
   if(value){
    deleteDoc(doc(this.fire,"PRODUCTS",this.service.product.id)).then(()=>{
      alert('Produit modifier')
      this.dialogCtrl.closeAll() 
     })
   }
  
 }
}
