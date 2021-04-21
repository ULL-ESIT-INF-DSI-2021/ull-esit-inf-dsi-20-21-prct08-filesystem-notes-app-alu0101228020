export abstract class Fighter {
  /**
   * Constructor of the class that contains the characteristics of a Fighter
   * @param name Fighter character name
   * @param weight Fighter character weight
   * @param height Fighter character height
   * @param attack Fighter character attack
   * @param defense Fighter character defense
   * @param speed Fighter character speed
   * @param hp Fighter character hp
   * @param catchingPhrase Fighter character catchingPhrase
   */
  constructor(protected name: string, protected weight: number, protected height: number,
    protected attack: number, protected defense: number,
    protected speed: number, protected hp: number, protected catchingPhrase: string) {
  }

  /**
   * Public method that takes the name value
   * @returns name value
   */
  getName() {
    return this.name;
  }

  /**
   * Public method that takes the weight value
   * @returns weight value
   */
  getWeight() {
    return this.weight;
  }

  /**
   * Public method that takes the height value
   * @returns height value
   */
  getHeight() {
    return this.height;
  }

  /**
   * Public method that takes the attack value
   * @returns attack value
   */
  getAttack() {
    return this.attack;
  }

  /**
   * Public method that takes the defense value
   * @returns defense value
   */
  getDefense() {
    return this.defense;
  }

  /**
   * Public method that takes the speed value
   * @returns speed value
   */
  getSpeed() {
    return this.speed;
  }

  /**
   * Public method that takes the hp value
   * @returns hp value
   */
  getHp() {
    return this.hp;
  }

  /**
   * Public method that takes the catchingPhrase value
   * @returns catchingPhrase value
   */
  getCatchingPhrase() {
    return this.catchingPhrase;
  }
}
