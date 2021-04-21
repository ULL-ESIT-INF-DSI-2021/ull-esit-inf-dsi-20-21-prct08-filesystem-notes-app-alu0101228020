import {isConvertible} from './isConvertible';

export enum TimeUnits {
  /**
   * Time measurements
   */
  year = 31536000,
  month = 2592000,
  week = 604800,
  day = 86400,
  hour = 3600,
  min = 60,
  sec = 1,
};

export class Time implements isConvertible<TimeUnits> {
  /**
   * Constructor of the class that contains the characteristics of a Time
   * @param valueActual current value
   * @param valueUnitsActual Current value of the measure
   */
  constructor(public valueActual: number, public valueUnitsActual: TimeUnits) {
  }
  
  /**
  * Public method that calculates the conversion
  * @param desiredUnit Measure to want to convert
  * @returns Converted measure
   */
  public convert(desiredUnit: TimeUnits): number {
    const aux: number = this.valueActual * this.valueUnitsActual;
    return aux / desiredUnit;
  }
}
