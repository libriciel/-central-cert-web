import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../service/notifications.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-notification-handler',
  templateUrl: './notification-handler.component.html',
  styleUrls: ['./notification-handler.component.css']
})
export class NotificationHandlerComponent implements OnInit {

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit() {
    var notify = timer(1000, 1000);
    notify.subscribe(function(){
      console.log("ping");
    });
  }

}
