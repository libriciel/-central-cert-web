import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent} from '@angular/common/http';

@Component({
  selector: 'app-reset-mail',
  templateUrl: './reset-mail.component.html',
  styleUrls: ['./reset-mail.component.css']
})
export class ResetMailComponent implements OnInit {

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(data => {
      let id = data.id;
      let add = data.addMail;
      this.http.get("/api/certificat/resetMail?id=" + id + "&addMail=" + add).subscribe(data => {});
    });
  }
}
