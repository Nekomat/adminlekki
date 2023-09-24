import { Component , OnInit} from '@angular/core';
import { collection, deleteDoc, doc, Firestore, getDoc, getDocs, query, updateDoc,where } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';


@Component({
  selector: 'app-detail-pharmacie',
  templateUrl: './detail-pharmacie.component.html',
  styleUrls: ['./detail-pharmacie.component.scss']
})
export class DetailPharmacieComponent implements OnInit {
  constructor(
    private fire : Firestore,
    private route : ActivatedRoute ,
    private formCtrl : FormBuilder,
    private storage : Storage ,
    private router:Router ,
    private matDialog:MatDialog ,
    private service : DataService
  ){}
  public onePharmacie :any 
  //control formulaire
  public Section:FormGroup
 async ngOnInit() {
      let getid = this.route.snapshot.paramMap.get('id') 
      const refPharmacie = await getDoc(doc(this.fire,"PHARMACIES", getid))
      if(refPharmacie.exists()){
      this.onePharmacie=refPharmacie.data()
     this.Section= this.formCtrl.group({
        name:[this.onePharmacie.name,[Validators.required]],
        contact:[this.onePharmacie.contact,[Validators.required]],
        openHour:[this.onePharmacie.openHour,[Validators.required]],
        closeHour:[this.onePharmacie.closeHour,[Validators.required]],
        description:[this.onePharmacie.description,[Validators.required]],
         longitude:[this.onePharmacie.longitude , [Validators.required]],
         latitude:[this.onePharmacie.latitude, [Validators.required]],
         userName : [this.onePharmacie.email],
         password:[this.onePharmacie.password]
       }) 
       // prendre les commandes du fournisseurs
       const refisCommande = await getDocs(query(collection(this.fire,'COMMANDES'),where("idPhar","==",getid)))
       this.onePharmacie.commandes=[] 
       refisCommande.forEach(element=>{
        let take :any = element.data() 
        take.date = new Date(take.time.seconds*1000).toLocaleDateString('fr')
        this.onePharmacie.commandes.push(take)
       })
       
      //  prenre les produits de la pharmacie 
      const refisProduct = await getDocs(query(collection(this.fire,'PRODUCTS'),where("pharId","==",getid))) 
           this.onePharmacie.products=[]
           refisProduct.forEach((element)=>{
              this.onePharmacie.products.push(element.data())
           })
      } 
  }
  //take new img 
  file:any
  TakeImg(event){
  this.file=event.target.files[0]
  }
  //update pharmacie 
  loader=false
 async Update(){
  try {
  
    if(this.Section.valid){
      this.loader=true
      if(this.file){
        const refProductImge = ref(this.storage , "Pharmacie/"+this.file.name) 
        let refImg = await uploadBytes(refProductImge,this.file)
        this.onePharmacie.img= await getDownloadURL(refImg.ref)
      }
      updateDoc(doc(this.fire,"PHARMACIES",this.route.snapshot.paramMap.get('id') ),{
        name:this.Section.value.name , 
        contact:this.Section.value.contact, 
        openHour:this.Section.value.openHour, 
        closeHour:this.Section.value.closeHour, 
        description : this.Section.value.description, 
        longitude:this.Section.value.longitude,
        latitude:this.Section.value.latitude,
        img:this.onePharmacie.img,
        email:this.Section.value.userName,
        password:this.Section.value.password,
      })
      alert('Mise à jour effectué')
      this.loader=false
      this.ngOnInit()
    }else{
      alert('veuillez bien remplir le formulaire')
    }
  } catch (error) {
    alert('erreur veuillez reeassayer')
  }
  }

  // delete pharmacie 
  loaderDelete=false
 async delete(){
  this.loaderDelete=true
    deleteDoc(doc(this.fire,"PHARMACIES",this.onePharmacie.id)).then(async()=>{
      const refProduct = await getDocs(query(collection(this.fire,"PRODUCTS"), where('pharId',"==",this.onePharmacie.id)))
      refProduct.forEach( async element=>{
        let take:any = element.data()
       await deleteDoc(doc(this.fire,"PRODUCTS",take.id)) 
      })
      alert('Pharmacie supprimée') 
      this.loaderDelete=false
      this.router.navigateByUrl('/pharmacie')
    })
  }
  // go to commande detail 
  GoToCommandeDetail(id){
    this.router.navigate(["/admin_commandes_detail",id])
  }
  // open add product 
  OpenDialog(){
    this.matDialog.open(AddProductComponent)
    this.matDialog.afterAllClosed.subscribe(()=>{
      this.ngOnInit()
    })
  }
  // open edit product dialog
  OpenEditDualog(data){
    this.service.product=data
    this.matDialog.open(EditProductComponent)
    this.matDialog.afterAllClosed.subscribe(()=>{
      this.loader=true
      this.ngOnInit()
    })
  }
}
