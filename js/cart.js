//recuperamos el nombre del artículo con el get 
let nb = window.location.search.replace('?nombre=', "").replace(/\?url=producto-[a-zA-Z]*/, "").replace(/.png\b/, "").replace(/%20/, " ").replace(/%C3%B1/, "ñ");
// console.log('roman - '+nb);
//localizamos el objeto JSON y lo guardamos en un session storage

let carrito = localStorage
let listado = document.querySelector(".listado")
fetch('js/inventario.json')
.then(response => response.json())
.then(inventario => {
    let precioFinal = 0
    for (let i = 0; i < localStorage.length; i++) {
        //sacar la clave
        const key = localStorage.key(i)
        //obtener coincidencia
        let matches = inventario.filter((elemento)=>{
            return elemento.nombre==localStorage.key(i)
        })[0]
        let generar = ` 
        <div class="listado__productos">
            <div class="producto" id="producto-imagen">
                <div class="producto__imagen">
                    <img src="img/productos/${matches.ruta}" alt="Producto">
                </div>
                <div id="producto__desc">
                    <h4>${matches.nombre}</h4>
                    <a href="#">Quitar</a>
                </div>
            </div>
            <div class="producto">
                <h5 class="precioTotal">${matches.precio}€</h5>
            </div>
            <div class="producto control_cantidad">
                <input type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown()" class="btn--outline" value="-">
                <input type="number" name="cantidad" id="cantidad" min="0" value="${localStorage.getItem(key)}">
                <input type="button" onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus btn--outline" value="+">                          
            </div>
            <div class="producto">
                ${matches.precio*localStorage.getItem(key)}€
            </div>            
        </div>
        `
        listado.innerHTML+=generar
        
        precioFinal += matches.precio*localStorage.getItem(key)
        console.log(precioFinal)
    }
    document.querySelector(".subtotal").innerHTML = precioFinal
})