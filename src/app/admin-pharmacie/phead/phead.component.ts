import { Component , OnInit} from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-phead',
  templateUrl: './phead.component.html',
  styleUrls: ['./phead.component.scss']
})
export class PheadComponent implements OnInit {
 constructor(
  private fire : Firestore,
  private router : ActivatedRoute,
  private service : DataService
 ) {}
 Date = new Date().toLocaleDateString('fr')
  OnePharmacie:any
 async ngOnInit() {
   let getid = this.router.snapshot.paramMap.get('id') 
   let refPharmacie = await getDoc(doc(this.fire,"PHARMACIES", this.service.adminPharId))
   if(refPharmacie.exists()){
      this.OnePharmacie=refPharmacie.data()
   }
 }
}
