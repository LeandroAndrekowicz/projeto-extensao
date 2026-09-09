let money = 50;
let selectedSeed = "carrot";
let inventory = {
    carrot: 0,
    corn: 0,
    tomato: 0
};

const farm = document.querySelector("#farm");
const moneyElement = document.querySelector("#money");
const messageElement = document.querySelector("#message");

const seedButtons = document.querySelectorAll(".seed");
const sellButton = document.querySelector("#sellButton");

const inventoryElements = {
    carrot: document.querySelector("#inv-carrot"),
    corn: document.querySelector("#inv-corn"),
    tomato: document.querySelector("#inv-tomato")
};

const seeds = {
    carrot : {
        name: "Cenoura",
        icon: "🥕",
        seedPrice: 5,
        sellPrice: 8,
        growTime: 5000 
    },

    corn : {
        name: "Milho",
        icon: "🌽",
        seedPrice: 10,
        sellPrice: 13,
        growTime: 8000
    },

    tomato : {
        name: "Tomate",
        icon: "🍅",
        seedPrice: 15,
        sellPrice: 18,
        growTime: 10000
    }
};


function createFarm() {

    for (let i = 0; i < 12; i++){
        const plot = document.createElement("div");

        plot.classList.add("plot");

        plot.dataset.status = "empty";

        plot.addEventListener("click", () => {
            plant(plot);
        })

        farm.appendChild(plot);
    }
}

/* Alterações aqui */
seedButtons.forEach(button => {

    button.addEventListener("click", () => {

        seedButtons.forEach(item => {
            item.classList.remove("selected");
        })

        button.classList.add("selected");

        selectedSeed = button.dataset.seed;

        messageElement.textContent = `${seeds[selectedSeed].name} selecionada. clique em um terreno.`
    })
})

sellButton.addEventListener("click", sellAll);

function plant(plot) {
    if (plot.dataset.status === "ready") {
        harvest(plot);
        return;
    }

    if (plot.dataset.status !== "empty") {
        return;
    }

    const seed = seeds[selectedSeed];

    if (money < seed.seedPrice) {
        messageElement.textContent = "Voce não possui moedas suficiente.";
        return;
    }

    money -= seed.seedPrice;

    updateMoney()

    plot.dataset.status = "growing";
    plot.dataset.seed = selectedSeed;

    plot.textContent = "🌱";

    messageElement.textContent = `${seed.name} plantada! Aguarde crescer`;

    setTimeout(() => {
        growPlant(plot);
    }, seed.growTime);
}

function growPlant(plot) {

    if (plot.dataset.status !== "growing") {
        return;
    }

    const seed = seeds[plot.dataset.seed];

    plot.textContent = seed.icon;

    plot.dataset.status = "ready";

    messageElement.textContent = `${seed.name} pronta(o) para colher`;
}

function harvest(plot) {
    const seedName = plot.dataset.seed;

    const seed = seeds[seedName];

    const amount = Math.floor(Math.random() * 3) + 1;

    inventory[seedName] += amount;

    updateInventory();

    plot.textContent = "";

    plot.dataset.status = "empty";

    delete plot.dataset.seed;

    messageElement.textContent = `Voce colheu ${amount} ${seed.name}(s)!`;
}

function sellAll() {
    let total = 0;

    for (const seedName in inventory) {

        total += inventory[seedName] * seeds[seedName].sellPrice;

        inventory[seedName] = 0;
    }

    if ( total === 0) {

        messageElement.textContent = "Voce não possui produtos para vender."
        return;
    }

    money += total;

    updateMoney();

    updateInventory();

    messageElement.textContent = `Voce vendeu todos os produtos por ${total} moedas!`;

}

function updateMoney() {
    moneyElement.textContent = money;
}

function updateInventory() {

    inventoryElements.carrot.textContent = inventory.carrot;

    inventoryElements.corn.textContent = inventory.corn;

    inventoryElements.tomato.textContent = inventory.tomato;
}

createFarm();
updateMoney();
updateInventory();