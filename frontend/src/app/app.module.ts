import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CertificatDetailComponent } from './components/certificat-detail/certificat-detail.component';
import { CertificatListComponent } from './components/certificat-list/certificat-list.component';
import { UrlFormComponent } from './components/url-form/url-form.component';
import { AppComponent } from './app.component';
import { CertificatService } from './service/certificat.service';
import { DateService } from './service/date.service';
import { LsComposantsModule } from '@libriciel/ls-composants';
import { NotificationsService } from './service/notifications.service';
import { NotificationHandlerComponent } from './components/notification-handler/notification-handler.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CertificatListComponent,
    CertificatDetailComponent,
    UrlFormComponent,
    NotificationHandlerComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LsComposantsModule
  ],
  providers: [
    CertificatService,
    DateService,
    NotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
