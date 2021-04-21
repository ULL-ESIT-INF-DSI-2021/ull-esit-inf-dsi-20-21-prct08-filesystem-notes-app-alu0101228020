import {Fighter} from './fighter';

type typeOfPokemon = 'fire' | 'grass' | 'water' | 'electric';

export class Pokemon extends Fighter {
  /**
   * Constructor of the class that contains the characteristics of a Pokemon
   * @param name Pokemon character name
   * @param weight Pokemon character weight
   * @param height Pokemon character height
   * @param attack Pokemon character attack
   * @param defense Pokemon character defense
   * @param speed Pokemon character speed
   * @param hp Pokemon character hp
   * @param catchingPhrase Pokemon character catchingPhrase
   * @param type Pokemon character type
   */
  constructor(protected name: string, protected weight: number, protected height: number,
  protected attack: number, protected defense: number,
  protected speed: number, protected hp: number, protected catchingPhrase: string, protected type: typeOfPokemon) {
    super(name, weight, height, attack, defense, speed, hp, catchingPhrase);
  }

  /**
   * Public method that takes the type value
   * @returns type value
   */
  getType() {
    return this.type;
  }
}
