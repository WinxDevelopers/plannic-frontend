import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Materia } from 'src/app/interface/materia';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'select-materias',
  templateUrl: './select_materias.component.html'
})
export class Select_materiasComponent implements OnInit, AfterViewInit, OnDestroy {

  /** list of materias */
  protected materias: Materia[];

  /** control for the selected materia */
  public materiaCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public materiaFilterCtrl: FormControl = new FormControl();

  /** list of materias filtered by search keyword */
  public filteredMaterias: ReplaySubject<Materia[]> = new ReplaySubject<Materia[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();


  constructor(private usuarioService: UserService ) { }

  ngOnInit() {
    // set initial selection
    this.materiaCtrl.setValue(this.materias[10]);

    // load the initial materia list
    this.filteredMaterias.next(this.materias.slice());

    // listen for search field value changes
    this.materiaFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMaterias();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredMaterias are loaded initially
   */
  protected setInitialValue() {
    this.filteredMaterias
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredMaterias are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Materia, b: Materia) => a && b && a.idMateria === b.idMateria;
      });
  }

  protected filterMaterias() {
    if (!this.materias) {
      return;
    }
    // get the search keyword
    let search = this.materiaFilterCtrl.value;
    if (!search) {
      this.filteredMaterias.next(this.materias.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the materias
    this.filteredMaterias.next(
      this.materias.filter(materia => materia.nomeMateria.toLowerCase().indexOf(search) > -1)
    );
  }

}
