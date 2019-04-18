import { Component, OnInit, Input } from '@angular/core';
import { Certificat } from '../../model/certificat';
import { CertificatService } from '../../service/certificat.service';

@Component({
  selector: 'app-certificat-detail',
  templateUrl: './certificat-detail.component.html',
  styleUrls: ['./certificat-detail.component.css']
})
export class CertificatDetailComponent implements OnInit {
  @Input() certificat: Certificat;

  constructor(private certificatService: CertificatService) { }

  ngOnInit() {
  }

  updateOnSubmit(){
    this.certificatService.update(this.certificat).subscribe();
  }

  addMailOnSubmit(form){
    if(form.status === "VALID"){
      let exists = false;
      for(let i = 0; i < this.certificat.additionnalMails.length; i++){
        if(this.certificat.additionnalMails[i] === form.value.addMailInput){
          exists = true;
        }
      }
      if(exists === false){
        this.certificat.additionnalMails[this.certificat.additionnalMails.length] = form.value.addMailInput;
      }
    }else{
      console.log(form.status);
    }
  }
}
