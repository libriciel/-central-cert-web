import { Injectable } from '@angular/core';
import { Certificat } from '../model/certificat';
import { CertificatService } from './certificat.service';
import { Notification } from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private certificats: Certificat[];
  private notifications: Notification[];

  constructor(private certificatService: CertificatService) {}

  getNotifications() {
    this.certificatService.selectAll().subscribe(data => {
      this.certificats = data;
    });

    for(let i = 0; i < this.certificats.length; i++){
      this.certificats[i].notifications.forEach(notif => {
        this.notifications.push(notif);
      });
    }
  }

  getActivatedNotifications(){
    this.certificatService.selectAll().subscribe(data => {
      this.certificats = data;
    });

    for(let i = 0; i < this.certificats.length; i++){
      this.certificats[i].notifications.forEach(notif => {
        if(notif.activated === true){
          this.notifications.push(notif);
        }
      });
    }
  }

  getNotSeenNotifications(){
    this.certificatService.selectAll().subscribe(data => {
      this.certificats = data;
    });

    for(let i = 0; i < this.certificats.length; i++){
      this.certificats[i].notifications.forEach(notif => {
        if(notif.seen === false){
          this.notifications.push(notif);
        }
      });
    }
  }

  getActivatedNotSeenNotifications(){
    this.certificatService.selectAll().subscribe(data => {
      this.certificats = data;
    });

    for(let i = 0; i < this.certificats.length; i++){
      this.certificats[i].notifications.forEach(notif => {
        if(notif.seen === false && notif.activated === true){
          this.notifications.push(notif);
        }
      });
    }
  }

  activate(n: Notification){
    n.activated = true;
  }

  activateAll(n: Notification[]){
    n.forEach(notification => {
      notification.activated = true;
    });
  }

  see(n: Notification){
    n.seen = true;
  }

  seeAll(n: Notification[]){
    n.forEach(notification => {
      notification.seen = true;
    });
  }

  isNotified(n: Notification){
    return n.activated === true || n.seen === false;
  }

  notify(c: Certificat){
    let notified = false;
    let index = 0;
    while(!notified){
      if(this.isNotified(c.notifications[index]) === false){
        c.notifications[index].seen = false;
        c.notifications[index].activated = true;
      }else{
        index ++;
      }
    }
    this.certificatService.save(c).subscribe();
  }
}
