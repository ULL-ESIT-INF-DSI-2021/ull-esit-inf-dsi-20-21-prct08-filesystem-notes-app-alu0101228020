import {Fighter} from './fighter';

export class DC extends Fighter {
  /**
   * Constructor of the class that contains the characteristics of a DC
   * @param name DC character name
   * @param weight DC character weight
   * @param height DC character height
   * @param attack DC character attack
   * @param defense DC character defense
   * @param speed DC character speed
   * @param hp DC character hp
   * @param catchingPhrase DC character catchingPhrase
   * @param power DC character power
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
