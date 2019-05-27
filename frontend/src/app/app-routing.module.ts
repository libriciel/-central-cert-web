import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificatListComponent } from './components/certificat-list/certificat-list.component';
import { CertificatDetailComponent } from './components/certificat-detail/certificat-detail.component';
import { CertificatsContactsComponent } from './components/certificats-contacts/certificats-contacts.component';
import { AideComponent } from './components/aide/aide.component';
import { RGPDComponent } from './components/rgpd/rgpd.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
