import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificatListComponent } from './components/certificat-list/certificat-list.component';
import { UrlFormComponent } from './components/url-form/url-form.component';
import { CertificatDetailComponent } from './components/certificat-detail/certificat-detail.component';
import { CertificatsContactsComponent } from './components/certificats-contacts/certificats-contacts.component';
import { AideComponent } from './components/aide/aide.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
