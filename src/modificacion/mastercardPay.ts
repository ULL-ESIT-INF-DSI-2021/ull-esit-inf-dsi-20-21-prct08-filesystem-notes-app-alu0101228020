import {Comision} from './comision';

export class MastercardPay extends Comision {
  /**
   * Clase MastercardPay que lleva a cabo el procedimiento de comision de Mastercard
   * @param precio Precio del producto al que hacerle la comisión
   */
  constructor(protected precio: number) {
    super(precio);
  }

  /**
   * Método protected que lleva a cabo el calculo de la comisión
   * @returns El resultado de la comisión
   */
  protected comisionPay(): number {
    let valor: number = 0;
    valor = this.precio * 0.05;
    return valor;
  }

  /**
   * Método hook protected que imprime el resultado con una frase
   * @param result El resultado de la comisión
   */
  protected mostrarComision(resultado: number) {
    console.log(`El resultado de la comisión MastercardPay es: ${resultado}`);
  }
}
