import {isConvertible} from './isConvertible';

export enum ForceUnits {
  /**
   * Force measurements
   */
  newton = 1,
  kilopondio = 9.80665,

};

export class Force implements isConvertible<ForceUnits> {
  /**
   * Constructor of the class that contains the characteristics of a Force
   * @param valueActual current value
   * @param valueUnitsActual Current value of the measure
   */
  constructor(public valueActual: number, public valueUnitsActual: ForceUnits) {
  }
  
  /**
   * Public method that calculates the conversion
   * @param desiredUnit Measure to want to convert
   * @returns Converted measure
   */
  public convert(desiredUnit: ForceUnits): number {
    const aux: number = this.valueActual * this.valueUnitsActual;
    return aux / desiredUnit;
  }
}
