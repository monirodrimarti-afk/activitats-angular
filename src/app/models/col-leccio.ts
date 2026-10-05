import { Videojoc } from './videojoc';

export class Colleccio {
  propietari: string;
  jocs: Videojoc[];

  constructor(propietari: string, jocs: Videojoc[] = []) {
    this.propietari = propietari;
    this.jocs = jocs;
  }

  afegir(joc: Videojoc): void {
    this.jocs.push(joc);
  }

  eliminar(id: number): boolean {
    const mida = this.jocs.length;
    this.jocs = this.jocs.filter((joc) => joc.id !== id);
    return this.jocs.length < mida;
  }

  filtrarPerPlataforma(plataforma: string): Videojoc[] {
    return this.jocs.filter((joc) => joc.plataforma === plataforma);
  }

  get valorTotal(): number {
    return this.jocs.reduce((total, joc) => total + joc.preu, 0);
  }
}
