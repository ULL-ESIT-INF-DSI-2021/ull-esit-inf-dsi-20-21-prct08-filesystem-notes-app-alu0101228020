import {isConvertible} from './isConvertible';

export enum VolumeUnits {
  /**
   * Volume measurements
   */
 km3 = 1000000000,
 hm3 = 1000000, 
 dam3 = 1000,
 m3 = 1,
 l = 0.001,
 dm3 = 0.001,
 cm3 = 0.000001,
 mm3 = 0.000000001,
};

export class Volume implements isConvertible<VolumeUnits> {
  /**
   * Constructor of the class that contains the characteristics of a Volume
   * @param valueActual current value
   * @param valueUnitsActual Current value of the measure
   */
  constructor(public valueActual: number, public valueUnitsActual: VolumeUnits) {
  }
  
  /**
  * Public method that calculates the conversion
  * @param desiredUnit Measure to want to convert
  * @returns Converted measure
   */
  public convert(desiredUnit: VolumeUnits): number {
    const aux: number = this.valueActual * this.valueUnitsActual;
    return aux / desiredUnit;
  }
}
