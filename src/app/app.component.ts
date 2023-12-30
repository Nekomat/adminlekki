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
  
  }
 
}
