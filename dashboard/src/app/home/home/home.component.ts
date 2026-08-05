import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Variável para controlar se o menu lateral (sidebar) está aberto ou fechado
  menuAberto = false;

  constructor(private router: Router) {}

  // Função para alternar o estado do menu (abrir/fechar)
  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  // Função chamada ao clicar em Sair
  fazerLogout() {
    this.router.navigate(['/login']);
  }

}
