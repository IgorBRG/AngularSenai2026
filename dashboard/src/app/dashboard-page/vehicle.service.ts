import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interface para definir como é o nosso veículo retornado pela API
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

  // Função para buscar os veículos no back-end
  // Utilizamos o operador map do RxJS para extrair o array de veículos da resposta
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<{ vehicles: Vehicle[] }>(`${this.apiUrl}/vehicles`).pipe(
      map(response => response.vehicles)
    );
  }
}
