import {isConvertible} from './isConvertible';

export enum TemperatureUnits {
  /**
   * Temperature measurements
   */
  celsius = -273.15,
  kelvin = 273.15,
};

export class Temperature implements isConvertible<TemperatureUnits> {
  /**
   * Constructor of the class that contains the characteristics of a Temperature
   * @param valueActual current value
   * @param valueUnitsActual Current value of the measure
   */
  constructor(public valueActual: number, public valueUnitsActual: TemperatureUnits) {
  }
  
  /**
  * Public method that calculates the conversion
  * @param desiredUnit Measure to want to convert
  * @returns Converted measure
   */
  public convert(desiredUnit: TemperatureUnits): number {
      if (desiredUnit == this.valueUnitsActual) {
        return this.valueActual;
      }
      return this.valueActual + desiredUnit;
  }
}
