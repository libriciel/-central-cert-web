import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Certificat } from '../model/certificat';
import { Mail } from '../model/mail';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CertificatService {

  private saveUrl: string;
  private saveAllUrl: string;
  private selectUrl: string;
  private selectFromUrlUrl: string;
  private selectAllUrl: string;
  private deleteUrl: string;
  private deleteAllUrl: string;
  private updateUrl: string;
  private updateAllUrl: string;
  private updateAndAddMailUrl: String;

  constructor(private http: HttpClient) {
    this.saveUrl = '/api/certificat/save';
    this.saveAllUrl = '/api/certificat/saveAll';
    this.selectUrl = '/api/certificat/select?id='
    this.selectFromUrlUrl = '/api/certificat/selectFromURL?URL=';
    this.selectAllUrl = '/api/certificat/selectAll';
    this.deleteUrl = '/api/certificat/delete?id=';
    this.deleteAllUrl = '/api/certificat/deleteAll';
    this.updateUrl = '/api/certificat/update';
    this.updateAllUrl = '/api/certificat/updateAll';
    this.updateAndAddMailUrl = '/api/certificat/updateAndAddMail?id=';
  }

  public save(certificat: Certificat): Observable<Certificat> {
    return this.http.post<Certificat>(this.saveUrl, certificat);
  }

  public saveAll(certificat: Certificat[]): Observable<Certificat> {
    return this.http.post<Certificat>(this.saveAllUrl, certificat);
  }

  public select(id: number) {
    return this.http.get<Certificat[]>(this.selectUrl + id);
  }

  public selectFromUrl(url: String): Observable<Certificat[]> {
    return this.http.get<Certificat[]>(this.selectFromUrlUrl + url);
  }

  public selectAll(): Observable<Certificat[]> {
    return this.http.get<Certificat[]>(this.selectAllUrl);
  }

  public delete(id: number) {
    return this.http.delete(this.deleteUrl + id);
  }

  public deleteAll() {
    return this.http.delete(this.deleteAllUrl);
  }

  public update(certificat: Certificat) {
    return this.http.put(this.updateUrl, certificat);
  }

  public updateAll(certificats: Certificat[]) {
    return this.http.put(this.updateAllUrl, certificats);
  }

  public updateAndAddMail(id: number, mail: string){
    return this.http.put(this.updateAndAddMailUrl + "" + id, mail);
  }
}
