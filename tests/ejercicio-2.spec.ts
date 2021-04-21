import 'mocha';
import {expect} from 'chai';
import {Force, ForceUnits} from '../src/ejercicio-2/force';
import {Length, LengthUnits} from '../src/ejercicio-2/length';
import {Mass, MassUnits} from '../src/ejercicio-2/mass';
import {Speed, SpeedUnits} from '../src/ejercicio-2/speed';
import {Temperature, TemperatureUnits} from '../src/ejercicio-2/temperature';
import {Time, TimeUnits} from '../src/ejercicio-2/time';
import {Volume, VolumeUnits} from '../src/ejercicio-2/volume';

describe(`EJERCICIO 2 - Conversor de unidades`, () => {
  const valueForce = new Force(5, ForceUnits.kilopondio);
  const valueLength = new Length(5, LengthUnits.km);
  const valueMass = new Mass(5, MassUnits.T);
  const valueSpeed = new Speed(5, SpeedUnits.miPerS);
  const valueTemperature = new Temperature(5, TemperatureUnits.celsius);
  const valueTime = new Time(5, TimeUnits.month);
  const valueVolume = new Volume(5, VolumeUnits.l);
  
  describe('Llamadas a un objeto de la clase Force', () => {
    it('Exist an object from Force class', () => {
        expect(valueForce).not.to.be.equal(null);
    });

    it('valueForce.convert(ForceUnits.newton) returns value 49.033249999999995', () => {
      expect(valueForce.convert(ForceUnits.newton)).to.be.equal(49.033249999999995);
    });
  });

  describe('Llamadas a un objeto de la clase Length', () => {
    it('Exist an object from Length class', () => {
        expect(valueLength).not.to.be.equal(null);
    });

    it('valueLength.convert(LengthUnits.dm) returns value 50000', () => {
      expect(valueLength.convert(LengthUnits.dm)).to.be.equal(50000);
    });
  });

  describe('Llamadas a un objeto de la clase Mass', () => {
    it('Exist an object from Mass class', () => {
        expect(valueMass).not.to.be.equal(null);
    });

    it('valueMass.convert(MassUnits.dg) returns value 50000000', () => {
      expect(valueMass.convert(MassUnits.dg)).to.be.equal(50000000);
    });
  });

  describe('Llamadas a un objeto de la clase Speed', () => {
    it('Exist an object from Speed class', () => {
        expect(valueSpeed).not.to.be.equal(null);
    });

    it('valueSpeed.convert(SpeedUnits.miPerS) returns value 5', () => {
      expect(valueSpeed.convert(SpeedUnits.miPerS)).to.be.equal(5);
    });
  });

  describe('Llamadas a un objeto de la clase Temperature', () => {
    it('Exist an object from Temperature class', () => {
        expect(valueTemperature).not.to.be.equal(null);
    });

    it('valueTemperature.convert(TemperatureUnits.kelvin) returns value 278.15', () => {
      expect(valueTemperature.convert(TemperatureUnits.kelvin)).to.be.equal(278.15);
    });

    it('valueTemperature.convert(TemperatureUnits.celsius) returns value 5', () => {
        expect(valueTemperature.convert(TemperatureUnits.celsius)).to.be.equal(5);
      });
  });

  describe('Llamadas a un objeto de la clase Time', () => {
    it('Exist an object from Time class', () => {
        expect(valueTime).not.to.be.equal(null);
    });

    it('valueTime.convert(TimeUnits.week) returns value 21.428571428571427', () => {
      expect(valueTime.convert(TimeUnits.week)).to.be.equal(21.428571428571427);
    });
  });

  describe('Llamadas a un objeto de la clase Volume', () => {
    it('Exist an object from Volume class', () => {
        expect(valueVolume).not.to.be.equal(null);
    });

    it('valueVolume.convert(VolumeUnits.m3) returns value 0.005', () => {
      expect(valueVolume.convert(VolumeUnits.m3)).to.be.equal(0.005);
    });
  });
})
