export interface isConvertible<T> {
    valueActual: number;
    valueUnitsActual: T;
    /**
     * Method that calculates the conversion
     * @param desiredUnit Measure to want to convert
     */
    convert(desiredUnit : T): number;
}