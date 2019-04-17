import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mail } from '../model/mail';

@Injectable()
export class MailService {

  private saveUrl: string;
  private saveAllUrl: string;
  private createUrl: string;
  private selectUrl: string;
  private selectAllUrl: string;
  private deleteUrl: string;
  private deleteAllUrl: string;
  private updateUrl: string;
  private updateAllUrl: string;

  constructor(private http: HttpClient) {
    this.saveUrl = '/api/mail/save';
    this.saveAllUrl = '/api/mail/saveAll';
    this.createUrl = '/api/mail/create';
    this.selectUrl = '/api/mail/select?id=';
    this.selectAllUrl = '/api/mail/selectAll';
    this.deleteUrl = '/api/mail/delete?id=';
    this.deleteAllUrl = '/api/mail/deteAll';
    this.updateUrl = '/api/mail/update';
    this.updateAllUrl = '/api/mail/updateAll';
  }

  public save(mail: Mail) {
    return this.http.post(this.saveUrl, mail);
  }

  public saveAll(mail: Mail[]){
    return this.http.post(this.saveAllUrl, mail);
  }

  public create(mail: String){
    return this.http.post(this.createUrl, mail);
  }

  public select(id: number) {
    return this.http.get(this.selectUrl + id);
  }

  public selectAll()  {
    return this.http.get(this.selectAllUrl);
  }

  public delete(id: number) {
    return this.http.delete(this.deleteUrl + id);
  }

  public deleteAll() {
    return this.http.delete(this.deleteAllUrl);
  }

  public update(mail: Mail) {
    return this.http.put(this.updateUrl, mail);
  }

  public updateAll(mail: Mail[]) {
    return this.http.put(this.updateAllUrl, mail);
  }
}
