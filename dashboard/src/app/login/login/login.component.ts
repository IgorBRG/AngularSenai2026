import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Variáveis para guardar o que o usuário digitar no formulário
  usuario = '';
  senha = '';
  
  // Variável para exibir mensagens de erro na tela caso algo dê errado
  errorMessage = '';

  // Injetando nosso AuthService para cuidar da autenticação e o Router para navegar entre as páginas
  constructor(private authService: AuthService, private router: Router) {}

  // Função que é chamada ao clicar no botão "Entrar" do formulário (Passo 2)
  onSubmit() {
    // Primeiro verifico se o usuário preencheu ambos os campos
    if (this.usuario && this.senha) {
      // Chama o método login no serviço que criamos, enviando usuário e senha (Passo 3)
      this.authService.login(this.usuario, this.senha).subscribe({
        next: (response) => {
          // Se o backend retornar sucesso e validar como 'admin', seguimos para a próxima tela
          if (response && response.usuario === 'admin') {
            // Sucesso no login, redirecionando para a página home
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          // Captura o erro retornado pela API e exibe na tela
          this.errorMessage = err.error?.message || 'Erro ao realizar login.';
        }
      });
    } else {
      // Caso algum campo esteja em branco, avisa o usuário
      this.errorMessage = 'Por favor, preencha o usuário e a senha.';
    }
  }
}
