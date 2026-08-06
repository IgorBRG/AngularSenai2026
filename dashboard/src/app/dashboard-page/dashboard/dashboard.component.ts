import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VehicleService, Vehicle } from '../vehicle.service';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Controle do formulário para o campo de busca (Passo 8)
  searchControl = new FormControl('');
  
  // Lista de todos os veículos retornados do backend
  todosVeiculos: Vehicle[] = [];
  
  // Lista de veículos filtrada que será mostrada na tela
  veiculosFiltrados: Vehicle[] = [];

  constructor(
    private vehicleService: VehicleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Busca todos os dados do back-end ao carregar a página
    this.vehicleService.getVehicles().subscribe((data) => {
      this.todosVeiculos = data;
      this.veiculosFiltrados = data;
    });

    // Observa as mudanças no campo de busca utilizando RxJS conforme exigido no Passo 8
    this.searchControl.valueChanges
      .pipe(
        // 'map' pode substituir o 'pluck' para extrair o valor com segurança de tipos, 
        // mas aqui o valueChanges já nos dá a string, então garantimos que é string e minúscula
        map(valor => (valor || '').trim().toLowerCase()),
        
        // Espera 300ms após o usuário parar de digitar para não filtrar a cada tecla instantaneamente
        debounceTime(300),
        
        // Evita fazer a mesma busca duas vezes seguidas
        distinctUntilChanged()
      )
      .subscribe((termoBusca) => {
        // Se houver algo digitado (poderíamos usar 'filter' também se quiséssemos ignorar buscas curtas)
        if (termoBusca) {
          this.veiculosFiltrados = this.todosVeiculos.filter(v => 
            v.vehicle.toLowerCase().includes(termoBusca)
          );
        } else {
          // Se limpar o campo, volta a mostrar todos
          this.veiculosFiltrados = this.todosVeiculos;
        }
      });
  }

  // Função para fazer logout e voltar pra tela inicial
  fazerLogout() {
    this.router.navigate(['/login']);
  }
}
