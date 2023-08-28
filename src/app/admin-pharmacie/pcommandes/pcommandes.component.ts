import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pcommandes',
  templateUrl: './pcommandes.component.html',
  styleUrls: ['./pcommandes.component.scss']
})
export class PcommandesComponent {
  constructor(private router : Router){}
  //Go to commande detail
  GoToCommandeDetail(){
   this.router.navigateByUrl('/admin_pharmacie_commende_detail')
  }
}
