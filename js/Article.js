class Article {
    constructor(nombre, categoria, ruta, precio, descripcion, extendido, color) {
        this.nombre = this.capitalizar(nombre);
        this.categoria = this.capitalizar(categoria);
        this.ruta = ruta;
        this.precio = precio;
        this.descripcion = this.capitalizar(descripcion);
        this.extendido = extendido;
        this.color = color;
    }
    capitalizar(cadena) {
        let resultado = cadena.charAt(0).toUpperCase() + cadena.slice(1);
        return resultado;
    }
    pintar() {
        let parse = this.nombre.replace(" ", "");
        let cantidadProductos = localStorage.getItem(this.nombre);
        cantidadProductos = (cantidadProductos!=null)?cantidadProductos:0;
        canvas.innerHTML += `
            <div class="card shadow-a">
                <a href="producto.html?nombre=`+ this.nombre + `?url=` + this.ruta + `">
                        <div class="card__header color_`+ this.color + `">
                            <img class="img-fit product-img" src="IMG/productos/`+ this.ruta + `" alt="` + this.categoria + " " + this.nombre + `">
                        </div>
                        <div class="card__body">
                            <h3 class="card-title">`+ this.nombre + `</h3>
                            <p>`+ this.categoria + `</p>
                            <p><strong>`+ this.precio + `€</strong></p>
                        </div>
                </a>
                <div class="shopping">
                <p id="`+parse+`">`+cantidadProductos+`</p>
                    <div class="cart addCart" onclick="addCart('`+this.nombre+`')">
                    <i class="fa-solid fa-bag-shopping svg-cart"></i>
                    </div>
                </div>
            </div>`
    }

}

function addCart(nombre) {
    addCart.called=true;

    let valor = localStorage.getItem(nombre);
    if (valor != null) {
        valor++;
        localStorage.setItem(nombre, valor);
    } else {
        localStorage.setItem(nombre, 1);
    }
    reload(nombre, valor);
}

function reload(nombre, valor) {
    let cantidad = document.querySelector('#'+nombre);
    cantidad.innerHTML = valor;
}