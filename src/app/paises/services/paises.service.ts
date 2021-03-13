import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaisSmall, Pais } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _basesUrl: string = 'https://restcountries.eu/rest/v2'
  private _regiones: string[] = ['AFRICA', 'AMERICAS', 'ASIA', 'EUROPE', 'OCEANIA'];

  get regiones():string[]{
    return [...this._regiones];
  }

  constructor( private http: HttpClient) { }

  getPaisesRegion( region:string ): Observable<PaisSmall[]>{
    
    const url: string = `${ this._basesUrl }/region/${region}?fields=name;alpha3Code`;

    return this.http.get<PaisSmall[]>(url);
  }

  getPaisCodigo( codigo:string ): Observable<Pais | null>{

    if( !codigo ){
      return of (null);
    }

    const url: string = `${ this._basesUrl }/alpha/${codigo}`;
    return this.http.get<Pais>(url);

  }
}
