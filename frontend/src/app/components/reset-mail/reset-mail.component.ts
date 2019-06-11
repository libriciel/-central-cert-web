import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent} from '@angular/common/http';

@Component({
  selector: 'app-reset-mail',
  templateUrl: './reset-mail.component.html',
  styleUrls: ['./reset-mail.component.css']
})
export class ResetMailComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let id = this.activatedRoute.queryParams.value.id;
    let add = this.activatedRoute.queryParams.value.addMail;
    this.http.post("/api/certificat/resetMail?id=" + id + "&addMail=" + add).subscribe(data => {});
  }
}
