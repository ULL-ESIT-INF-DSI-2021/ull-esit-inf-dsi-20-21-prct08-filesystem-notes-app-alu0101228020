import {BasicStreamableCollection} from './basicStreamableCollection';

export type SerieInformation = {
  /**
   * Series features
   */
    title: string,
    numberOfSeasons: number,
    numberOfchapters: number,
    director: string,
    genre: string[],
    date: string
};

export class Series extends BasicStreamableCollection<SerieInformation>{
  /**
   * Constructor of the class that contains the characteristics of Series
   * @param collection Series collection
   */
    constructor(public collection: SerieInformation[]){
        super(collection)
    }

    /**
     * Public method that makes a search by criteria or filters and words
     * @param criterion Filtered to search
     * @param val Values ​​to look for
     * @returns The elements found
     */
    searchElement(criterion: string[], val: string[]): SerieInformation[] {
            const numbers: number[] = [];
            for (let i: number = 0; i < val.length; i++) {
              for (let j: number = 0; j < this.collection.length; j++) {
                for (let t: number = 0; t < criterion.length; t++) {
                  if (criterion[t] == 'title') {
                    if (this.collection[j].title == val[i]) {
                        numbers.push(j);
                      }
                  }
                  if (criterion[t] == 'date') {
                    if (this.collection[j].date == val[i]) {
                      numbers.push(j);
                    }
                  }
                  if (criterion[t] == 'genre') {
                    for (let z: number = 0; z < this.collection[j].genre.length; z++) {
                      if (this.collection[j].genre[z] == val[i]) {
                        numbers.push(j);
                      }
                    }
                  }
                  if (criterion[t] == 'numberOfSeasons') {
                      if (String(this.collection[j].numberOfSeasons) == val[i]) {
                        numbers.push(j);
                      }
                    }
                }
                }
              }
            for (let i = numbers.length -1; i >=0; i--) {
              if (numbers.indexOf(numbers[i]) !== i) numbers.splice(i, 1);
            }
        
            const result: SerieInformation[] = [];
            while (numbers.length > 0) {
              result.push(this.collection[numbers[0]]);
              numbers.shift();
            }
            return result;
          }
}
