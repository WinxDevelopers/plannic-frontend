import { ConfigComponent } from './pages/loged/config/config.component';
import { CalendarioComponent } from './pages/loged/calendario/calendario.component';
import { MateriasComponent } from './pages/loged/materias/materias.component';
import { RelatoriosComponent } from './pages/loged/relatorios/relatorios.component';
import { LogedComponent } from './pages/loged/loged.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { IndexComponent } from './pages/index/index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Email_confComponent } from './pages/email_conf/email_conf.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'email', component: Email_confComponent },
  {
    path: 'dashboard',
    component: LogedComponent,
    children: [
      { path: 'calendario', component: CalendarioComponent },
      { path: 'relatorios', component: RelatoriosComponent },
      { path: 'materias', component: MateriasComponent },
      { path: 'configuracoes', component: ConfigComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
