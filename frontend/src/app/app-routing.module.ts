import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificatListComponent } from './components/certificat-list/certificat-list.component';
import { UrlFormComponent } from './components/url-form/url-form.component';
import { CertificatDetailComponent } from './components/certificat-detail/certificat-detail.component';
const routes: Routes = [
  {
    path: 'certificats',
    component: CertificatListComponent
  },
  {
    path: 'home',
    redirectTo: '/'
  },
  {
    path: 'ajouter',
    component: UrlFormComponent
  },
  {
    path: 'detail',
    component: CertificatDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
