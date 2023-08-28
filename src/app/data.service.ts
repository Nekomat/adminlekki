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
 
}
