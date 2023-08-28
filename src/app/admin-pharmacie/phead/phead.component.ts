import { Component , OnInit} from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-phead',
  templateUrl: './phead.component.html',
  styleUrls: ['./phead.component.scss']
})
export class PheadComponent implements OnInit {
 constructor(
  private fire : Firestore,
  private router : ActivatedRoute
 ) {}
  OnePharmacie:any
 async ngOnInit() {
   let getid = this.router.snapshot.paramMap.get('id') 
   let refPharmacie = await getDoc(doc(this.fire,"PHARMACIES", getid))
   if(refPharmacie.exists()){
      this.OnePharmacie=refPharmacie.data()
   }
 }
}
