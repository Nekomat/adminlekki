import { Component } from '@angular/core';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataService } from '../data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 constructor(
  private formCtrl : FormBuilder ,
   private service : DataService,
   private router : Router ,
   private fire :Firestore
 ){

 }
 //controle de formulaire 
public Section:FormGroup = this.formCtrl.group({
  name : ['',[Validators.required]] ,
  password:["",[Validators.required]]
 })
public loader=false
 public async ControLogin(){
  this.loader=true
  //know if is admin 
  if(this.Section.value.name.includes('admin')){
    if(this.Section.value.name == environment.UserName && this.Section.value.password == environment.password){
       this.service.MenuHide=false
       this.service.isAdmin=true 
      this.router.navigateByUrl("/" ,{replaceUrl:true})
    }else{
      alert('les informations sont incorrectes')
    }
  }else if (this.Section.value.name.includes('Phar')){ 
    //the query to take
   const refPharmacie= await getDocs(query(collection(this.fire,"PHARMACIES"), where("email","==",this.Section.value.name), where("password","==",this.Section.value.password))) 
   let take = []
   refPharmacie.forEach(element =>{
    take.push(element.data())
   })

   if(take[0]){
    this.service.isAdmin=false
    this.service.MenuHide=false
    this.service.activeMenuLink="admin_pharmacie"
    this.service.pharmacieId=take[0].id
    this.router.navigate(["/admin_pharmacie",take[0].id] ,{replaceUrl:true}) 
    localStorage.setItem('id',take[0].id) 
   }else{
    alert('les informations sont incorrectes')
   }
  }else{
    alert('les informations sont incorrectes')
  }
 }
}
