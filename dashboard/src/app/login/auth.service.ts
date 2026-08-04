import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Define a URL base da nossa API, que está rodando localmente na porta 3001
  private apiUrl = 'http://localhost:3001';

  // Injetando o HttpClient para que possamos fazer requisições HTTP para o backend
  constructor(private http: HttpClient) { }

  // Função responsável por enviar os dados de usuário e senha para o backend e tentar o login
  login(usuario: string, senha: string): Observable<any> {
    // Retorna um Observable com a resposta do nosso POST no endpoint /login
    return this.http.post<any>(`${this.apiUrl}/login`, { usuario, senha });
  }
}
