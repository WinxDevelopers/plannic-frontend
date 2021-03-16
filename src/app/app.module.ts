import { SelectLangComponent } from './util/select-lang/select-lang.component';
import { Resend_emailComponent } from './pages/email_conf/resend_email/resend_email.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
//Angular
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MDBBootstrapModule, ChartsModule, WavesModule } from 'angular-bootstrap-md';
//Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { Email_confComponent } from './pages/email_conf/email_conf.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { IndexComponent } from './pages/index/index.component'
import { LogedComponent } from './pages/loged/loged.component';
import { NavbarComponent } from './pages/loged/navbar/navbar.component';
import { CalendarioComponent } from './pages/loged/calendario/calendario.component';
import { Select_materiasComponent } from './pages/loged/calendario/select_materias/select_materias.component';
import { RelatoriosComponent } from './pages/loged/relatorios/relatorios.component';
import { HorasEstudoComponent } from './pages/loged/relatorios/graficos/horas-estudo/horas-estudo.component';
import { NotasTipoComponent } from './pages/loged/relatorios/graficos/notas-tipo/notas-tipo.component';
import { NotasEvolucaoComponent } from './pages/loged/relatorios/graficos/notas-evolucao/notas-evolucao.component';
import { NotasMateriaComponent } from './pages/loged/relatorios/graficos/notas-materia/notas-materia.component';
import { BadgesComponent } from './pages/loged/relatorios/graficos/badges/badges.component';
import { MateriasComponent } from './pages/loged/materias/materias.component';
import { ConfigComponent } from './pages/loged/config/config.component';
import { NotasEstudoComponent } from './pages/loged/relatorios/graficos/notas-estudo/notas-estudo.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RegistrarComponent,
    LoginComponent,
    Email_confComponent,
    NavbarComponent,
    LogedComponent,
    MateriasComponent,
    RelatoriosComponent,
    NotasMateriaComponent,
    NotasEvolucaoComponent,
    NotasTipoComponent,
    Select_materiasComponent,
    SelectLangComponent,
    Resend_emailComponent,
    NotasEstudoComponent,
    HorasEstudoComponent,
    BadgesComponent,
    CalendarioComponent,
    ConfigComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    ChartsModule,
    WavesModule,
    FullCalendarModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    FormsModule,
    BrowserAnimationsModule,
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
