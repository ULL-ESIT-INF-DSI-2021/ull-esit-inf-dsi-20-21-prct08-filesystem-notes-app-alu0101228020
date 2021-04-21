import {Fighter} from './fighter';

export type powerPhases = 'Oozaru' | 'SuperSaiyan' | 'SuperSaiyan2' | 'SuperSaiyan3';

export class DragonBall extends Fighter {
  /**
   * Constructor of the class that contains the characteristics of a DragonBall
   * @param name DragonBall character name
   * @param weight DragonBall character weight
   * @param height DragonBall character height
   * @param attack DragonBall character attack
   * @param defense DragonBall character defense
   * @param speed DragonBall character speed
   * @param hp DragonBall character hp
   * @param catchingPhrase DragonBall character catchingPhrase
   * @param phases DragonBall character phases
   */
  constructor(protected name: string, protected weight: number, protected height: number,
    protected attack: number, protected defense: number,
    protected speed: number, protected hp: number, protected catchingPhrase: string, protected phases: powerPhases) {
    super(name, weight, height, attack, defense, speed, hp, catchingPhrase);
  }

  /**
   * Public method that takes the power value
   * @returns Power value
   */
  getPower() {
    return this.phases;
  }
}
