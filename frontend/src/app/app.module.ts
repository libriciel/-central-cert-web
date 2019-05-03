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
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CertificatsContactsComponent } from './components/certificats-contacts/certificats-contacts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CertAdderComponent } from './components/cert-adder/cert-adder.component';
import { ContentComponent } from './components/content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    CertificatListComponent,
    CertificatDetailComponent,
    UrlFormComponent,
    HeaderComponent,
    FooterComponent,
    CertificatsContactsComponent,
    CertAdderComponent,
    ContentComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LsComposantsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    CertificatService,
    DateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
