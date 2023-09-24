import { Component ,OnInit} from '@angular/core';
import { collection, doc, Firestore, getDocs,setDoc, Timestamp } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
 constructor(
  private fire :Firestore ,
 private formCtrl : FormBuilder,
 private storage : Storage ,
 private dialogCtrl : MatDialog
 ){} 
//  control Formulaire 
section:FormGroup = this.formCtrl.group({
  name:["",[Validators.required]],
  price:["",[Validators.required]],
  poids:["",[Validators.required]],
  pharmacie:['',[Validators.required]],
  categorie:["",[Validators.required]] ,
  description :["",[Validators.required]]  
})
allPhar : Array<any>=[]
chosePahrCte:Array<any>=[]
async ngOnInit() {
    const refAllPhar = await getDocs(collection(this.fire,"PHARMACIES"))
    refAllPhar.forEach(element => {
      this.allPhar.push(element.data()) 
    })
 }
 // chose pharmacie 
 chosePharDetail={id:"",name:"" , cateName:""} 
 ChoosePhar(event){
  let take = this.allPhar.find(e=>e.id == event.target.value)
  this.chosePharDetail.id = take.id
  this.chosePharDetail.name=take.name
  this.chosePahrCte = take.categories
 }
 // chose categories
 ChooseCate(event){
  this.chosePharDetail.cateName = event.target.value
 }
 // uploadPicture 
 file:any
  GetFile(event){
  this.file= event.target.files[0] 
  } 
  // add product to db 
  loader=false
 async AddProduct(){
  if(this.section.valid){
    if(this.file){
      this.loader=true
      let linkImg=""
      const refProductImge = ref(this.storage , "Product/"+this.file.name) 
      let refImg = await uploadBytes(refProductImge,this.file)
      linkImg = await getDownloadURL(refImg.ref) 
      const refdoc = doc(collection(this.fire,'PRODUCTS')) 
       setDoc(refdoc,{
        id:refdoc.id,
        name:this.section.value.name,
        price:this.section.value.price,
        poids:this.section.value.poids,
        pharId:this.chosePharDetail.id,
        pharName:this.chosePharDetail.name,
        photo:linkImg,
        cateName:this.chosePharDetail.cateName,
        description:this.section.value.description,
        time:Timestamp.now()
       })
       alert("Produit ajouté")
       this.loader = false
       this.dialogCtrl.closeAll()
    }else{
     alert('Veuillez ajouter une photo')
    }
  }else{
    alert('Veuillez bien remplir le formulaire')
  }
    
  }
}
