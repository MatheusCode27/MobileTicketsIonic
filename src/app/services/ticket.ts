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

  totalEmitidas = 0;
  totalAtendidas = 0;

  emitidasSP = 0;
  emitidasSG = 0;
  emitidasSE = 0;

  atendidasSP = 0;
  atendidasSG = 0;
  atendidasSE = 0;

  senhaAtual = '';
  ultimasChamadas: string[] = [];
  historicoChamadas: string[] = [];
  historicoDetalhado: string[] = [];
  ultimoTipoChamado = '';
  horaAtual = '';

  guicheAtual = 1;

  ultimaData = '';

  tmSP = 15 + Math.floor(Math.random() * 11) - 5;
  tmSG = 5 + Math.floor(Math.random() * 7) - 3;
  tmSE = Math.random() <= 0.05 ? 5 : 1;
  totalDescartadas = 0;
  senhasDescartadas: string[] = [];
  relatorioMensal: string[] = [];

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

    const hoje =
      data.getFullYear() +
      '-' +
      String(data.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(data.getDate()).padStart(2, '0');

    if (this.ultimaData !== hoje) {

      this.contadorSP = 1;
      this.contadorSG = 1;
      this.contadorSE = 1;

      this.ultimaData = hoje;
    }

    const horaAtual = data.getHours();

    if (horaAtual < 7 || horaAtual >= 17) {
      alert('Fora do horário de expediente (07h às 17h)');
      return;
    }

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
      this.emitidasSP++;
    }

    if (tipo === 'SG') {
      this.filaSG.push(senha);
      this.emitidasSG++;
    }

    if (tipo === 'SE') {
      this.filaSE.push(senha);
      this.emitidasSE++;
    }

    this.totalEmitidas++;

  }
  chamarSenha() {
    const data = new Date();
    const horaAtual = data.getHours();

    if (horaAtual >= 17) {

      this.totalDescartadas +=
        this.filaSP.length +
        this.filaSG.length +
        this.filaSE.length;

      this.filaSP = [];
      this.filaSG = [];
      this.filaSE = [];

      this.senhaAtual = 'Expediente encerrado';

      return;
    }

    if (
      this.ultimoTipoChamado !== 'SP' &&
      this.filaSP.length > 0
    ) {

      this.senhaAtual = this.filaSP.shift() || '';
      this.ultimoTipoChamado = 'SP';

      this.ultimasChamadas.unshift(this.senhaAtual);
      this.historicoChamadas.unshift(this.senhaAtual);
      const agora = new Date();

      const horaAtendimento =
        String(agora.getHours()).padStart(2, '0') + ':' +
        String(agora.getMinutes()).padStart(2, '0') + ':' +
        String(agora.getSeconds()).padStart(2, '0');

      this.historicoDetalhado.unshift(
        this.senhaAtual +
        ' | Atendida às ' +
        horaAtendimento +
        ' | Guichê ' +
        this.guicheAtual
      );
      this.guicheAtual++;

      if (this.guicheAtual > 3) {
        this.guicheAtual = 1;
      }

      if (this.ultimasChamadas.length > 5) {
        this.ultimasChamadas.pop();
      }

      const sorteio = Math.random();

      if (sorteio <= 0.05) {

        this.totalDescartadas++;

        this.senhasDescartadas.unshift(this.senhaAtual);

        this.historicoDetalhado.unshift(
          this.senhaAtual + ' | NÃO COMPARECEU'
        );

        return;
      }

      this.atendidasSP++;
      this.totalAtendidas++;

      return;
    }

    if (this.filaSE.length > 0) {

      this.senhaAtual = this.filaSE.shift() || '';
      this.ultimoTipoChamado = 'SE';

      this.ultimasChamadas.unshift(this.senhaAtual);
      this.historicoChamadas.unshift(this.senhaAtual);
      const agora = new Date();

      const horaAtendimento =
        String(agora.getHours()).padStart(2, '0') + ':' +
        String(agora.getMinutes()).padStart(2, '0') + ':' +
        String(agora.getSeconds()).padStart(2, '0');

      this.historicoDetalhado.unshift(
        this.senhaAtual +
        ' | Atendida às ' +
        horaAtendimento +
        ' | Guichê ' +
        this.guicheAtual
      );
      this.guicheAtual++;

      if (this.guicheAtual > 3) {
        this.guicheAtual = 1;
      }

      if (this.ultimasChamadas.length > 5) {
        this.ultimasChamadas.pop();
      }

      const sorteio = Math.random();

      if (sorteio <= 0.05) {

        this.totalDescartadas++;

        this.senhasDescartadas.unshift(this.senhaAtual);

        this.historicoDetalhado.unshift(
          this.senhaAtual + ' | NÃO COMPARECEU'
        );

        return;
      }

      this.atendidasSE++;
      this.totalAtendidas++;

      return;
    }

    if (this.filaSG.length > 0) {

      this.senhaAtual = this.filaSG.shift() || '';
      this.ultimoTipoChamado = 'SG';

      this.ultimasChamadas.unshift(this.senhaAtual);
      this.historicoChamadas.unshift(this.senhaAtual);
      const agora = new Date();

      const horaAtendimento =
        String(agora.getHours()).padStart(2, '0') + ':' +
        String(agora.getMinutes()).padStart(2, '0') + ':' +
        String(agora.getSeconds()).padStart(2, '0');

      this.historicoDetalhado.unshift(
        this.senhaAtual +
        ' | Atendida às ' +
        horaAtendimento +
        ' | Guichê ' +
        this.guicheAtual
      );
      this.guicheAtual++;

      if (this.guicheAtual > 3) {
        this.guicheAtual = 1;
      }

      if (this.ultimasChamadas.length > 5) {
        this.ultimasChamadas.pop();
      }

      const sorteio = Math.random();

      if (sorteio <= 0.05) {

        this.totalDescartadas++;

        this.senhasDescartadas.unshift(this.senhaAtual);

        this.historicoDetalhado.unshift(
          this.senhaAtual + ' | NÃO COMPARECEU'
        );

        return;
      }

      this.atendidasSG++;
      this.totalAtendidas++;

      return;
    }

    if (this.filaSP.length > 0) {

      this.senhaAtual = this.filaSP.shift() || '';
      this.ultimoTipoChamado = 'SP';

      this.ultimasChamadas.unshift(this.senhaAtual);
      this.historicoChamadas.unshift(this.senhaAtual);
      const agora = new Date();

      const horaAtendimento =
        String(agora.getHours()).padStart(2, '0') + ':' +
        String(agora.getMinutes()).padStart(2, '0') + ':' +
        String(agora.getSeconds()).padStart(2, '0');

      this.historicoDetalhado.unshift(
        this.senhaAtual +
        ' | Atendida às ' +
        horaAtendimento +
        ' | Guichê ' +
        this.guicheAtual
      );
      this.guicheAtual++;

      if (this.guicheAtual > 3) {
        this.guicheAtual = 1;
      }

      if (this.ultimasChamadas.length > 5) {
        this.ultimasChamadas.pop();
      }

      const sorteio = Math.random();

      if (sorteio <= 0.05) {

        this.totalDescartadas++;

        this.senhasDescartadas.unshift(this.senhaAtual);

        this.historicoDetalhado.unshift(
          this.senhaAtual + ' | NÃO COMPARECEU'
        );

        return;
      }

      this.atendidasSP++;
      this.totalAtendidas++;

      return;
    }

    this.senhaAtual = 'Nenhuma senha disponível';

  }
}