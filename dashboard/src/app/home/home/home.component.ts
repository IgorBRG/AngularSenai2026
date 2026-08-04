import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Injetando o Router para poder fazer a navegação programática (como o logout)
  constructor(private router: Router) {}

  // Passo 5: Função de logout que redireciona de volta para a tela de login
  logout() {
    // Aqui poderiamos limpar tokens do localStorage se tivessemos implementado JWT
    this.router.navigate(['/login']);
  }
}
