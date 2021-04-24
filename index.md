# Informe Práctica 8

## Aplicación de procesamiento de notas de texto

### 1. Introducción

En esta práctica, se tendrá que implementar una aplicación de **procesamiento de notas de texto**. En concreto, la misma permitirá añadir, modificar, eliminar, listar y leer notas de un usuario concreto. Las notas se almacenarán como ficheros JSON en el sistema de ficheros de la máquina que ejecute la aplicación. Además, solo se podrá interactuar con la aplicación desde la línea de comandos.

### 2. Objetivos

Esta práctica tiene como objetivos:

- Aprender a utilizar los paquetes yargs y chalk.
- Aprender a trabajar con el API síncrona proporcionada por Node.js para trabajar con el sistema de ficheros

### 3. Tareas previas

Antes de comenzar a realizar dicha práctica, debemos realizar las siguientes tareas:

- Aceptar la [asignación de GitHub Classroom](https://classroom.github.com/assignment-invitations/906f18610f5e4a289890edf2c0ceb0f4/status) asociada a esta práctica.
- Conocer y estudiar los paquetes [yargs](https://www.npmjs.com/package/yargs) y [chalk](https://www.npmjs.com/package/chalk), aunque hay ejemplos de uso en el guión práctico.
- Familiarizarse con el [API síncrona proporcionada por Node.js para trabajar con el sistema de ficheros](https://nodejs.org/dist/latest-v15.x/docs/api/fs.html#fs_synchronous_api).

### 4. Ejercicio

Para realizar los ejercicios, utilizaremos la estructura básica del proyecto dada en clase, además se deberá incluir todos los ejercicios en el directorio `./src` de dicho proyecto. 

Deberemos seguir la metodología **TDD** o **BDD** a través de las herramientas **Mocha y Chai** que implica confirmar el correcto funcionamiento del software, así como los casos en los que el software debería mostrar un error cuando la entrada no sea la correcta. También deberemos incluir otras pruebas unitarias que verifiquen que el software es robusto ante entradas no válidas o inesperadas. Utilizaremos también las herramientas Instanbul con Coveralls, GitHub Action y Sonar Cloud para obtener informes sobre el código y el cubrimiento del código fuente llevado a cabo por las pruebas que se hayan diseñado.

Ahora bien, llevaremos a cabo todos y cada uno de los ejercicios propuestos a continuación, con sus correspondientes explicaciones.

### 4.1 Ejercicio - Aplicación de procesamiento de notas de texto

**Descripción de los requisitos de la aplicación de procesamiento de notas de texto**

Los requisitos que debe cumplir la aplicación de procesamiento de notas de texto son los siguientes:

1. La aplicación de notas deberá permitir que múltiples usuarios interactúen con ella, pero no simultáneamente.

2. Una nota estará formada, como mínimo, por un título, un cuerpo y un color (rojo, verde, azul o amarillo).

3. Cada usuario tendrá su propia lista de notas, con la que podrá llevar a cabo las siguientes operaciones:

- Añadir una nota a la lista. Antes de añadir una nota a la lista se debe comprobar si ya existe una nota con el mismo título. En caso de que así fuera, deberá mostrarse un mensaje de error por la consola. En caso contrario, se añadirá la nueva nota a la lista y se mostrará un mensaje informativo por la consola.

- Modificar una nota de la lista. Antes de modificar una nota, previamente se debe comprobar que exista una nota con el título de la nota a modificar en la lista. Si existe, se procede a su modificación y se emite un mensaje informativo por la consola. En caso contrario, debe mostrarse un mensaje de error por la consola.

- Eliminar una nota de la lista. Antes de eliminar una nota, previamente se debe comprobar que exista una nota con el título de la nota a eliminar en la lista. Si existe, se procede a su eliminación y se emite un mensaje informativo por la consola. En caso contrario, debe mostrarse un mensaje de error por la consola.

- Listar los títulos de las notas de la lista. Los títulos de las notas deben mostrarse por la consola con el color correspondiente de cada una de ellas. Use el paquete `chalk` para ello.

- Leer una nota concreta de la lista. Antes de mostrar el título y el cuerpo de la nota que se quiere leer, se debe comprobar que en la lista existe una nota cuyo título sea el de la nota a leer. Si existe, se mostrará el título y cuerpo de la nota por la consola con el color correspondiente de la nota. Para ello, use el paquete `chalk`. En caso contrario, se mostrará un mensaje de error por la consola.

- Todos los mensajes informativos se mostrarán con color verde, mientras que los mensajes de error se mostrarán con color rojo. Use el paquete `chalk` para ello.

- Hacer persistente la lista de notas de cada usuario. Aquí es donde entra en juego el uso de la API síncrona de Node.js para trabajar con el sistema de ficheros:

- Guardar cada nota de la lista a un fichero con formato JSON. Los ficheros JSON correspondientes a las notas de un usuario concreto deberán almacenarse en un directorio con el nombre de dicho usuario.

- Cargar una nota desde los diferentes ficheros con formato JSON almacenados en el directorio del usuario correspondiente.

1. Un usuario solo puede interactuar con la aplicación de procesamiento de notas de texto a través de la línea de comandos. Los diferentes comandos, opciones de los mismos, así como manejadores asociados a cada uno de ellos deben gestionarse mediante el uso del paquete `yargs`.

**Clase Notes**

```ts
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
    const structure = `{ "title": "${title}", "body": "${body}" , "color": "${colour}" }`;

    // Create the filename with the title along
    const titleTogether = title.split(' ').join('');

    // If the user exists
    if (fs.existsSync(`./database/${name}`) == true) {
      // If the note with the title does not exist
      if (fs.existsSync(`./database/${name}/${titleTogether}.json`) == false) {
        // The file is added and the filled structure is passed to it
        fs.writeFileSync(`./database/${name}/${titleTogether}.json`, structure);
        console.log(chalk.green(`New note added! with title: ${title}\nNote: If you do not choose between the colors: blue, red, green and yellow. Yellow is set by default.`));
        return `New note added! with title: ${title}\nNote: If you do not choose between the colors: blue, red, green and yellow. Yellow is set by default.`;
        // If the note with that title already made, shows the error message
      } else {
        console.log(chalk.red('Error: Note title taken!'));
        return 'Error: Note title taken!';
      }
      // If the user does not exist, the folder is created and populated
    } else {
      fs.mkdirSync(`./database/${name}`, {recursive: true});
      fs.writeFileSync(`./database/${name}/${titleTogether}.json`, structure);
      console.log(chalk.green(`New note added! with title: ${title}\nNote: If you do not choose between the colors: blue, red, green and yellow. Yellow is set by default.`));
      return `New note added! with title: ${title}\nNote: If you do not choose between the colors: blue, red, green and yellow. Yellow is set by default.`;
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
    const structure = `{ "title": "${title}", "body": "${body}" , "color": "${colour}" }`;

    // Create the filename with the title along
    const titleTogether = title.split(' ').join('');

    // If the user exists
    if (fs.existsSync(`./database/${name}`) == true) {
      // If the note with the title exists
      if (fs.existsSync(`./database/${name}/${titleTogether}.json`) == true) {
        // The note is overwritten
        fs.writeFileSync(`./database/${name}/${titleTogether}.json`, structure);
        console.log(chalk.green(`Modified note! with title: ${title}\nNote: If you do not choose between the colors: blue, red, green and yellow. Yellow is set by default.`));
        return `Modified note! with title: ${title}\nNote: If you do not choose between the colors: blue, red, green and yellow. Yellow is set by default.`;
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
        console.log(chalk.keyword(dataJSON.color)(`- ${dataJSON.title}` + '\n'));
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
        console.log(chalk.keyword(dataJSON.color)(`- Title: ${dataJSON.title} ` + `- Body: ${dataJSON.body}`));
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
```

**Explicación:**

De manera inicial, creamos la **clase Notes** que sigue un patrón Singleton dado que este se suele emplear en sistemas de ficheros y bases de datos. En nuestro caso, como realizamos un sistema de ficheros, queremos trabajar con una única instancia y es por ello, que empleamos dicho patrón.

El primer `import` especificado en la clase hace referencia a la API que se basará en el API síncrona que nos proporciona Node.js para trabajar con el sistema de ficheros desde TypeScript. El segundo `import` hace referencia al paquete `chalk` que utilizaremos para colocar distintos colores de los mensajes por consola.

Seguidamente, tenemos el elemento privado estático como propiedad de la clase que forma parte del patrón de singleton, donde más tarde, en la función pública estática `getNotes()`, inicializamos esa única instancia. En dicha función especificamos que si el directorio `/database` que tratará de nuestra base de datos con la estructura JSON, no está creado, deberá crearlo. Por lo tanto, para saber si existe esa ruta, utilizamos la función de sistema de ficheros `existsSync()` y con la función `mkdirSync()` creamos el directorio correspondiente en caso de que no existiese. Luego, creamos la correspondiente instancia en caso de que no estuviese creada y devolvemos la variable privada estática con la instancia de la clase creada. Además, como creamos la instancia en esta función, el constructor quedará vacío.

A continuación, tenemos las clases de los métodos correspondientes que ejecutan las acciones necesarias de una nota por una acción de un usuario.

addNote(): Este método público permite añadir una nota, para ellos debemos de pasarle a la función todos los parámetros necesarios que contiene una nota. Que son: el nombre del usuario en cadena, el título de la nota en cadena, el cuerpo de la nota en cadena y el color de dicha nota que tiene como tipo un `enum` con los colores correspondientes. Luego creamos la estructura, de cómo debería ser el JSON y también, como el nombre de los ficheros de cada nota de un usuario, será expresado por el título de la nota, en una nueva variable, hacemos uso del `split()` y `join()` para juntar el título ya que los nombres de los ficheros nunca están separados por espacios. Luego tenemos varios casos a tener en cuenta, donde siempre se devolverá un mensaje de información. El primero es en el que el usuario ya existe y para ello utilizamos la función hablada anteriormente `existsSync()` con la ruta `./database/${name}`, donde name será el parámetro pasado por la función. Si tenemos la carpeta de ese usuario, podemos encontrarnos con que el título pasado por la función no exista y por tanto, con el `writeFileSync()`, creamos un fichero `.json` en la ruta especificada y escribimos en ese fichero la estructura especificada más arriba, más tarde mostramos un mensaje de confirmación de que se ha realizado dicha acción correctamente. En caso de que el título sí exista, debemos mostrar un mensaje de error de que el título ya tenemos esa nota. Y por último, el caso en el que el usuario no está en nuestra base de datos, ya que no tenemos una carpeta con su nombre, para ello, simplemente creamos dicha carpeta y escribimos en un fichero `.json` la estructura especificada y mostramos el mensaje afirmativo de que se ha añadido con éxito. 

Cabe destacar que los mensajes afirmativos se mostrarán en verde gracias al `chalk` donde a través de cada `console.log()`, especificamos con el chack el color de la oración a mostrar como por ejemplo, en este caso un mensaje de color verde `chalk.green`. Para los mensajes de error, mostraremos dicho mensaje informativo de color rojo.

modifyNote(): Este método público permite modificar una nota ya registrada. Esta función sería idéntica a la anterior, salvo que si el usuario que ya existe, tiene una nota con ese mismo título, modificamos dicha nota y si nuestro usuario no está en nuestra base de datos, simplemente mostramos un mensaje de error de usuario no encontrado.

removeNote(): Este método público permite borrar una nota de un usuario en específico a través del título. Es similar a la función `modifyNote()`, salvo que solo hace falta como parámetro el nombre del usuario y el título de la nota, además si el título existe, deberemos borrar dicho fichero `.json` con la función `rmSync()`.

listNotes(): Este método público permite listar todos los títulos de las distintas notas de un usuario. Para ello, simplemente le pasamos el nombre del usuario a la función y a través de la función `readdirSync()`  con un `forEach()` leemos cada uno de los ficheros, que corresponde a cada nota, de un usuario. Almacenamos dicha información de la nota en una variable `data` y con la función `JSON.parse()` transformamos el valor producido por el análisis en JSON y la almacenamos en una nueva variable `dataJSON`. Al final, imprimimos el título de cada uno de los ficheros a través de la variable anterior y la propiedad del título como dataJSON.title() destacando que debemos imprimir cada título del color especificado por la nota del usuario, para ello, dentro del `console.log()` colocamos `chalk.keyword()` y esto permitirá imprimir la frase, dependiendo del color que tenga esa nota en ese momento que esta almacenada en la variable `dataJSON`.

readNote(): Este método público permite leer una nota de un usuario donde se especifica dicha nota a través del título. Es bastante similar al método anterior, `listNotes()`, salvo que por parámetro necesitamos pasarle también el título y una vez sabemos esto, podemos comprobar si dicho título existe para ese usuario, en caso afirmativo, realizamos lo mismo que la anterior función, salvo que no hará falta recorrer todas las notas ya que en este caso, solo es una nota en específico por lo que leemos dicha nota, guardamos la estructura, la pasamos a JSON e imprimimos el título y el cuerpo de dicha nota del color que tenía considerado esa misma nota, para ello utilizamos `chalk.keyword()` dentro del `console.log()` como explicamos anteriormente.

**Fichero app**

```ts
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
```

**Explicación:**

Este fichero será el encargado de almacenar y gestionar diferentes comandos, cada uno de ellos, con sus opciones y llamadas a funciones correspondientes. Para ello, haremos uso del `yargs` que nos permitirá parsear diferentes argumentos pasados a un programa desde la línea de comandos. 

En primer lugar, especificamos en los `import` correspondientes el paquete `yargs`. Luego creamos la instancia del objeto `Notes`, para ello, creamos una variable de tipo `Notes` y llamamos a la función `getNotes()` encargada de asignar dicha instancia.

Como el proceso es el mismo en todos los casos en los que queramos añadir los distintos comandos: add (añadir), modify (modificar), remove (borrar), list (listar) y read (leer); simplemente explicaré de manera genérica la estructura para parsear los diferentes argumentos pasados a un programa desde la línea de comando.

En primer lugar deberemos hacer uso del `yargs.command()` para especificar el comando. Como primer dato tenemos el `command` que hace referencia al comando que queremos escribir en la terminal y este ejecutará dicha acción correspondiente. Seguidamente tenemos un `describe` que permite describir de lo que trata el comando y por último, tenemos el `builder` que son los argumentos pasados por línea de comandos. Cada argumento empezará por el nombre del argumento con dos puntos y entre llaves irá un `describe` que permite describir dicho argumento, un `demandOption` que permite mostrar en el menú de opciones de comandos, dicho comando y por último, un `type` haciendo referencia al tipo de entrada. Entonces deberemos de poner tantos argumentos como parámetros tenga las funciones explicadas anteriormente. Como por ejemplo: en el comando `add`, se deberá especificar los argumentos: nombre del usuario en cadena, el título de la nota en cadena, el cuerpo de la nota en cadena y el color de dicha nota en cadena. Que corresponden a los argumentos que necesitaremos pasar para llamar a la función `add`. Una vez tenemos los argumentos, es decir, el `builder`, llamamos a la función `handler()` encargada de parsear los argumentos pasados y dentro establecemos un `if()` donde decimos que si todos los argumentos pasados son tipo `string`, entonces ejecutamos la función que se encarga de realizar dicha acción y como parámetros tendrá los argumentos correspondientes. En todos los casos funcionaría así, salvo en el caso del comando `add` y `modify` ya que ahí deberemos buscar si el color especificado por el usuario se encuentra entre los colores disponibles de nuestro `enum`. Para ello recorremos dicho `enum` con `Object.values()` y vamos igualando la string del color con el color especificado por el usuario, en caso de que se encuentre entre esos colores, cogemos el valor de ese `enum` correspondiente. En caso contrario, por defecto, se pondrá el color azul. 

Finalmente, acabamos el fichero con la función `yargs.parse()` especificada que hace una llamada al paquete `yargs` permitiendo procesar argumentos pasados ​​de la línea de comandos a la aplicación.

**TDD**

Para seguir la metodología **TDD** a través de las herramientas **Mocha y Chai** deberemos hacer las expectativas correspondientes y luego el código planteado anteriormente. El fichero `spec` con las pruebas correspondientes es el siguiente:

```ts
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
```

### 5. Conclusiones

En conclusión, en esta práctica podemos destacar el uso del paquete **yargs** que nos permite parsear diferentes argumentos pasados a un programa desde la línea de comandos y de esta forma, interactuar con el usuario, proporcionándole todas aquellas acciones necesarias que requiera una aplicación de procesamiento de notas de texto. El proceso de aprendizaje ha sido bastante rápido ya que se entendió fácilmente la estructura de un comando a través del **yargs**.

Por otro lado, el uso del **API síncrona proporcionada por Node.js para trabajar con el sistema de ficheros** fue bastante intuitiva sus funciones sobre ficheros y podemos destacar, la gran diversidad de funciones que proporciona.

Finalmente, me gustaría destacar el uso del paquete **chalk** que, fue también intuitivo y fácil de utilizar para realizar utilidades básicas del mismo y de esta forma representar por colores aquellos mensajes al usuario por consola mejorando la interacción y percepción de la información.

### 6. Bibliografía

[Guión Práctica 8](https://ull-esit-inf-dsi-2021.github.io/prct08-filesystem-notes-app/)

[Asignación de GitHub Classroom](https://classroom.github.com/assignment-invitations/906f18610f5e4a289890edf2c0ceb0f4/status)

[Documentación sobre Yargs](https://www.npmjs.com/package/yargs) 

[Documentación sobre Chalk](https://www.npmjs.com/package/chalk)

[Documentación sobre API síncrona proporcionada por Node.js para trabajar con el sistema de ficheros](https://nodejs.org/dist/latest-v15.x/docs/api/fs.html#fs_synchronous_api)
