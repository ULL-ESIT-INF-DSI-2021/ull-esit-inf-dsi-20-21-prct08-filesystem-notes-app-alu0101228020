import * as fs from 'fs';
import * as chalk from 'chalk';

/**
 * Enum data type that has the different colors of the notes
 */
export enum colours { red = 'red', green = 'green', blue = 'blue', yellow = 'yellow' }

export class Notes {
  /**
   * Class that has the singleton pattern implemented and has a static object
   */
  private static notes: Notes;

  private constructor() {}

  /**
   * Static public method that allows to create the only instance of the Notes Instance class through its constructor
   * @returns The corresponding object of the class
   */
  public static getNotes(): Notes {
    if (!fs.existsSync(`./database`)) fs.mkdirSync(`./database`, {recursive: true});

    if (!Notes.notes) Notes.notes = new Notes();

    return Notes.notes;
  }

  /**
   * Public method that allows adding a note with a JSON structure of a specific user
   * @param name Username
   * @param title Note title
   * @param body Note body
   * @param color Note color
   * @returns An informative chain
   */
  addNote(name: string, title: string, body: string, colour: colours): string {
    // Structure of the JSON of each user
    const structure = `{ "title": "${title}", "body": "${body}" , "colour": "${colour}" }`;

    // Create the filename with the title along
    const titleTogether = title.split(' ').join('');

    // If the user exists
    if (fs.existsSync(`./database/${name}`) == true) {
      // If the note with the title does not exist
      if (fs.existsSync(`./database/${name}/${titleTogether}.json`) == false) {
        // The file is added and the filled structure is passed to it
        fs.writeFileSync(`./database/${name}/${titleTogether}.json`, structure);
        console.log(chalk.green(`New note added! with title: ${title}`));
        return `New note added! with title: ${title}`;
        // If the note with that title already made, shows the error message
      } else {
        console.log(chalk.red('Error: Note title taken!'));
        return 'Error: Note title taken!';
      }
      // If the user does not exist, the folder is created and populated
    } else {
      fs.mkdirSync(`./database/${name}`, {recursive: true});
      fs.writeFileSync(`./database/${name}/${titleTogether}.json`, structure);
      console.log(chalk.green(`New note added! with title: ${title}`));
      return `New note added! with title: ${title}`;
    }
  }

  /**
   * Public method that allows modifying a note with a JSON structure of a specific user
   * @param name Username
   * @param title Note title
   * @param body Note body
   * @param color Note color
   * @returns An informative chain
   */
  modifyNote(name: string, title: string, body: string, colour: colours): string {
    // Structure of the JSON of each user
    const structure = `{ "title": "${title}", "body": "${body}" , "colour": "${colour}" }`;

    // Create the filename with the title along
    const titleTogether = title.split(' ').join('');

    // If the user exists
    if (fs.existsSync(`./database/${name}`) == true) {
      // If the note with the title exists
      if (fs.existsSync(`./database/${name}/${titleTogether}.json`) == true) {
        // The note is overwritten
        fs.writeFileSync(`./database/${name}/${titleTogether}.json`, structure);
        console.log(chalk.green(`Modified note! with title: ${title}`));
        return `Modified note! with title: ${title}`;
        // If the note with that title does not exist, shows the error message
      } else {
        console.log(chalk.red('Error: Title does not exist!'));
        return 'Error: Title does not exist!';
      }
      // If the user does not exist, shows the error message
    } else {
      console.log(chalk.red('Error: User not found!'));
      return 'Error: User not found!';
    }
  }

  /**
   * Public method that allows to delete a note from a specific user through the title
   * @param name Username
   * @param title Note title
   * @returns An informative chain
   */
  removeNote(name: string, title: string): string {
    // Create the filename with the title along
    const titleTogether = title.split(' ').join('');

    // If the user exists
    if (fs.existsSync(`./database/${name}`) == true) {
      // If the note with the title exists
      if (fs.existsSync(`./database/${name}/${titleTogether}.json`) == true) {
        // The file is deleted
        fs.rmSync(`./database/${name}/${titleTogether}.json`);
        console.log(chalk.green('Note removed!'));
        return 'Note removed!';
        // If the note with that title does not exist, shows the error message
      } else {
        console.log(chalk.red('Error: Title does not exist!'));
        return 'Error: Title does not exist!';
      }
      // If the user does not exist, shows the error message
    } else {
      console.log(chalk.red('Error: User not found!'));
      return 'Error: User not found!';
    }
  }

  /**
   * Public method that allows to list all the notes of a specific user with the corresponding titles
   * @param name Username
   * @returns An informative chain
   */
  listNotes(name: string): string {
    // If the user exists
    if (fs.existsSync(`./database/${name}`) == true) {
      console.log(chalk.white('Your notes:' + '\n'));
      let aux: string = '';
      // Scrolls through user notes
      fs.readdirSync(`./database/${name}/`).forEach((note) => {
        // The file is read and that structure is stored
        const data = fs.readFileSync(`./database/${name}/${note}`);
        const dataJSON = JSON.parse(data.toString());
        console.log(chalk.keyword(dataJSON.colour)(`- ${dataJSON.title}` + '\n'));
        aux = aux + `- ${dataJSON.title}` + '\n';
      });
      return aux;
      // If the user does not exist, shows the error message
    } else {
      console.log(chalk.red(`Error: User not found!`));
      return 'Error: User not found!';
    }
  }

  /**
   * Public method that allows printing a specific note of a specific user
   * @param name Username
   * @param title Note title
   * @returns An informative chain
   */
  readNote(name: string, title: string): string {
    // Create the filename with the title along
    const titleTogether = title.split(' ').join('');
    // If the user exists
    if (fs.existsSync(`./database/${name}`) == true) {
      if (fs.existsSync(`./database/${name}/${titleTogether}.json`) == true) {
        // The file is read and that structure is stored
        const data = fs.readFileSync(`./database/${name}/${titleTogether}.json`);
        const dataJSON = JSON.parse(data.toString());
        console.log(chalk.keyword(dataJSON.colour)(`- Title: ${dataJSON.title} ` + `- Body: ${dataJSON.body}`));
        return `- Title: ${dataJSON.title} ` + `- Body: ${dataJSON.body}`;
        // If the note with that title does not exist, shows the error message
      } else {
        console.log(chalk.red('Error: Title does not exist!'));
        return 'Error: Title does not exist!';
      }
      // If the user does not exist, shows the error message
    } else {
      console.log(chalk.red('Error: User not found!'));
      return 'Error: User not found!';
    }
  }
}
