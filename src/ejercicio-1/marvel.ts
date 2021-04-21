import {Fighter} from './fighter';

export class Marvel extends Fighter {
  /**
   * Constructor of the class that contains the characteristics of a Marvel
   * @param name Marvel character name
   * @param weight Marvel character weight
   * @param height Marvel character height
   * @param attack Marvel character attack
   * @param defense Marvel character defense
   * @param speed Marvel character speed
   * @param hp Marvel character hp
   * @param catchingPhrase Marvel character catchingPhrase
   * @param power Marvel character power
   */
  constructor(protected name: string, protected weight: number, protected height: number,
    protected attack: number, protected defense: number,
    protected speed: number, protected hp: number, protected catchingPhrase: string, protected power: string) {
    super(name, weight, height, attack, defense, speed, hp, catchingPhrase);
  }

  /**
   * Public method that takes the power value
   * @returns Power value
   */
  getPower() {
    return this.power;
  }
}
