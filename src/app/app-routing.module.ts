import { MetodosComponent } from './pages/loged/metodos/metodos.component';
import { NotasComponent } from './pages/loged/notas/notas.component';
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

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: LogedComponent,
    children: [
      { path: 'relatorios', component: RelatoriosComponent },
      { path: 'materias', component: MateriasComponent },
      { path: 'calendario', component: CalendarioComponent },
      { path: 'configuracoes', component: ConfigComponent },
      { path: 'metodos', component: MetodosComponent },
      { path: 'notas', component: NotasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
