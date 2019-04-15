import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificatListComponent } from './components/certificat-list/certificat-list.component';
import { UrlFormComponent } from './components/url-form/url-form.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
