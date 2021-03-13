import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interfaces/paises.interfaces';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  // llenar selectores
  regiones: string [] = [];
  paisSmall: PaisSmall [] = [];
  fronteras:  string[] = [];
  cargando: boolean = false;

  constructor( private fb: FormBuilder,
               private paisesSvc: PaisesService ) { }

  ngOnInit(): void {

    this.regiones = this.paisesSvc.regiones;

    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap( () => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap( region => this.paisesSvc.getPaisesRegion( region ) )
      )
      .subscribe( paises => {
        this.paisSmall = paises;
        this.cargando = false
      });

    this.miFormulario.get('pais')?.valueChanges
    .pipe(
      tap( () => {
        this.fronteras = [];
        this.miFormulario.get('frontera')?.reset('');
        this.cargando = true;
      }),
      switchMap( codigo => this.paisesSvc.getPaisCodigo( codigo ))
    )
    .subscribe( pais =>{ 

      if(pais!=null){
        
        this.fronteras = pais?.borders || [];
        this.cargando = false;
      }
      
      
    })
  }

  guardar(){
    console.log(this.miFormulario.valid);
    
  }

}
