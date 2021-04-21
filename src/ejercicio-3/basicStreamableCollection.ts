import {Streamable} from './streamable';

export abstract class BasicStreamableCollection<T> implements Streamable<T> {
  /**
   * Constructor of the class that contains the characteristics of a BasicStreamableCollection
   * @param collection The t-type collection
   */
    constructor(public collection:T[]){}

    /**
     * Public method that adds an element
     * @param element The element to add in the collection
     * @returns The collection
     */
    addElement(element: T): T[] {
      this.collection.push(element);
      return this.collection;
    }

    /**
     * Public method that deletes an element
     * @param element The element to delete in the collection
     * @returns The collection
     */
    deleteElement(element: T): T[] {
        let i: number = this.collection.indexOf(element);
        if (i != -1) {this.collection.splice(i, 1);}

        return this.collection;
    }

    /**
     * Public method that makes a search by criteria or filters and words
     * @param criterion Filtered to search
     * @param val Values ​​to look for
     */
    abstract searchElement(criterion: string[], val: string[]): T[];
}