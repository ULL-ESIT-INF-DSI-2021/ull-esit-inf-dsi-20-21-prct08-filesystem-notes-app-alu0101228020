import {Fighter} from './fighter';
import {Pokemon} from './pokemon';
import {StarWars} from './starWars';
import {Universe} from './universe';
import {DC} from './dc';
import {DragonBall} from './dragonBall';
import {Marvel} from './marvel';

export class Combat {
  /**
   * Constructor of the class that contains the characteristics of a combat
   * @param opponent1 First opponent of the Fighter class
   * @param opponent2 Second opponent of the Fighter class
   */
  constructor(private opponent1: Fighter, private opponent2: Fighter) {
  }

  /**
   * Private method that calculates the damage caused by a fighter on another fighter
   * @param opponent1 Attacking fighter of the Fighter class
   * @param opponent2 Defender fighter of the Fighter class
   * @returns 
   */
  private damageCaused(opponent1: Fighter, opponent2: Fighter) {
    if (opponent1 instanceof Pokemon && opponent2 instanceof Pokemon) {
      if ((opponent1.getType() === 'fire' && opponent2.getType() === 'grass') || ((opponent1.getType() === 'water' && opponent2.getType() === 'fire') ||
    ((opponent1.getType() === 'grass' || opponent1.getType() === 'electric') && opponent2.getType() === 'water'))) {
        return (50 * (opponent1.getAttack()/opponent2.getDefense()) * 2);
      }
      if (((opponent1.getType() === 'grass' || opponent1.getType() === 'fire') && opponent2.getType() === 'electric') ||
    (opponent1.getType() === 'electric' && (opponent2.getType() === 'grass' || opponent2.getType() === 'fire'))) {
        return (50 * (opponent1.getAttack()/opponent2.getDefense()) * 1);
      }
      return (50 * (opponent1.getAttack()/opponent2.getDefense()) * 0.5);
    }

    if ((opponent1 instanceof DragonBall) || (opponent1 instanceof DC && ((opponent2 instanceof StarWars) || (opponent2 instanceof Pokemon))) || 
    (opponent1 instanceof Marvel && ((opponent2 instanceof StarWars) || (opponent2 instanceof Pokemon))) || 
    (opponent1 instanceof StarWars && opponent2 instanceof Pokemon)) {
      return (50 * (opponent1.getAttack()/opponent2.getDefense())* 2);
    }
    if ((opponent1 instanceof DC && opponent2 instanceof Marvel) || (opponent1 instanceof Marvel && opponent2 instanceof DC)) {
      return (50 * (opponent1.getAttack()/opponent2.getDefense()) * 1);
    }
    return (50 * (opponent1.getAttack()/opponent2.getDefense()) * 0.5);
  }

  /**
   * Public method that contains the combat between fighters
   * @returns The winner of the match
   */
  start(): string {
    let hp1: number = this.opponent1.getHp();
    let hp2: number = this.opponent2.getHp();
    console.log('The combat begins!\n\n');
    console.log(`The opponent 1 is ${this.opponent1.getName()} and has ${this.opponent1.getHp()} HP\n\n`);
    console.log(`The opponent 2 is ${this.opponent2.getName()} and has ${this.opponent2.getHp()} HP\n\n`);
    while (hp1 > 0) {
      hp2 = hp2 - this.damageCaused(this.opponent1, this.opponent2);
      console.log(this.opponent1.getCatchingPhrase() + `\n`);
      console.log(`Attack of ${this.opponent1.getName()} >> ${this.opponent2.getName()} has ${hp2} HP\n\n`);
      if (hp2 <= 0) {
        console.log(`The combat is over and the winning opponent is: ${this.opponent1.getName()}`);
        return (`The combat is over and the winning opponent is: ${this.opponent1.getName()}`);
      }
      hp1 = hp1 - this.damageCaused(this.opponent2, this.opponent1);
      console.log(this.opponent2.getCatchingPhrase() + `\n`);
      console.log(`Attack of ${this.opponent2.getName()} >> ${this.opponent1.getName()} has ${hp1} HP\n\n`);
    }
    console.log(`The combat is over and the winning opponent is: ${this.opponent2.getName()}`);
    return (`The combat is over and the winning opponent is: ${this.opponent2.getName()}`);
  }
}
