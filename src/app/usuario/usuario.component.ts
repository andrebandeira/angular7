import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [ConfirmationService],
})
export class UsuarioComponent implements OnInit {

  public usuarios:Usuario[];

  constructor(
    private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.listaUsuario();
  }

  public listaUsuario () {
    this.usuarioService.listaUsuario().subscribe(
      response => {
        this.usuarios = response
      },
      error => {
        alert("Erro ao carregar a lista");
      }
    )
  }

  public deletar(id:string) {
    this.confirmationService.confirm({
      message: 'Esta certo disso?',
      accept: () => {
        this.usuarioService.delete(id).subscribe(
          response => {
            this.listaUsuario();
          },
          error => {
            alert("Erro ao carregar a lista");
          }
        )
      }
    });
  }

}
