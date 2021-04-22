export abstract class Comision {
  /**
   * Clase abstracta que lleva a cabo el cálculo de comisiones
   * @param precio Precio del producto al que hacerle la comisión
   */
  constructor(protected precio: number) {}

  /**
   * Método público que lleva a cabo el algoritmo que realiza la comisión
   * @returns El resultado de la comisión
   */
  public comision(): number {
    const comision = this.comisionPay();
    this.mostrarComision(comision);
    return comision;
  }

  /**
   * Método abstracto que lleva a cabo el caćulo de la comisión en casa subclase
   */
  protected abstract comisionPay(): number;

  /**
   * Método hook que imprime el resultado con una frase
   * @param result El resultado de la comisión
   */
  protected mostrarComision(result: number) {}
}

