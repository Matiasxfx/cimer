let paginaActual = 0;

const grid = document.getElementById('barcode-grid');
const label = document.getElementById('page-label');
const tituloHeader = document.getElementById('seccion-titulo');
const prevBtn = document.getElementById('prevBtn');
const loopBtn = document.getElementById('loopBtn');

function mostrarPantalla(index) {
    if (typeof paginasManuales === 'undefined' || !paginasManuales[index]) return;

    grid.innerHTML = "";
    const paginaData = paginasManuales[index];
    tituloHeader.innerText = paginaData.titulo;

    paginaData.productos.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h2>${p.nombre}</h2><svg id="barcode-${i}"></svg><div class="sku-label">${p.sku}</div>`;
        grid.appendChild(card);

        JsBarcode(`#barcode-${i}`, p.sku, {
            format: "CODE128",
            width: 2,
            height: 50,
            displayValue: false,
            lineColor: "#000"
        });
    });

    label.innerText = `PANTALLA ${index + 1} DE ${paginasManuales.length}`;
    prevBtn.style.visibility = (index === 0) ? "hidden" : "visible";
}

const avanzarOBuclerear = () => {
    paginaActual = (paginaActual < paginasManuales.length - 1) ? paginaActual + 1 : 0;
    mostrarPantalla(paginaActual);
};

const retroceder = () => {
    if (paginaActual > 0) {
        paginaActual--;
        mostrarPantalla(paginaActual);
    }
};

loopBtn.onclick = avanzarOBuclerear;
prevBtn.onclick = retroceder;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        avanzarOBuclerear();
    }
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        retroceder();
    }
});

window.onload = () => mostrarPantalla(paginaActual);