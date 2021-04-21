import {isConvertible} from './isConvertible';

export enum MassUnits {
  /**
   * Mass measurements
   */
  T = 1000000,
  kg = 1000,
  hg = 100,
  dag = 10,
  g = 1,
  dg = 0.1,
  cg = 0.01,
  mg = 0.001,
};

export class Mass implements isConvertible<MassUnits> {
  /**
   * Constructor of the class that contains the characteristics of a Length
   * @param valueActual current value
   * @param valueUnitsActual Current value of the measure
   */
    constructor(public valueActual: number, public valueUnitsActual: MassUnits) {
    }

  /**
   * Public method that calculates the conversion
   * @param desiredUnit Measure to want to convert
   * @returns Converted measure
   */
    public convert(desiredUnit: MassUnits): number {
      const aux: number = this.valueActual * this.valueUnitsActual;
      return aux / desiredUnit;
    }
}
