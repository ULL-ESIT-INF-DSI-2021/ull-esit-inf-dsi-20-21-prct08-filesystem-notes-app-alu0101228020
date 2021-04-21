import {BasicStreamableCollection} from './basicStreamableCollection';

export type DocumentaryInformation = {
  /**
   * Documentary features
   */
    title: string,
    director: string,
    duration: number,
    type: string,
    date: string
};

export class Documentaries extends BasicStreamableCollection<DocumentaryInformation>{
  /**
   * Constructor of the class that contains the characteristics of Documentaries
   * @param collection Documentaries collection
   */
    constructor(public collection: DocumentaryInformation[]){
        super(collection)
    }

    /**
     * Public method that makes a search by criteria or filters and words
     * @param criterion Filtered to search
     * @param val Values ​​to look for
     * @returns The elements found
     */
    searchElement(criterion: string[], val: string[]): DocumentaryInformation[] {
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
                  if (criterion[t] == 'type') {
                      if (String(this.collection[j].type) == val[i]) {
                        numbers.push(j);
                      }
                    }
                  if (criterion[t] == 'duration') {
                        if (String(this.collection[j].duration) == val[i]) {
                          numbers.push(j);
                      }
                    }
                }
                }
              }
            for (let i = numbers.length -1; i >=0; i--) {
              if (numbers.indexOf(numbers[i]) !== i) numbers.splice(i, 1);
            }
        
            const result: DocumentaryInformation[] = [];
            while (numbers.length > 0) {
              result.push(this.collection[numbers[0]]);
              numbers.shift();
            }
            return result;
          }
}
