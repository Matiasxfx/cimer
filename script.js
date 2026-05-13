const productos = [
    { sku: "R567408", nombre: "KG. CAÑO 1/2 ROLLO DE COBRE" },
    { sku: "R567402", nombre: "KG. CAÑO 1/4 ROLLO DE COBRE" },
    { sku: "R567406", nombre: "KG. CAÑO 3/8 ROLLO DE COBRE" },
    { sku: "R567410", nombre: "KG. CAÑO 5/8 ROLLO DE COBRE" },
    { sku: "R567412", nombre: "KG. CAÑO 3/4 ROLLO DE COBRE" },
    { sku: "R965102", nombre: "DOBLADORA DE CAÑO 5/8" },
    { sku: "R567404", nombre: "KG. CAÑO 5/16 ROLLO DE COBRE" },
    { sku: "R470132", nombre: "TUERCA REFORZADA 1/2 PARA CAÑO 1/2" },
    { sku: "R965096", nombre: "DOBLADORA DE CAÑO 1/2" },
    { sku: "R567367", nombre: "CAÑO RIGIDO EN TIRA 1 1/8\"" },
    { sku: "R470114", nombre: "TUERCA REFORZADA 1/4 PARA CAÑO 1/4" },
    { sku: "R470124", nombre: "TUERCA REFORZADA 3/8 PARA CAÑO 3/8" },
    { sku: "R997598", nombre: "DOBLADORA DE CAÑO 1/4 5/16 3/8 180º" },
    { sku: "R232008", nombre: "JUNTA PASA CAÑO 60 MM BLANCA" },
    { sku: "R946670", nombre: "TERMOSTATO NO FROST GAFA ATB" },
    { sku: "R997561", nombre: "PINZA REPARADORA DE CAÑO" },
    { sku: "R997565", nombre: "DOBLADOR INTERNO PARA CAÑERIAS 4M" },
    { sku: "R997549", nombre: "EXPANSOR DE CAÑO P/ TALADRO" },
    { sku: "R567414", nombre: "KG. CAÑO 7/8 ROLLO DE COBRE" },
    { sku: "R567364", nombre: "CAÑO RIGIDO EN TIRA 3/4\"" },
    { sku: "R470130", nombre: "TUERCA REFORZADA 1/2 PARA CAÑO 3/8" },
    { sku: "R971061", nombre: "KIT ELITY ACOPLE RAPIDO CAÑO" }
];

// Configuración: 6 productos por pantalla
const itemsPorPagina = 6;
let paginaActual = 0;

const grid = document.getElementById('barcode-grid');
const label = document.getElementById('page-label');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function mostrarPantalla(index) {
    grid.innerHTML = "";
    
    // Calcular rango de productos
    const inicio = index * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    const subset = productos.slice(inicio, fin);

    subset.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${p.nombre}</h2>
            <svg id="barcode-${i}"></svg>
            <div class="sku-label">${p.sku}</div>
        `;
        grid.appendChild(card);

        // Generar barra usando el SKU
        JsBarcode(`#barcode-${i}`, p.sku, {
            format: "CODE128",
            width: 2,
            height: 70,
            displayValue: false, // Oculto porque ya lo ponemos abajo en grande
            lineColor: "#000"
        });
    });

    // Actualizar botones e indicador
    label.innerText = `PANTALLA ${index + 1} DE ${Math.ceil(productos.length / itemsPorPagina)}`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = fin >= productos.length;
}

prevBtn.onclick = () => { paginaActual--; mostrarPantalla(paginaActual); };
nextBtn.onclick = () => { paginaActual++; mostrarPantalla(paginaActual); };

// Carga inicial
mostrarPantalla(paginaActual);