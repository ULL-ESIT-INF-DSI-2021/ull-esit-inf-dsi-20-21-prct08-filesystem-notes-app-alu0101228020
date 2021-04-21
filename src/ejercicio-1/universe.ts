import {Fighter} from './fighter';

export class Universe {
  /**
   * Constructor of the class that contains the characteristics of a Universe
   * @param characters Universe characters
   */
  constructor(private characters: Fighter[]) {
  }

  /**
   * Public method that takes the characters value
   * @returns characters value
   */
  getCharacters() {
    return this.characters;
  }
}
