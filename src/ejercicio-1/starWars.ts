import {Fighter} from './fighter';

export class StarWars extends Fighter {
  /**
   * Constructor of the class that contains the characteristics of a StarWars
   * @param name StarWars character name
   * @param weight StarWars character weight
   * @param height StarWars character height
   * @param attack StarWars character attack
   * @param defense StarWars character defense
   * @param speed StarWars character speed
   * @param hp StarWars character hp
   * @param catchingPhrase StarWars character catchingPhrase
   * @param isDarkSide StarWars character isDarkSide
   */
  constructor(protected name: string, protected weight: number, protected height: number,
    protected attack: number, protected defense: number,
    protected speed: number, protected hp: number, protected catchingPhrase: string, protected isDarkSide: boolean) {
    super(name, weight, height, attack, defense, speed, hp, catchingPhrase);
  }

  /**
   * Public method that takes the isDarkSide value
   * @returns isDarkSide value
   */
  getisDarkSide() {
    return this.isDarkSide;
  }
}
