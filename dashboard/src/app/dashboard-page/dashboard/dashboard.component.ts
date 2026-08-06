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

  // Controle do formulário para o select (Passo 8)
  searchControl = new FormControl('');
  
  // Lista de todos os veículos retornados do backend
  todosVeiculos: Vehicle[] = [];
  
  // Variável para guardar o veículo que foi selecionado no select
  veiculoSelecionado: Vehicle | undefined;

  constructor(
    private vehicleService: VehicleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Busca todos os dados do back-end ao carregar a página
    this.vehicleService.getVehicles().subscribe((data) => {
      this.todosVeiculos = data;
    });

    // Observa as mudanças no select utilizando RxJS conforme exigido no Passo 8
    this.searchControl.valueChanges
      .pipe(
        // Extrai o valor do veículo selecionado (como se fosse o pluck)
        map(valor => valor),
        
        // Evita chamadas repetidas se o valor for o mesmo
        distinctUntilChanged()
      )
      .subscribe((nomeVeiculoSelecionado) => {
        // Encontra o veículo completo correspondente ao nome
        this.veiculoSelecionado = this.todosVeiculos.find(v => v.vehicle === nomeVeiculoSelecionado);
      });
  }

  // Função para fazer logout e voltar pra tela inicial
  fazerLogout() {
    this.router.navigate(['/login']);
  }
}
