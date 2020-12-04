import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals/globals';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

export class AuthResponse{
  token!: string;
  usuario!: Usuario;
  success!: boolean;
}

export class Usuario{
    idUsuario!: number;
    nome!: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  nome!: string;
  senha!: string;
  authInvalido!: boolean;

  constructor(private authService: AuthService, private router: Router, private globals: Globals) { }

  ngOnInit(): void {
    this.authInvalido = false;
  }

  auth(){
    this.authService.auth(this.nome, this.senha).subscribe(response => {
      if(response.success === true) {
        this.globals.loginData.token = response.token;
        this.globals.loginData.usuario = response.usuario;
        this.authInvalido = false;
        this.router.navigate(['/home']);
      } else {
        this.authInvalido = true;
      }
    }, err => {
      this.authInvalido = true;
    });
  }
}
