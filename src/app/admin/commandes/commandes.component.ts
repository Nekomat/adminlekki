import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent {
 constructor(private router : Router){}
 //Go to commande detail
 GoToCommandeDetail(){
  this.router.navigateByUrl('/admin_commandes_detail')
 }
}
