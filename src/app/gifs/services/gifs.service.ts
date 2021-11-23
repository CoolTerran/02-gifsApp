import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //provideIn eleva a un nivel global el servicio y no es necesario declararlo en los
})
export class GifsService {

  private _historial: string[] = [];

  
  get historial() {
    return [...this._historial]; //rompemos la referencia con [...] para proteger la propiedad original
  }

  buscarGifs(query: string = '') {

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
    }

    this._historial = this._historial.splice(0,10);

    console.log(this._historial);
}
}
