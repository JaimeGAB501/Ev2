import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CuerpoLogin} from './../../interfaces/CuerpoLogin';
import { UsuarioLogeado} from './../../interfaces/UsuarioLogeado'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL_LOGIN: string = 'https://dummyjson.com/auth/login';
  public usuarioLogeado: UsuarioLogeado | null = null;
  public accesToken: string | null = null;
  constructor(
    private http: HttpClient
  ) {

   }

   public iniciarSesion(nombre_usuario: string, contrasenia: string){
    const cuerpo: CuerpoLogin ={
      username: nombre_usuario,
      password: contrasenia
    }
    this.http.post<UsuarioLogeado>(this.URL_LOGIN, JSON.stringify(cuerpo),{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .subscribe(resultado => {
      this.usuarioLogeado = resultado;
      this.accesToken = resultado.acessToken;
      console.log(resultado);
    });
  }
   }

