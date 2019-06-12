import { NgModule, ModuleWithProviders } from '@angular/core';
import { CertificatsContactsComponent } from './components/certificats-contacts/certificats-contacts.component';
import { CertificatDetailComponent } from './components/certificat-detail/certificat-detail.component';
import { CertificatListComponent } from './components/certificat-list/certificat-list.component';
import { Routes, RouterModule } from '@angular/router';
import { AideComponent } from './components/aide/aide.component';
import { RGPDComponent } from './components/rgpd/rgpd.component';
import { OptionsComponent } from './components/options/options.component';
import { ResetMailComponent } from './components/reset-mail/reset-mail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    component: CertificatListComponent
  },
  {
    path: 'aide',
    component: AideComponent
  },
  {
    path: 'rgpd',
    component: RGPDComponent
  },
  {
    path: 'resetMail',
    component: ResetMailComponent
  },
  {
    path: 'options',
    component: OptionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
