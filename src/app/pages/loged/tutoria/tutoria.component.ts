import { UserService } from 'src/app/service/user.service';
import { TutoriaService } from './../../../service/tutoria.service';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA = [
  { materia: 1, tutor: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { materia: 2, tutor: 'Helium', weight: 4.0026, symbol: 'He' },
  { materia: 3, tutor: 'Lithium', weight: 6.941, symbol: 'Li' },
  { materia: 4, tutor: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { materia: 5, tutor: 'Boron', weight: 10.811, symbol: 'B' },
  { materia: 6, tutor: 'Carbon', weight: 12.0107, symbol: 'C' },
  { materia: 7, tutor: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { materia: 8, tutor: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { materia: 9, tutor: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { materia: 10, tutor: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  selector: 'app-tutoria',
  templateUrl: './tutoria.component.html',
  styleUrls: ['./tutoria.component.scss']
})
export class TutoriaComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['tutor', 'materia', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dbTutoria: any;
  dbAluno: any;
  dbTutores: any;
  dbAlunos: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public lang = localStorage.getItem("lang");
  public tutoriasUser = {
    aluno: [],
    tutor: []
  }
  public tutoriasAll = {
    aluno: [],
    tutor: []
  }

  public notaUser;


  constructor(
    private tutoriaService: TutoriaService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    //Notas pendentes
    this.userService.getAvaliacoes().subscribe(
      (data) => {
        console.log(data)
      },
      (err) => { console.log(err) }
    )
  }

  ngAfterViewInit(): void {
    //Nota do Usuário
    this.userService.getNota().subscribe(
      (data: string) => {
        this.notaUser = parseFloat(data)
      },
      (err) => { console.log(err) }
    )
    //
    /* this.userService.getAllInfosById().subscribe(
      (data: string) => {
        console.log(JSON.parse(data))
      }
    ) */
    
    //USUARIO
    //Aluno
    this.tutoriaService.getAllUserAluno().subscribe(
      (dataA: string) => {
        this.tutoriasUser.aluno = JSON.parse(dataA)
            let dataAluno = JSON.parse(dataA)
            this.dbAluno = dataAluno.map(aluno => { return { Tutor: aluno.usuarioTutor.nome, nomeMateria: aluno.materiaBase.materiaBase } });
            this.dbAluno.sort((a, b) => { return a.Tutor.localeCompare(b.Tutor) })
        //Tutor
        this.tutoriaService.getAllUserTutor().subscribe(
          (dataT: string) => {
            this.tutoriasUser.tutor = JSON.parse(dataT)
            let dataTutor = JSON.parse(dataT)
            this.dbTutoria = dataTutor.map(tut => { return { Aluno: tut.usuarioAluno.nome, nomeMateria: tut.materiaBase.materiaBase } });
            this.dbTutoria.sort((a, b) => { return a.Aluno.localeCompare(b.Aluno.nome) })
          },
          (err) => { console.log(err) }
        )
      },
      (err) => { console.log(err) }
    )

    //COMUNIDADE
    //Alunos
    this.tutoriaService.getTutores().subscribe(
      (dataTutores: string) => {
        this.tutoriasUser.aluno = JSON.parse(dataTutores)
            let dataTs = JSON.parse(dataTutores)
            this.dbTutores = dataTs.map(tut => { return { Tutor: tut.usuarioTutor.nome, nomeMateria: tut.materiaBase.materiaBase } });
            this.dbTutores.sort((a, b) => { return a.Tutor.localeCompare(b.Tutor.nome) })
            console.log(this.dbTutores)
        //Tutorer
        this.tutoriaService.getAlunos().subscribe(
          (dataAlunos: string) => {
            this.tutoriasUser.tutor = JSON.parse(dataAlunos)
            let dataAl = JSON.parse(dataAlunos)
            this.dbAlunos = dataAl.map(tut => { return { Aluno: tut.usuarioAluno.nome, nomeMateria: tut.materiaBase.materiaBase } });
            this.dbAlunos.sort((a, b) => { return a.Aluno.localeCompare(b.Aluno.nome) })
            console.log(this.dbAlunos)
          },
          (err) => { console.log(err) }
        )
      },
      (err) => { console.log(err) }
    )

    //TOTAL
    this.tutoriaService.getAllTutoria().subscribe(
      (data) => {
        console.log(data)
      },
      (err) => { console.log(err) }
    )
    //Aluno
    //Tutor
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

}
