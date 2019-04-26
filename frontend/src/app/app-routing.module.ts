import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificatListComponent } from './components/certificat-list/certificat-list.component';
import { UrlFormComponent } from './components/url-form/url-form.component';
import { CertificatDetailComponent } from './components/certificat-detail/certificat-detail.component';
import { CertificatsContactsComponent } from './components/certificats-contacts/certificats-contacts.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    component: CertificatListComponent,
    data: {
      breadcrumbs: 'Accueil'
    }
  },
  {
    path: 'accueil/detail/:id',
    component: CertificatDetailComponent,
    data: {
      breadcrumbs: 'Détail'
    }
  },
  {
    path: 'accueil/detail/contacts/:id',
    component: CertificatsContactsComponent,
    data: {
      breadcrumbs: 'Contacts et norifications'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
