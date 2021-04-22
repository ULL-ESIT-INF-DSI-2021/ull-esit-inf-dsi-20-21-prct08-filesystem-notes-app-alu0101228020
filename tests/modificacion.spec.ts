import 'mocha';
import {expect} from 'chai';
import {Comision} from '../src/modificacion/comision';
import {MastercardPay} from '../src/modificacion/mastercardPay';
import {PayPalPay} from '../src/modificacion/paypalPay';
import {VisaPay} from '../src/modificacion/visaPay';

describe('Ejercicio de clase - Métodos de pago', () => {
  const mastercardPay = new MastercardPay(200);
  const paypalPay = new PayPalPay(300);
  const visaPay = new VisaPay(400);

  describe('mastercardPay function test', () => {
    it('is a mastercardPay object', () => {
      expect(mastercardPay).not.to.be.equal(null);
    });
    it('mastercardPay.comision() returns 10', () => {
      expect(mastercardPay.comision()).to.be.equal(10);
    });
  });

  describe('paypalPay function test', () => {
    it('is a paypalPay object', () => {
      expect(paypalPay).not.to.be.equal(null);
    });
    it('paypalPay.comision() returns 9', () => {
      expect(paypalPay.comision()).to.be.equal(9);
    });
  });

  describe('visaPay function test', () => {
    it('is a visaPay object', () => {
      expect(visaPay).not.to.be.equal(null);
    });
    it('visaPay.comision() returns 26', () => {
      expect(visaPay.comision()).to.be.equal(26);
    });
  });
});
