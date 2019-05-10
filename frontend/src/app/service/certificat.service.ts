import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent} from '@angular/common/http';
import { Certificat } from '../model/certificat';
import { Observable } from 'rxjs/Observable';
import { DistinguishedNumber } from '../model/DistinguishedNumber';

@Injectable()
export class CertificatService {

  private saveUrl: string;
  private saveAllUrl: string;
  private selectUrl: string;
  private selectFromUrlUrl: string;
  private selectFromFileUrl: string;
  private selectAllUrl: string;
  private deleteUrl: string;
  private deleteAllUrl: string;
  private updateUrl: string;
  private updateAllUrl: string;

  constructor(private http: HttpClient) {
    this.saveUrl = '/api/certificat/save';
    this.saveAllUrl = '/api/certificat/saveAll';
    this.selectUrl = '/api/certificat/select?id='
    this.selectFromUrlUrl = '/api/certificat/selectFromURL?URL=';
    this.selectFromFileUrl = '/api/certificat/selectFromFile';
    this.selectAllUrl = '/api/certificat/selectAll';
    this.deleteUrl = '/api/certificat/delete?id=';
    this.deleteAllUrl = '/api/certificat/deleteAll';
    this.updateUrl = '/api/certificat/update';
    this.updateAllUrl = '/api/certificat/updateAll';
  }

  public save(certificat: Certificat): Observable<Certificat> {
    return this.http.post<Certificat>(this.saveUrl, certificat);
  }

  public saveAll(certificat: Certificat[]): Observable<Certificat[]> {
    return this.http.post<Certificat[]>(this.saveAllUrl, certificat);
  }

  public select(id: number): Observable<Certificat>{
    return this.http.get<Certificat>(this.selectUrl + id);
  }

  public selectFromUrl(url: String): Observable<Certificat[]> {
    return this.http.get<Certificat[]>(this.selectFromUrlUrl + url);
  }

  public selectFromFile(file: File): Observable<Certificat>{
    const fd = new FormData();
    fd.append("file", file);
    return this.http.post<Certificat>(this.selectFromFileUrl, fd);
  }

  public selectAll(): Observable<Certificat[]> {
    return this.http.get<Certificat[]>(this.selectAllUrl);
  }

  public delete(id: number): Observable<Certificat> {
    return this.http.delete<Certificat>(this.deleteUrl + id);
  }

  public deleteAll(): Observable<Certificat[]> {
    return this.http.delete<Certificat[]>(this.deleteAllUrl);
  }

  public update(certificat: Certificat): Observable<Certificat> {
    return this.http.put<Certificat>(this.updateUrl, certificat);
  }

  public updateAll(certificats: Certificat[]): Observable<Certificat[]> {
    return this.http.put<Certificat[]>(this.updateAllUrl, certificats);
  }

  public getInformations(certificat: Certificat){
    let l = certificat.dn.split(",");
    let res = new DistinguishedNumber();
    res.cn = "non disponible";
    res.mail = "non disponible";
    res.o = "non disponible";
    res.ou = "non disponible";
    res.l = "non disponible";
    res.st = "non disponible";
    res.street = "non disponible";
    res.c = "non disponible";
    res.t = "non disponible";
    res.pc = "non disponible";

		for(let k = 0; k < l.length; k++) {
			if(l[k].startsWith("CN=")) { //TYPE
				res.cn = l[k].substring(3);
			}else if(l[k].startsWith("2.5.4.3=")) { // OID
				res.cn = l[k].substring(8);
			}else if(l[k].startsWith("E=")) { //TYPE
				res.mail = l[k].substring(2);
			}else if(l[k].startsWith("MAIL=")) { //TYPE
				res.mail = l[k].substring(5);
			}else if(l[k].startsWith("1.2.840.113549.1.9.1=")) { // OID
				res.mail = l[k].substring(21);
			}else if(l[k].startsWith("O=")) { //TYPE
				res.o = l[k].substring(2);
			}else if(l[k].startsWith("2.5.4.10=")) { //OID
				res.o = l[k].substring(9);
			}else if(l[k].startsWith("OU=")) { //TYPE
				res.ou = l[k].substring(3);
			}else if(l[k].startsWith("2.5.4.11=")) { //OID
				res.ou = l[k].substring(9);
			}else if(l[k].startsWith("L=")) { //TYPE
				res.l = l[k].substring(2);
			}else if(l[k].startsWith("ST=")) { //TYPE
				res.st = l[k].substring(3);
			}else if(l[k].startsWith("SP=")) { //TYPE
				res.st = l[k].substring(3);
			}else if(l[k].startsWith("STREET=")) { //TYPE
				res.street = l[k].substring(2);
			}else if(l[k].startsWith("2.5.4.9=")) { //OID
				res.street = l[k].substring(8);
			}else if(l[k].startsWith("S=")) { //TYPE
				res.st = l[k].substring(2);
			}else if(l[k].startsWith("2.5.4.8=")) { //OID
				res.st = l[k].substring(8);
			}else if(l[k].startsWith("C=")) { //TYPE
				res.c = l[k].substring(2);
			}else if(l[k].startsWith("2.5.4.6=")) { //OID
				res.c = l[k].substring(8);
			}else if(l[k].startsWith("T=")) { //TYPE
				res.t = l[k].substring(2);
			}else if(l[k].startsWith("2.5.4.12=")) { //OID
				res.t = l[k].substring(9);
      }else if(l[k].startsWith("PC=")) { //TYPE
				res.pc = l[k].substring(2);
			}else if(l[k].startsWith("2.5.4.17=")) { //OID
				res.pc = l[k].substring(9);
			}
		}
    return res;
  }

  areEquals(c1: Certificat, c2: Certificat){
    let i1 = this.getInformations(c1);
    let i2 = this.getInformations(c2);

    if(c1.id === c2.id){
      return true;
    }else{
      if(i1.cn === i2.cn
      && i1.mail === i2.mail
      && i1.o === i2.o
      && i1.ou === i2.ou
      && i1.l === i2.l
      && i1.st === i2.st
      && i1.c === i2.c
      && i1.t === i2.t
      && i1.street === i2.street
      && i1.pc === i2.pc){
        return true;
      }else{
        return false;
      }
    }
  }

  exists(c: Certificat, list: Certificat[]){
    let test = false;
    for(let i = 0; i < list.length; i++){
      if(this.areEquals(list[i], c)){
        test = true;
      }
    }
    return test;
  }
}
