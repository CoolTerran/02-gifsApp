import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' //provideIn eleva a un nivel global el servicio y no es necesario declararlo en los
})
export class GifsService {

  private apiKey     : string = 'bwOb2f0qc8mQSnCfCMQWEg7p52Zo28NA';
  private _historial : string[] = [];
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  public resultados: Gif[] = [];

  //luego cambiar any por su tipo correspondiente
  get historial() {
    return [...this._historial]; //rompemos la referencia con [...] para proteger la propiedad original
  }

  constructor(private http: HttpClient) {

    //this._historial = localStorage.getItem('historial');

    this._historial = JSON.parse(localStorage.getItem('historial')!) || []; //! para indicar que nunca es nulo
  }

  buscarGifs(query: string = '') {

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params: params}) //también puede ser solo params
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
