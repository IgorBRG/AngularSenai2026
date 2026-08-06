import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Vehicle {
  id: number;
  vehicle: string;
  vin: string;
  volumetotal: number;
  connected: number;
  softwareUpdates: number;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<{ vehicles: Vehicle[] }>(`${this.apiUrl}/vehicles`).pipe(
      map(response => {
        // Mapeamos os veículos para garantir que o link da imagem aponte corretamente para a pasta pública do Angular
        // Isso resolve o problema caso a API ainda esteja retornando a URL antiga (http://localhost:3001/img/...)
        return response.vehicles.map(v => {
          let nomeImagem = v.img.split('/').pop(); // Pega apenas o nome do arquivo, ex: ranger.png
          v.img = '/img/' + nomeImagem;
          return v;
        });
      })
    );
  }
}
