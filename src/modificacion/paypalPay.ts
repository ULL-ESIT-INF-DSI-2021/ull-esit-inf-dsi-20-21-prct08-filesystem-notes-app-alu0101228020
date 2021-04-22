import {Comision} from './comision';

export class PayPalPay extends Comision {
  /**
   * Clase PayPalPay que lleva a cabo el procedimiento de comision de PayPal
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
    valor = this.precio * 0.03;
    return valor;
  }

  /**
   * Método hook protected que imprime el resultado con una frase
   * @param result El resultado de la comisión
   */
  protected mostrarComision(resultado: number) {
    console.log(`El resultado de la comisión PayPalPay es: ${resultado}`);
  }
}
