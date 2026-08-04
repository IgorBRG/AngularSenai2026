import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Injetando o Router para podermos fazer a navegação de logout
  constructor(private router: Router) {}

  // Função que será chamada quando o usuário clicar em Sair (Logout)
  fazerLogout() {
    // Aqui nós apenas mandamos o usuário de volta para a tela de login
    this.router.navigate(['/login']);
  }

}
