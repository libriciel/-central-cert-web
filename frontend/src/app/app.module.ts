import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CertificatListComponent } from './components/certificat-list/certificat-list.component';
import { FormsModule } from '@angular/forms';
import { CertificatService } from './service/certificat.service';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { CertificatDetailComponent } from './components/certificat-detail/certificat-detail.component';
import { UrlFormComponent } from './components/url-form/url-form.component';
import { MailService } from './service/mail.service';
@NgModule({
  declarations: [
    AppComponent,
    CertificatListComponent,
    NavmenuComponent,
    CertificatDetailComponent,
    UrlFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CertificatService, MailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
