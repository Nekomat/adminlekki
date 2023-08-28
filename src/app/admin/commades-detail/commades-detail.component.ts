import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommadesStatusComponent } from '../commades-status/commades-status.component';

@Component({
  selector: 'app-commades-detail',
  templateUrl: './commades-detail.component.html',
  styleUrls: ['./commades-detail.component.scss']
})
export class CommadesDetailComponent {
  constructor(private dialogCtrl : MatDialog){}
  //open status commande 
  OpenStatus(){
    this.dialogCtrl.open(CommadesStatusComponent)
  }
}
