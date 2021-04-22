import {Comision} from './comision';

export class VisaPay extends Comision {
  /**
   * Clase VisaPay que lleva a cabo el procedimiento de comision de Visa
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
    valor = this.precio * 0.065;
    return valor;
  }

  /**
   * Método hook protected que imprime el resultado con una frase
   * @param result El resultado de la comisión
   */
  protected mostrarComision(resultado: number) {
    console.log(`El resultado de la comisión VisaPay es: ${resultado}`);
  }
}
