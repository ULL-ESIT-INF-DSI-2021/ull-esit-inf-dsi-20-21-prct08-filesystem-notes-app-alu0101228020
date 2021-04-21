import 'mocha';
import {expect} from 'chai';
import {Universe} from '../src/ejercicio-1/universe';
import {Combat} from '../src/ejercicio-1/combat';
import {DC} from '../src/ejercicio-1/dc';
import {DragonBall} from '../src/ejercicio-1/dragonBall';
import {Marvel} from '../src/ejercicio-1/marvel';
import {Pokemon} from '../src/ejercicio-1/pokemon';
import {StarWars} from '../src/ejercicio-1/starWars';

describe(`EJERCICIO 1 - El combate definitivo`, () => {
  const blastoise = new Pokemon('Blastoise', 85.5, 1.6, 83, 100, 78, 200, 'mmm... Blastoise', 'water');
  const poliwrath = new Pokemon('Poliwrath', 54.0, 1.3, 95, 95, 70, 90, 'mmm... Poliwrath', 'water');
  const charizard = new Pokemon('Charizard', 90.5, 1.7, 84, 78, 100, 200, 'mmm... Charizard', 'fire');
  const pikachu = new Pokemon('Pikachu', 7, 0.4, 90, 40, 120, 300, 'Pika-Pika-Pii', 'electric');

  const batman = new DC('Batman', 80, 1.8, 150, 50, 80, 1000, 'Suerte, viejo... todo es gracias a la suerte', 'Dominio de artes marciales y técnicas de sigilo e intimidación');
  const thor = new Marvel('Thor', 80, 1.8, 120, 80, 80, 1000, 'Hoy no planeo morir', 'Lanzar rayos, volar, teletransportarse y golpear con el martillo mágico');
  const goku = new DragonBall('Goku', 80, 1.8, 100, 40, 80, 1000, '¡Desata tu poder, Gohan!', 'Oozaru');
  const luke = new StarWars('Luke', 80, 1.8, 80, 200, 80, 1000, 'Yo soy tu padre', true);

  const universe = new Universe([blastoise, poliwrath, batman, thor, goku, luke, charizard, pikachu]);
  const combatFighters = new Combat(universe.getCharacters()[2], universe.getCharacters()[5]);
  const combatFighters2 = new Combat(universe.getCharacters()[0], universe.getCharacters()[6]);
  const combatFighters3 = new Combat(universe.getCharacters()[6], universe.getCharacters()[7]);
  const combatFighters4 = new Combat(universe.getCharacters()[2], universe.getCharacters()[3]);

  describe('Llamadas a un objeto de la clase Pokemon', () => {
    it('Exist an object from Pokemon class', () => {
      expect(blastoise).not.to.be.equal(null);
    });

    it('blastoise.getName() returns value Blastoise', () => {
      expect(blastoise.getName()).to.be.equal('Blastoise');
    });

    it('blastoise.getWeight() returns value 85.5', () => {
      expect(blastoise.getWeight()).to.be.equal(85.5);
    });

    it('blastoise.getHeight() returns value 1.6', () => {
      expect(blastoise.getHeight()).to.be.equal(1.6);
    });

    it('blastoise.getAttack() returns value 83', () => {
      expect(blastoise.getAttack()).to.be.equal(83);
    });

    it('blastoise.getDefense() returns value 100', () => {
      expect(blastoise.getDefense()).to.be.equal(100);
    });

    it('blastoise.getSpeed() returns value 78', () => {
      expect(blastoise.getSpeed()).to.be.equal(78);
    });

    it('blastoise.getHp() returns value 200', () => {
      expect(blastoise.getHp()).to.be.equal(200);
    });

    it('blastoise.getCatchingPhrase() returns value mmm... Blastoise', () => {
      expect(blastoise.getCatchingPhrase()).to.be.equal('mmm... Blastoise');
    });

    it('blastoise.getType() returns value water', () => {
      expect(blastoise.getType()).to.be.equal('water');
    });
  });

  describe('Llamadas a un objeto de la clase starWars', () => {
    it('Exist an object from starWars class', () => {
      expect(luke).not.to.be.equal(null);
    });

    it('luke.getisDarkSide() returns value true', () => {
      expect(luke.getisDarkSide()).to.be.equal(true);
    });
  });

  describe('Llamadas a un objeto de la clase DC', () => {
    it('Exist an object from DC class', () => {
      expect(batman).not.to.be.equal(null);
    });

    it('batman.getPower() returns value Dominio de artes marciales y técnicas de sigilo e intimidación', () => {
      expect(batman.getPower()).to.be.equal('Dominio de artes marciales y técnicas de sigilo e intimidación');
    });
  });

  describe('Llamadas a un objeto de la clase Marvel', () => {
    it('Exist an object from Marvel class', () => {
      expect(thor).not.to.be.equal(null);
    });

    it('thor.getPower() returns value Lanzar rayos, volar, teletransportarse y golpear con el martillo mágico', () => {
      expect(thor.getPower()).to.be.equal('Lanzar rayos, volar, teletransportarse y golpear con el martillo mágico');
    });
  });

  describe('Llamadas a un objeto de la clase DragonBall', () => {
    it('Exist an object from DragonBall class', () => {
      expect(goku).not.to.be.equal(null);
    });

    it('goku.getPower() returns value Oozaru', () => {
      expect(goku.getPower()).to.be.equal('Oozaru');
    });
  });

  describe('Llamadas a un objeto de la clase Universe', () => {
    it('Exist an object from Universe class', () => {
      expect(universe).not.to.be.equal(null);
    });

    it('universe.getUniverse() returns value [blastoise, poliwrath, batman, thor, goku, luke, charizard, pikachu]', () => {
      expect(universe.getCharacters()).to.be.eql([blastoise, poliwrath, batman, thor, goku, luke, charizard, pikachu]);
    });
  });

  describe('Llamadas a un objeto de la clase Combat', () => {
    it('Exist an object from Combat class', () => {
      expect(combatFighters).not.to.be.equal(null);
    });

    it('combatFighters.start() returns value The combat is over and the winning opponent is: Batman', () => {
      expect(combatFighters.start()).to.be.equal('The combat is over and the winning opponent is: Batman');
    });

    it('combatFighters2.start() returns value The combat is over and the winning opponent is: Blastoise', () => {
      expect(combatFighters2.start()).to.be.equal('The combat is over and the winning opponent is: Blastoise');
    });

    it('combatFighters3.start() returns value The combat is over and the winning opponent is: Charizard', () => {
      expect(combatFighters3.start()).to.be.equal('The combat is over and the winning opponent is: Charizard');
    });

    it('combatFighters4.start() returns value The combat is over and the winning opponent is: Thor', () => {
      expect(combatFighters4.start()).to.be.equal('The combat is over and the winning opponent is: Thor');
    });
  });
});
