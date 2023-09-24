import { Component , OnInit} from '@angular/core';
import { collection, deleteDoc, doc, Firestore, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
 constructor(
  private fire : Firestore,
  private service :DataService,
  private formCtrl:FormBuilder,
  private matDialog:MatDialog ,
  private storage : Storage
 ){}
//  controle formulaire 
section:FormGroup=this.formCtrl.group({
  name:[this.service.product.name,[Validators.required]],
  price:[this.service.product.price,[Validators.required]],
  categorie:[this.service.product.cateName,[Validators.required]] ,
  poids:[this.service.product.poids,[Validators.required]],
  description:[this.service.product.description,[Validators.required]],
  pharmacie:[this.service.product.pharId,[Validators.required]]
})
PharmacieData:any 
async ngOnInit() {
    const refPharmacie = await getDoc(doc(this.fire,'PHARMACIES',this.service.product.pharId)) 
    if(refPharmacie.exists()){
      this.PharmacieData=refPharmacie.data() 
      const refAllPhar = await getDocs(collection(this.fire,"PHARMACIES"))
      this.PharmacieData.allPhar=[]
      refAllPhar.forEach(element=>{
        this.PharmacieData.allPhar.push(element.data()) 
      })
     let i = this.PharmacieData.allPhar.findIndex(e=>e.id == this.service.product.pharId) 
      this.categorie = this.PharmacieData.allPhar[i].categories 
      console.log(this.categorie)
    }
} 

//get picture 
file:any
GetFile(event){
  this.file=event.target.files[0]
}

// changer de pharmacie 
changePhar(event){
 let phar = this.PharmacieData.allPhar.find(e=>e.id == event.target.value)
 this.service.product.pharId = phar.id
 this.service.product.pharName = phar.name 
 this.categorie=phar.categories
}
// changer de categorie 
categorie:Array<any>=[]
ChangerCate(event){
 this.service.product.cateName=event.target.value
}

// Update product 
loadeUpdate=false
 async Update(){
  try {
    if(this.section.valid){
      this.loadeUpdate=true
      if(this.file){
        const refProductImge = ref(this.storage , "Pharmacie/"+this.file.name) 
        let refImg = await uploadBytes(refProductImge,this.file)
        this.service.product.photo = await getDownloadURL(refImg.ref) 
      }
      updateDoc(doc(this.fire,'PRODUCTS', this.service.product.id),{
        name:this.section.value.name,
        price : this.section.value.price,
        photo:this.service.product.photo,
        description:this.section.value.description,
        poids:this.section.value.poids,
        pharName:this.service.product.pharName,
        pharId:this.service.product.pharId,
        cateName:this.service.product.cateName
      })
      this.loadeUpdate=false
      alert('Produit mise à jour avec succes')
      this.matDialog.closeAll()
     }else{
      alert('Veuillez bien remlir le formulaire')
     }
  } catch (error) {
     alert('erreur veuillez reessayer')
  }
   
  }
  // delete product 
  loaderDelete=false
   deleProduct(){
    this.loaderDelete=true
    try {
      deleteDoc(doc(this.fire,"PRODUCTS",this.service.product.id)).then(()=>{
        this.loaderDelete=false
        alert('Produit supprimé') 
        this.matDialog.closeAll()
       })
    } catch (error) {
      this.loaderDelete=false
      alert('Erreur veuillez reessayer')
    }
     
   }
}
