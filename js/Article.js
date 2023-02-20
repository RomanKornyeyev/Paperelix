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
                    <div class="cart addCart" onclick="addCart('`+this.clave+`')">
                    <i class="fa-solid fa-bag-shopping svg-cart"></i>
                    </div>
                </div>
            </div>`
    }
}


function addCart(clave) {
    actualizarPrecio(clave, true)
    let cantidad = parseInt(localStorage.getItem(clave))
    //controlamos si el producto ya ha sido añadido a la lista, de ser asi sumamos uno a la cantidad
    let valor = (cantidad!=null && !isNaN(cantidad))?cantidad+1:1;
    localStorage.setItem(clave, valor);
    reload(clave, valor);
}


function reload(clave, valor) {
    console.log(valor)
    let cantidad
    cantidad = document.querySelector('#'+clave); 
    cantidad.innerHTML = valor;
    console.log("hola")  
}

function capitalizar(cadena) {
    let resultado = cadena.charAt(0).toUpperCase() + cadena.slice(1);
    return resultado;
}

function actualizarPrecio(clave, aumentar){
    try {
        let resultado = document.getElementById(clave+"Resultado");
        let precio = document.getElementById(clave+"Precio").innerHTML;

        let cantidad
        if(aumentar){
            cantidad = (parseFloat(localStorage.getItem(clave))+1)
        }else{
            cantidad = parseFloat(localStorage.getItem(clave))-1
        }
        precio = precio.slice(0, precio.length-1)
        resultado.innerHTML= (cantidad*parseFloat(precio))+"€"
        
    } catch (error) {
        
    }
}
