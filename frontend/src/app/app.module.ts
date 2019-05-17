import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LsComposantsModule } from '@libriciel/ls-composants';
import { CustomFormsModule } from 'ngx-custom-validators';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContentComponent } from './components/content/content.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { initializer } from './app-init';

import { CertificatsContactsComponent } from './components/certificats-contacts/certificats-contacts.component';
import { CertificatDetailComponent } from './components/certificat-detail/certificat-detail.component';
import { CertificatListComponent } from './components/certificat-list/certificat-list.component';
import { CertAdderComponent } from './components/cert-adder/cert-adder.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AideComponent } from './components/aide/aide.component';

import { CertificatService } from './service/certificat.service';
import { DateService } from './service/date.service';

@NgModule({
  declarations: [
    CertificatsContactsComponent,
    CertificatDetailComponent,
    CertificatListComponent,
    CertAdderComponent,
    ContentComponent,
    HeaderComponent,
    FooterComponent,
    AideComponent,
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    KeycloakAngularModule,
    ReactiveFormsModule,
    LsComposantsModule,
    CustomFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTooltipModule,
    BrowserModule,
    FormsModule,
  ],
  providers:[
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [
        KeycloakService
      ]
    },
    CertificatService,
    DateService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
