import {isConvertible} from './isConvertible';

export enum LengthUnits {
  /**
   * Length measurements
   */
  km = 1000,
  hm = 100,
  dam = 10,
  m = 1,
  dm = 0.1,
  cm = 0.01,
  mm = 0.001,
};

export class Length implements isConvertible<LengthUnits> {
  /**
   * Constructor of the class that contains the characteristics of a Length
   * @param valueActual current value
   * @param valueUnitsActual Current value of the measure
   */
    constructor(public valueActual: number, public valueUnitsActual: LengthUnits) {
    }

  /**
   * Public method that calculates the conversion
   * @param desiredUnit Measure to want to convert
   * @returns Converted measure
   */
    public convert(desiredUnit: LengthUnits): number {
      const aux: number = this.valueActual * this.valueUnitsActual;
      return aux / desiredUnit;
    }
}
