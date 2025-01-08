

interface IProdotto {
  tipo: string; // costume da bagno, pareo, cappello
  id: string; // ID univoco
  taglia: string;
  colore: string;
  stato: "disponibile" | "esaurito";
  assegnaCliente(cliente: ICliente): void;
}

interface ICliente {
  nome: string;
  cognome: string;
  email: string;
  metodoPagamentoPreferito: string;
  ordinaProdotto(prodotto: IProdotto): void;
}

interface IProcessoProduzione {
  nome: string;
  descrizione: string;
  prodottiInProduzione: IProdotto[];
  aggiungiProdotto(prodotto: IProdotto): void;
}



class Prodotto implements IProdotto {
  tipo: string;
  id: string;
  taglia: string;
  colore: string;
  stato: "disponibile" | "esaurito";
  private clienteAssegnato?: ICliente;

  constructor(tipo: string, id: string, taglia: string, colore: string, stato: "disponibile" | "esaurito") {
      this.tipo = tipo;
      this.id = id;
      this.taglia = taglia;
      this.colore = colore;
      this.stato = stato;
  }

  assegnaCliente(cliente: ICliente): void {
      if (this.stato === "disponibile") {
          this.clienteAssegnato = cliente;
          this.stato = "esaurito";
          console.log(`Il prodotto ${this.id} è stato assegnato a ${cliente.nome} ${cliente.cognome}`);
      } else {
          console.log(`Il prodotto ${this.id} non è disponibile.`);
      }
  }
}

class Cliente implements ICliente {
  nome: string;
  cognome: string;
  email: string;
  metodoPagamentoPreferito: string;

  constructor(nome: string, cognome: string, email: string, metodoPagamentoPreferito: string) {
      this.nome = nome;
      this.cognome = cognome;
      this.email = email;
      this.metodoPagamentoPreferito = metodoPagamentoPreferito;
  }

  ordinaProdotto(prodotto: IProdotto): void {
      prodotto.assegnaCliente(this);
  }
}

class ProcessoProduzione implements IProcessoProduzione {
  nome: string;
  descrizione: string;
  prodottiInProduzione: IProdotto[] = [];

  constructor(nome: string, descrizione: string) {
      this.nome = nome;
      this.descrizione = descrizione;
  }

  aggiungiProdotto(prodotto: IProdotto): void {
      this.prodottiInProduzione.push(prodotto);
      console.log(`Prodotto ${prodotto.id} aggiunto al processo di produzione ${this.nome}`);
  }
}




const costumeRelax = new Prodotto("costume da bagno", "001", "M", "blu", "disponibile");
const pareoElegante = new Prodotto("pareo", "002", "unica", "rosso", "disponibile");
const cappelloSolare = new Prodotto("cappello", "003", "unica", "giallo", "disponibile");


const cliente1 = new Cliente("Luca", "Rossi", "luca.rossi@example.com", "carta di credito");
const cliente2 = new Cliente("Maria", "Verdi", "maria.verdi@example.com", "paypal");


const processoSostenibile = new ProcessoProduzione("Riciclo Reti da Pesca", "Trasforma reti da pesca in filati per costumi.");


processoSostenibile.aggiungiProdotto(costumeRelax);
processoSostenibile.aggiungiProdotto(pareoElegante);


const container = document.createElement("div");
document.body.appendChild(container);

container.innerHTML = `
<h1>Sunnee Beachwear</h1>
<p>Prodotti disponibili:</p>
<ul>
  <li>1. ${costumeRelax.tipo} (${costumeRelax.colore}, ${costumeRelax.taglia})</li>
  <li>2. ${pareoElegante.tipo} (${pareoElegante.colore}, ${pareoElegante.taglia})</li>
</ul>
<p>Inserisci il numero del prodotto per ordinarlo:</p>
<input id="productInput" type="number" />
<button id="orderButton">Ordina</button>
<div id="result"></div>
`;

document.getElementById("orderButton")?.addEventListener("click", () => {
  const input = (document.getElementById("productInput") as HTMLInputElement).value;
  const result = document.getElementById("result");

  if (input === "1") {
      cliente1.ordinaProdotto(costumeRelax);
      result!.innerHTML = `<p>Il cliente ${cliente1.nome} ha ordinato ${costumeRelax.tipo}.</p>`;
  } else if (input === "2") {
      cliente2.ordinaProdotto(pareoElegante);
      result!.innerHTML = `<p>Il cliente ${cliente2.nome} ha ordinato ${pareoElegante.tipo}.</p>`;
  } else {
      result!.innerHTML = "<p>Scelta non valida.</p>";
  }
});
