import * as yargs from 'yargs';
import {Notes, colours} from './notes';

const notes : Notes = Notes.getNotes();

/**
 * Execution of the add function through this command
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'User\'s name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note Body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note Color. If the color is none of these: red, green, blue and yellow; Yelow is set by default',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    // If the user does not choose between the colors: red, green, blue and yellow. Yellow is set by default
    let colourNote: colours = colours.yellow;
    if (typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string' && typeof argv.user === 'string') {
      Object.values(colours).forEach((value) => {
        if (argv.color == value) {
          colourNote = value;
        }
      });
      notes.addNote(argv.user, argv.title, argv.body, colourNote);
    }
  },
});

/**
 * Execution of the modify function through this command
 */
yargs.command({
  command: 'modify',
  describe: 'Modify a note',
  builder: {
    user: {
      describe: 'User\'s name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note Body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note Color. If the color is none of these: red, green, blue and yellow; Yellow is set by default',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    // If the user does not choose between the colors: red, green, blue and yellow. Yellow is set by default
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      let colour: colours = colours.yellow;
      Object.values(colours).forEach((value) => {
        if (argv.color == value) {
          colour = value;
        }
      });
      notes.modifyNote(argv.user, argv.title, argv.body, colour);
    }
  },
});

/**
 * Execution of the remove function through this command
 */
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    user: {
      describe: 'User\'s name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      notes.removeNote(argv.user, argv.title);
    }
  },
});

/**
 * Execution of the list function through this command
 */
yargs.command({
  command: 'list',
  describe: 'List all the notes',
  builder: {
    user: {
      describe: 'User\'s name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      notes.listNotes(argv.user);
    }
  },
});

/**
 * Execution of the read function through this command
 */
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    user: {
      describe: 'User\'s name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      notes.readNote(argv.user, argv.title);
    }
  },
});

/**
 * Process arguments passed from command line to application
 */
yargs.parse();
