let mostSold = document.querySelector("#most-sold");

function cosa() {
    fetch('js/inventario.json')
        .then(response => response.json())
        .then(inventario => {
            mostSold.innerHTML = `
                <div class="card-xl shadow-a sr-left-4">
                    <div class="card-xl__header">
                        <img class="img-fit" src="img/productos/${inventario[0].ruta}" alt="t-shirt">
                    </div>
                    <div class="card-xl__body">
                        <h3 class="card-xl-title">${capitalizar(inventario[0].nombre)}</h3>
                        <p>${inventario[0].descripcion}</p>
                    </div>
                    <div class="card-xl__footer">
                        <a href="producto.html?nombre=${inventario[0].nombre}?url=${inventario[0].ruta}" class="btn btn--primary btn--md">VER PRODUCTO</a>
                        <a href="#" class="btn btn--md btn--outline" onclick="addCart('${inventario[0].clave}')">AÑADIR</a>
                    </div>
                </div>

                <div class="card-xl shadow-a sr-left-4">
                    <div class="card-xl__header">
                        <img class="img-fit" src="img/productos/${inventario[1].ruta}" alt="t-shirt">
                    </div>
                    <div class="card-xl__body">
                        <h3 class="card-xl-title">${capitalizar(inventario[1].nombre)}</h3>
                        <p>${inventario[1].descripcion}</p>
                    </div>
                    <div class="card-xl__footer">
                        <a href="producto.html?nombre=${inventario[1].nombre}?url=${inventario[1].ruta}" class="btn btn--primary btn--md">VER PRODUCTO</a>
                        <a href="#" class="btn btn--md btn--outline" onclick="addCart('${inventario[1].clave}')">AÑADIR</a>
                    </div>
                </div>

                <div class="card-xl shadow-a sr-left-4">
                    <div class="card-xl__header">
                        <img class="img-fit" src="img/productos/${inventario[2].ruta}" alt="t-shirt">
                    </div>
                    <div class="card-xl__body">
                        <h3 class="card-xl-title">${capitalizar(inventario[2].nombre)}</h3>
                        <p>${inventario[2].descripcion}</p>
                    </div>
                    <div class="card-xl__footer">
                        <a href="producto.html?nombre=${inventario[2].nombre}?url=${inventario[2].ruta}" class="btn btn--primary btn--md">VER PRODUCTO</a>
                        <a href="#" class="btn btn--md btn--outline" onclick="addCart('${inventario[2].clave}')">AÑADIR</a>
                    </div>
                </div>
            `;

        });
}

cosa();