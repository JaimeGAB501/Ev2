import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CuerpoLogin} from './../../interfaces/CuerpoLogin';
import { UsuarioLogeado} from './../../interfaces/UsuarioLogeado'; 
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL_LOGIN: string = 'https://dummyjson.com/auth/login';
  public usuarioLogeado: UsuarioLogeado | null = null;
  public accesToken: string | null = null;

  private $cargando = new BehaviorSubject<boolean>(false);
  public cargando = this.$cargando.asObservable();
  constructor(
    private http: HttpClient
  ) {

   }

   public iniciarSesion(nombre_usuario: string, contrasenia: string){
    this.$cargando.next(true);

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
      this.$cargando.next(false);
      console.log(resultado);
    });
  }
  public cerrarSesion(){
    if(this.usuarioLogeado){
    this.usuarioLogeado = null;
    this.accesToken = null;
    }
  }
   }

