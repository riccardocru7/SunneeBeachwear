
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
            logOutput(`Il prodotto ${this.id} è stato assegnato a ${cliente.nome} ${cliente.cognome}`);
        } else {
            logOutput(`Il prodotto ${this.id} non è disponibile.`);
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
        logOutput(`Prodotto ${prodotto.id} aggiunto al processo di produzione ${this.nome}`);
    }
}


function logOutput(message: string): void {
    const outputConsole = document.getElementById("outputConsole") as HTMLPreElement;
    if (outputConsole) {
        outputConsole.textContent += `${message}\n`;
    }
}


const costumeRelax = new Prodotto("costume da bagno", "001", "M", "blu", "disponibile");
const pareoElegante = new Prodotto("pareo", "002", "unica", "rosso", "disponibile");
const cappelloSolare = new Prodotto("cappello", "003", "unica", "giallo", "disponibile");

const cliente1 = new Cliente("Luca", "Rossi", "luca.rossi@example.com", "carta di credito");
const cliente2 = new Cliente("Maria", "Verdi", "maria.verdi@example.com", "paypal");
const cliente3 = new Cliente("Andrea", "Bianchi", "andrea.bianchi@example.com", "bonifico");
const cliente4 = new Cliente("Giulia", "Neri", "giulia.neri@example.com", "carta di credito"); // Nuovo cliente

const processoSostenibile = new ProcessoProduzione("Riciclo Reti da Pesca", "Trasforma reti da pesca in filati per costumi.");


document.getElementById("aggiungiProdotto")?.addEventListener("click", () => {
    processoSostenibile.aggiungiProdotto(costumeRelax);
    processoSostenibile.aggiungiProdotto(pareoElegante);
    processoSostenibile.aggiungiProdotto(cappelloSolare);
    logOutput("Prodotti aggiunti al processo di produzione.");
});

document.getElementById("ordinaProdotto1")?.addEventListener("click", () => {
    cliente1.ordinaProdotto(costumeRelax);
});

document.getElementById("ordinaProdotto2")?.addEventListener("click", () => {
    cliente2.ordinaProdotto(pareoElegante);
});

document.getElementById("ordinaProdotto3")?.addEventListener("click", () => {
    cliente3.ordinaProdotto(cappelloSolare);
});

document.getElementById("ordinaProdotto4")?.addEventListener("click", () => { // Nuovo listener per il nuovo cliente
    cliente4.ordinaProdotto(costumeRelax);
});

document.getElementById("mostraProdotti")?.addEventListener("click", () => {
    logOutput("Prodotti in produzione:");

    
    if (processoSostenibile.prodottiInProduzione.length > 0) {
        // Scorre attraverso l'elenco dei prodotti in produzione e li visualizza
        processoSostenibile.prodottiInProduzione.forEach(prodotto => {
            logOutput(`- ${prodotto.tipo} (${prodotto.id}) - Taglia: ${prodotto.taglia} - Colore: ${prodotto.colore} - Stato: ${prodotto.stato}`);
        });
    } else {
        logOutput("Nessun prodotto in produzione.");
    }
});
