import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Videojoc } from './models/videojoc';
import { Colleccio } from './models/col-leccio';
import { saludar, esMajorEdat, sumarArray } from './funcions';
import { Alumne } from './alumne';
import { Perfil } from './components/perfil/perfil';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Perfil],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mi-app');

  // Part B: dades mock
  videojocs: Videojoc[] = [
    { id: 1, nom: 'The Legend of Zelda: Tears of the Kingdom', plataforma: 'Switch', preu: 69.99, anyLlancament: 2023, disponible: true, puntuacio: 9.6 },
    { id: 2, nom: 'Elden Ring', plataforma: 'PC', preu: 59.99, anyLlancament: 2022, disponible: true, puntuacio: 9.5 },
    { id: 3, nom: 'God of War Ragnarök', plataforma: 'PS5', preu: 49.99, anyLlancament: 2022, disponible: false, puntuacio: 9.4 },
    { id: 4, nom: 'Minecraft', plataforma: 'PC', preu: 29.99, anyLlancament: 2011, disponible: true },
    { id: 5, nom: 'Hollow Knight', plataforma: 'Switch', preu: 14.99, anyLlancament: 2017, disponible: false, puntuacio: 9.0 },
  ];

  constructor() {
    // Part B
    console.log('Jocs disponibles:', this.getDisponibles());
    console.log('Joc amb id 2:', this.findById(2));
    console.log('Joc amb id 99:', this.findById(99));
    this.videojocs.forEach((joc) => console.log(this.formatarElement(joc)));

    // Part C
    const colleccio = new Colleccio('Jan', [this.videojocs[0], this.videojocs[1]]);
    colleccio.afegir(this.videojocs[3]);
    console.log('Jocs de PC a la col·lecció:', colleccio.filtrarPerPlataforma('PC'));
    console.log('Eliminat id 1?', colleccio.eliminar(1));
    console.log(`Valor total de la col·lecció de ${colleccio.propietari}: ${colleccio.valorTotal.toFixed(2)} €`);

    // Funcions auxiliars
    console.log(saludar('Jan'));
    console.log('És major d\'edat (17)?', esMajorEdat(17));
    console.log('És major d\'edat (20)?', esMajorEdat(20));
    console.log('Suma [1, 2, 3, 4, 5]:', sumarArray([1, 2, 3, 4, 5]));

    // Classe Alumne
    const alumne1 = new Alumne('Anna', 19, 'DAW', [7, 8, 6.5, 9]);
    const alumne2 = new Alumne('Pau', 18, 'DAM', [3, 4.5, 5, 2]);
    console.log(alumne1.presentar(), '- Ha aprovat?', alumne1.haAprobat);
    console.log(alumne2.presentar(), '- Ha aprovat?', alumne2.haAprobat);
  }

  getDisponibles(): Videojoc[] {
    return this.videojocs.filter((joc) => joc.disponible);
  }

  findById(id: number): Videojoc | undefined {
    return this.videojocs.find((joc) => joc.id === id);
  }

  formatarElement(joc: Videojoc): string {
    const puntuacio = joc.puntuacio !== undefined ? `${joc.puntuacio}/10` : 'sense puntuació';
    const estat = joc.disponible ? 'disponible' : 'no disponible';
    return `${joc.nom} (${joc.plataforma}, ${joc.anyLlancament}) - ${joc.preu} € - ${puntuacio} - ${estat}`;
  }
}
