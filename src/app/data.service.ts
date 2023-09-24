import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  //variables for slideMenu
 public activeMenuLink="home"
 public MenuHide=true 
 public isAdmin=true 
 public pharmacieId=""
 public commandId=""
 public product:any 
 public adminPharId=""
 public adminPharName=""

//  pour les messages 
messages :any 
 
}
