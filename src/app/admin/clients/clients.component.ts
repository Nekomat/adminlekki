import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddClientsComponent } from '../add-clients/add-clients.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
 constructor(private dialogCtrl : MatDialog , private router : Router){} 

 //open save client 
 OpenSaveClient(){
  this.dialogCtrl.open(AddClientsComponent)
 }
 //go to one client 
 GoToOneClient(){
  this.router.navigateByUrl('/client_detail')
 }
}
