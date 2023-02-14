class Article {
    constructor(clave, nombre, categoria, ruta, precio, descripcion, extendido, color) {
        this.clave=clave;
        this.nombre = nombre;
        this.categoria = capitalizar(categoria);
        this.ruta = ruta;
        this.precio = precio;
        this.descripcion = descripcion;
        this.extendido = extendido;
        this.color = color;
    }
    
    pintar() {
        let cantidadProductos = localStorage.getItem(this.clave);
        cantidadProductos = (cantidadProductos!=null)?cantidadProductos:0;
        canvas.innerHTML += `
            <div class="card shadow-a">
                <a href="producto.html?nombre=`+ this.nombre + `?url=` + this.ruta + `">
                        <div class="card__header color_`+ this.color + `">
                            <img class="img-fit product-img" src="IMG/productos/`+ this.ruta + `" alt="` + this.categoria + " " + this.nombre + `">
                        </div>
                        <div class="card__body">
                            <h3 class="card-title">`+ capitalizar(this.nombre) + `</h3>
                            <p>`+ this.categoria + `</p>
                            <p><strong>`+ this.precio + `€</strong></p>
                        </div>
                </a>
                <div class="shopping">
                <p id="`+this.clave+`">`+cantidadProductos+`</p>
                    <div class="cart addCart" onclick="addCart('`+this.clave+`','`+this.nombre+`')">
                    <i class="fa-solid fa-bag-shopping svg-cart"></i>
                    </div>
                </div>
            </div>`
    }

}

function addCart(clave, nombre) {
/*     let info = document.querySelector('.info');
    let alertCart = document.createElement('div');
    let pCart = document.createElement('p');
    let textCart = document.createTextNode('Producto añadido a la cesta');
    pCart.appendChild(textCart);
    alertCart.appendChild(pCart);
    info.appendChild(alertCart); */

    let valor = localStorage.getItem(nombre);
    if (valor != null) {
        valor++;
        localStorage.setItem(nombre, valor);
    } else {
        valor=1;
        localStorage.setItem(nombre, valor);
    }
    reload(clave, valor);
}

function reload(clave, valor) {
    console.log(valor)
    let cantidad = document.querySelector('#'+clave);
    cantidad.innerHTML = valor;
    
}

function capitalizar(cadena) {
    let resultado = cadena.charAt(0).toUpperCase() + cadena.slice(1);
    return resultado;
}