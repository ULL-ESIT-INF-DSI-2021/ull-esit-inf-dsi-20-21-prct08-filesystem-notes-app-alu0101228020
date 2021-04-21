import {isConvertible} from './isConvertible';

export enum SpeedUnits {
  /**
   * Speed measurements
   */
  mPerS = 1,
  kmPerH = 3.6,
  fPerS = 3.281,
  miPerH = 2.237,
  miPerS = 0.000621371
};

export class Speed implements isConvertible<SpeedUnits> {
  /**
   * Constructor of the class that contains the characteristics of a Speed
   * @param valueActual current value
   * @param valueUnitsActual Current value of the measure
   */
    constructor(public valueActual: number, public valueUnitsActual: SpeedUnits) {
    }

    /**
    * Public method that calculates the conversion
    * @param desiredUnit Measure to want to convert
    * @returns Converted measure
     */
    public convert(desiredUnit: SpeedUnits): number {
      const aux: number = this.valueActual / this.valueUnitsActual;
      return aux * desiredUnit;
    }
}
