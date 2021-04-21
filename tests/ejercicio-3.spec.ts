import 'mocha';
import {expect} from 'chai';
import {Documentaries, DocumentaryInformation} from '../src/ejercicio-3/documentaries';
import {Films, FilmInformation} from '../src/ejercicio-3/films';
import {Series, SerieInformation} from '../src/ejercicio-3/series';

describe(`EJERCICIO 3 - DSIflix`, () => {
  const OJMadeinAmerica: DocumentaryInformation = {title: 'O.J. MadeinAmerica', director: 'Ezra Edelman', type: 'historical', date: '2016', duration: 448};
  const InsideJob: DocumentaryInformation = {title: 'Inside Job', director: 'Charles Ferguson', type: 'historical', date: '2010', duration: 105};
  const Home: DocumentaryInformation = {title: 'Home', director: 'Yann Arthus-Bertrand', type: 'nature', date: '2009', duration: 90};

  const documentariesCollection = new Documentaries([OJMadeinAmerica, InsideJob, Home]);

  const It: FilmInformation = {title: 'It', director: 'Andrés Muschietti', genre: ['terror', 'suspense'], date: '2017', duration: 169};
  const Mulan: FilmInformation = {title: 'Mulan', director: 'Niki Caro', genre: ['animation', 'action', 'fantasy'], date: '2020', duration: 115};
  const PearlHarbor: FilmInformation = {title: 'PearlHarbor', director: 'Michael Bay', genre: ['romantic', 'drama', 'historical', 'epic'], date: '2001', duration: 183};

  const filmsCollection = new Films([It, Mulan, PearlHarbor]);

  const You: SerieInformation = {title: 'You', numberOfSeasons: 2, numberOfchapters: 20, director: 'Ryan Lindenberg', genre: ['suspenso psicológico', 'novela Policiaca'], date: '2018'};
  const BreakingBad: SerieInformation = {title: 'Breaking Bad', genre: ['drama', 'crime', 'thriller'], numberOfSeasons: 5, numberOfchapters: 62, date: '2008', director: 'Vince Gilligan'};
  const Lucifer: SerieInformation = {title: 'Lucifer', genre: ['fantasy', 'horror'], numberOfSeasons: 5, numberOfchapters: 75, director: 'Tom Kapinos', date: '2016'};

  const seriesCollection = new Series([You, BreakingBad, Lucifer]);


  describe('Llamadas a un objeto de la clase Documentaries', () => {
    it('Exist an object from Documentaries class', () => {
        expect(documentariesCollection).not.to.be.equal(null);
    });

    it('documentariesCollection.deleteElement(Home) returns value [OJMadeinAmerica, InsideJob]', () => {
        expect(documentariesCollection.deleteElement(Home)).to.be.eql(documentariesCollection.collection);
    });

    it('documentariesCollection.deleteElement(Home) returns value [OJMadeinAmerica, InsideJob]', () => {
        expect(documentariesCollection.deleteElement(Home)).to.be.eql(documentariesCollection.collection);
    });

    it('documentariesCollection.addElement(Home) returns value [OJMadeinAmerica, InsideJob, Home]', () => {
      expect(documentariesCollection.addElement(Home)).to.be.eql(documentariesCollection.collection);
    });

    it('documentariesCollection.searchElement([\`duration`\, \`type`\], [\`Ezra Edelman`\, \`historical`\, \`105\`]) returns value [OJMadeinAmerica,InsideJob]', () => {
        expect(documentariesCollection.searchElement(['duration', 'type'], ['Ezra Edelman', 'historical', '105'])).to.be.eql([OJMadeinAmerica,InsideJob]);
    });

    it('documentariesCollection.searchElement([\`title\`, \`date\`], [\`Home\`, \`90\`, \`2009\`]) returns value [Home]', () => {
      expect(documentariesCollection.searchElement(['title', 'date'], ['Home', '90', '2009'])).to.be.eql([Home]);
    });
  });

  describe('Llamadas a un objeto de la clase Films', () => {
    it('Exist an object from Films class', () => {
        expect(filmsCollection).not.to.be.equal(null);
    });

    it('filmsCollection.searchElement([\`date\`, \`title\`, \`duration\`], [\`Mulan\`, \`169\`]) returns value [Mulan, It]', () => {
        expect(filmsCollection.searchElement(['date', 'title', 'duration'], ['Mulan', '169'])).to.be.eql([Mulan, It]);
    });

    it('filmsCollection.searchElement([\`date\`, \`genre\`, \`duration\`], [\`2020\`, \`115\`, \`romantic\`]) returns value [Mulan, PearlHarbor]', () => {
      expect(filmsCollection.searchElement(['date', 'genre', 'duration'], ['2020', '115', 'romantic'])).to.be.eql([Mulan, PearlHarbor]);
    });
  });

  describe('Llamadas a un objeto de la clase Series', () => {
    it('Exist an object from Series class', () => {
        expect(seriesCollection).not.to.be.equal(null);
    });

    it('seriesCollection.searchElement([\`date\`, \`title\`], [\`Money Heist\`, \`2020\`, \`2008\`, \`You\`]) returns value [BreakingBad, You]', () => {
        expect(seriesCollection.searchElement(['date', 'title'], ['Money Heist', '2020', '2008', 'You'])).to.be.eql([BreakingBad, You]);
    });

    it('seriesCollection.searchElement([\`numberOfSeasons\`, \`genre\`], [\`Money Heist\`, \`crime\`, \`5\`]) returns value [BreakingBad, Lucifer]', () => {
      expect(seriesCollection.searchElement(['numberOfSeasons', 'genre'], ['Money Heist', 'crime', '5'])).to.be.eql([BreakingBad, Lucifer]);
    });
  });
})
