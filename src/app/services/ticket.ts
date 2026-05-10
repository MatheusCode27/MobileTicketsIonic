import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  filaSP: string[] = [];
  filaSG: string[] = [];
  filaSE: string[] = [];

  contadorSP = 1;
  contadorSG = 1;
  contadorSE = 1;

  senhaAtual = '';
  ultimasChamadas: string[] = [];
  ultimoTipoChamado = '';
  horaAtual = '';

  constructor() {

  setInterval(() => {

    const data = new Date();

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');
    const segundo = String(data.getSeconds()).padStart(2, '0');

    this.horaAtual =
      `${dia}/${mes}/${ano} - ${hora}:${minuto}:${segundo}`;

  }, 1000);

}

  emitirSenha(tipo: string) {

    const data = new Date();

    const ano = data.getFullYear().toString().slice(-2);
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');

    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');
    const segundo = String(data.getSeconds()).padStart(2, '0');

    let sequencia = '';

    if (tipo === 'SP') {
      sequencia = String(this.contadorSP++).padStart(3, '0');
    }

    if (tipo === 'SG') {
      sequencia = String(this.contadorSG++).padStart(3, '0');
    }

    if (tipo === 'SE') {
      sequencia = String(this.contadorSE++).padStart(3, '0');
    }

    const senha =
      `${ano}${mes}${dia}-${tipo}${sequencia} - ${hora}:${minuto}:${segundo}`;

    if (tipo === 'SP') {
      this.filaSP.push(senha);
    }

    if (tipo === 'SG') {
      this.filaSG.push(senha);
    }

    if (tipo === 'SE') {
      this.filaSE.push(senha);
    }

  }
  chamarSenha() {

  if (
    this.ultimoTipoChamado !== 'SP' &&
    this.filaSP.length > 0
  ) {

    this.senhaAtual = this.filaSP.shift() || '';
    this.ultimoTipoChamado = 'SP';

    this.ultimasChamadas.unshift(this.senhaAtual);

    if (this.ultimasChamadas.length > 5) {
      this.ultimasChamadas.pop();
    }

    return;
  }

  if (this.filaSE.length > 0) {

    this.senhaAtual = this.filaSE.shift() || '';
    this.ultimoTipoChamado = 'SE';

    this.ultimasChamadas.unshift(this.senhaAtual);

    if (this.ultimasChamadas.length > 5) {
      this.ultimasChamadas.pop();
    }

    return;
  }

  if (this.filaSG.length > 0) {

    this.senhaAtual = this.filaSG.shift() || '';
    this.ultimoTipoChamado = 'SG';

    this.ultimasChamadas.unshift(this.senhaAtual);

    if (this.ultimasChamadas.length > 5) {
      this.ultimasChamadas.pop();
    }

    return;
  }

  if (this.filaSP.length > 0) {

    this.senhaAtual = this.filaSP.shift() || '';
    this.ultimoTipoChamado = 'SP';

    this.ultimasChamadas.unshift(this.senhaAtual);

    if (this.ultimasChamadas.length > 5) {
      this.ultimasChamadas.pop();
    }

    return;
  }

  this.senhaAtual = 'Nenhuma senha disponível';

}
}