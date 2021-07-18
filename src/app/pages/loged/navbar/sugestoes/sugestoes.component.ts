import { Component, OnInit } from '@angular/core';
import { MateriaService } from 'src/app/service/materia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'sugestoes',
  templateUrl: './sugestoes.component.html',
  styleUrls: ['./sugestoes.component.scss']
})
export class SugestoesComponent implements OnInit {

  public sugestoes: any[] = [];
  public idUser = localStorage.getItem("idUsuario");
  public lang = localStorage.getItem("lang");

  /* Alert */
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(
    private materiaService: MateriaService) { }

  ngOnInit() {
    this.materiaService.getAllSugestao().subscribe(
      (data) => {
        this.sugestoes = JSON.parse(data)
        if (this.sugestoes.length > 0) {
          let paraTirar = [];
          this.sugestoes.forEach((sugestao) => {
            if (sugestao.faltaVotar) {
              if (sugestao.faltaVotar.split("_").indexOf(this.idUser) == -1) {
                paraTirar.push(sugestao.idSugestoesMateria)
              }
            } else {
              paraTirar.push(sugestao.idSugestoesMateria)
            }
          })
          paraTirar.forEach((idSugestoesMateria) => {
            this.sugestoes = this.sugestoes.filter(sug => sug.idSugestoesMateria != idSugestoesMateria)
          })
          this.sugestoes.sort((a, b) => { return a.nomeMateria.localeCompare(b.nomeMateria) })
        }

      },
      (err) => console.log(err)
    )
  }

  updateSugestao(id, voto) {
    let sug;
    this.sugestoes.forEach(sugestao => {
      if (sugestao.idSugestoesMateria === id) {
        sug = sugestao;
        return;
      }
    })
    sug.faltaVotar = sug.faltaVotar.split("_").filter(id => id != this.idUser).join("_");
    sug.votos += voto;
    sug.totalVotos++;
    this.materiaService.updateSugestao(sug).subscribe(
      () => {
        if (localStorage.getItem("lang") === "pt-BR") {
          this.Toast.fire({
            icon: 'success',
            title: "Seu voto foi registrado"
          })
        } else {
          this.Toast.fire({
            icon: 'success',
            title: "Your vote has been registered"
          })
        }
        this.sugestoes = this.sugestoes.filter(sugestao => sugestao.idSugestoesMateria != sug.idSugestoesMateria);
      },
      err => {
        console.log(err)
        if (localStorage.getItem("lang") === "pt-BR") {
          this.Toast.fire({
            icon: 'error',
            title: 'Ocorreu um erro'
          })
        } else {
          this.Toast.fire({
            icon: 'error',
            title: 'An error has occurred'
          })
        }
      }
    )
  }

}
