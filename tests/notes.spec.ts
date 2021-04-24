import 'mocha';
import {expect} from 'chai';
import * as fs from 'fs';
import {Notes, colours} from '../src/notes/notes';

describe('Ejercicio - Aplicación de procesamiento de notas de texto', () => {
  const notes : Notes = Notes.getNotes();

  describe('Notes class test', () => {
    it('It is a notes object', () => {
      expect(Notes).not.to.be.equal(null);
    });

    it('notes.getNotes() returns notes', () => {
      expect(Notes.getNotes()).to.be.equal(notes);
    });

    describe('add function test', () => {
      it('notes.addNote() returns New note added! with title: Primera nota', () => {
        expect(notes.addNote('Test', 'Primera nota', 'Esta es una prueba para comprobar su funcionamiento', colours.yellow)).to.be.equal('New note added! with title: Primera nota\nNote: If you do not choose between the colors: blue, red, green and yellow. Yellow is set by default.');
      });

      it('notes.addNote() returns New note added! with title: Segunda nota', () => {
        expect(notes.addNote('Test', 'Segunda nota', 'Esta es una prueba para comprobar su funcionamiento', colours.yellow)).to.be.equal('New note added! with title: Segunda nota\nNote: If you do not choose between the colors: blue, red, green and yellow. Yellow is set by default.');
      });

      it('notes.addNote() returns New note added! with title: Tercera nota', () => {
        expect(notes.addNote('Test', 'Tercera nota', 'Esta es una prueba para comprobar su funcionamiento', colours.yellow)).to.be.equal('New note added! with title: Tercera nota\nNote: If you do not choose between the colors: blue, red, green and yellow. Yellow is set by default.');
      });

      it('notes.addNote() returns Error: Note title taken!', () => {
        expect(notes.addNote('Test', 'Primera nota', 'Esta es una prueba para comprobar su funcionamiento', colours.yellow)).to.be.equal('Error: Note title taken!');
      });
    });

    describe('modidy function test', () => {
      it('notes.modifyNote() returns Modified note! with title: Primera nota', () => {
        expect(notes.modifyNote('Test', 'Primera nota', 'Esta es una prueba', colours.yellow)).to.be.equal('Modified note! with title: Primera nota\nNote: If you do not choose between the colors: blue, red, green and yellow. Yellow is set by default.');
      });

      it('notes.addNote() returns Error: Title does not exist!', () => {
        expect(notes.modifyNote('Test', 'Primera', 'Esta es una prueba para comprobar su funcionamiento', colours.yellow)).to.be.equal('Error: Title does not exist!');
      });

      it('notes.addNote() returns Error: User not found!', () => {
        expect(notes.modifyNote('Test2', 'Segunda nota', 'Esta es una prueba para comprobar su funcionamiento', colours.yellow)).to.be.equal('Error: User not found!');
      });
    });

    describe('remove function test', () => {
      it('notes.removeNote() returns Note removed!', () => {
        expect(notes.removeNote('Test', 'Primera nota')).to.be.equal('Note removed!');
      });

      it('notes.removeNote() returns Error: Title does not exist!', () => {
        expect(notes.removeNote('Test', 'PrimeraTitle')).to.be.equal('Error: Title does not exist!');
      });

      it('notes.removeNote() returns Error: User not found!', () => {
        expect(notes.removeNote('Test2', 'Segunda nota')).to.be.equal('Error: User not found!');
      });
    });

    describe('list function test', () => {
      it('notes.listNotes() returns - Segunda nota\n- Tercera nota\n', () => {
        expect(notes.listNotes('Test')).to.be.equal('- Segunda nota\n- Tercera nota\n');
      });

      it('notes.listNotes() returns Error: User not found!', () => {
        expect(notes.listNotes('Test2')).to.be.equal('Error: User not found!');
      });
    });

    describe('read function test', () => {
      it('notes.readNote() returns - Title: Segunda nota - Body: Esta es una prueba para comprobar su funcionamiento', () => {
        expect(notes.readNote('Test', 'Segunda nota')).to.be.equal('- Title: Segunda nota - Body: Esta es una prueba para comprobar su funcionamiento');
      });

      it('notes.readNote() returns Error: Title does not exist!', () => {
        expect(notes.readNote('Test', 'Nota')).to.be.equal('Error: Title does not exist!');
      });

      it('notes.readNote() returns Error: User not found!', () => {
        expect(notes.readNote('Test2', 'Nota')).to.be.equal('Error: User not found!');
      });
    });
  });
});


fs.rmdirSync('./database', {recursive: true});
