import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CertificatDetailComponent } from './components/certificat-detail/certificat-detail.component';
import { CertificatListComponent } from './components/certificat-list/certificat-list.component';
import { UrlFormComponent } from './components/url-form/url-form.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { AppComponent } from './app.component';
import { CertificatService } from './service/certificat.service';
import { DateService } from './service/date.service';

@NgModule({
  declarations: [
    AppComponent,
    CertificatListComponent,
    NavmenuComponent,
    CertificatDetailComponent,
    UrlFormComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CertificatService,
    DateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
