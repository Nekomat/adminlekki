import { Component,OnInit } from '@angular/core';
import { doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(public service : DataService , private router : Router , private fire : Firestore){
 router.navigateByUrl('/login')
  }  
unReadMessage = 0
 async ngOnInit() {
  this.router.events
  .pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd)
  ).subscribe((ev)=>{
    if(this.service.activeMenuLink == "admin_pharmacie"){
       onSnapshot(doc(this.fire,"PHARMACIES", this.service.adminPharId),(data)=>{
         if(data.exists()){
          let take:any = data.data()
          if(!take.message){
            return
          }
          let message = take.messages as Array<any>
          message.forEach(element=>{
            element.badge=0
            element.active=false
            element.message.forEach(element2=>{
              if(element2.type == "client"){
                if(element2.vuAdmin == false){
                  element.badge+=1 
                  this.unReadMessage++
                  new Audio('/assets/son.wav').play()
                }
              }
              
            })
          })
          this.service.messages = message 
          this.service.messages.sort((a,b)=>b.badge - a.badge)
         }
       })
    }
  })
  }
  reload(){
    window.location.reload()
  }
}
