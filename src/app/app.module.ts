import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
//Angular
import { MatIconModule } from '@angular/material/icon';
import { MDBBootstrapModule, ChartsModule } from 'angular-bootstrap-md';
//Translate
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { IndexComponent } from './pages/index/index.component'
import { LogedComponent } from './pages/loged/loged.component';
import { NavbarComponent } from './pages/loged/navbar/navbar.component';
import { SidebarComponent } from './pages/loged/sidebar/sidebar.component';
import { CalendarioComponent } from './pages/loged/calendario/calendario.component';
import { RelatoriosComponent } from './pages/loged/relatorios/relatorios.component';
import { MateriasComponent } from './pages/loged/materias/materias.component';
import { BarrasComponent } from './pages/loged/relatorios/graficos/barras/barras.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RegistrarComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    LogedComponent,
    MateriasComponent,
    RelatoriosComponent,
    BarrasComponent,
    CalendarioComponent
   ],  
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    ChartsModule,
    FullCalendarModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
