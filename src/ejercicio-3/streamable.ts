export interface Streamable<T> {
  collection: T[];
  /**
  * Public method that makes a search by criteria or filters and words
  * @param criterion Filtered to search
  * @param val Values ​​to look for
  */
  searchElement(criterion: string[], val: string[]): T[];
  /**
  * Public method that adds an element
  * @param element The element to add in the collection
  */
  addElement(element: T): T[];
  /**
  * Public method that deletes an element
  * @param element The element to delete in the collection
  */
  deleteElement(element: T): T[];
}
