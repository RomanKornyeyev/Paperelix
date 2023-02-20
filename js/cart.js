
//localizamos el objeto JSON y lo guardamos en un session storage
let listado = document.querySelector(".listado")


pintarLeerJSON()

function pintarLeerJSON(){
    fetch('js/inventario.json')
    .then(response => response.json())
    .then(inventario => {
        if(localStorage.length==0){
            listado.innerHTML=""
            let formulario = document.querySelector(".nota-pedido")
            formulario.style.display="none"
            listado.innerHTML="<h2>No tienes nada en el carrito</h2>";
            listado.innerHTML+="<h4>Date una vuelta por la tienda</h4>"
            let imagen = document.createElement("img")
            listado.appendChild(imagen)
            imagen.classList="desierto"
            imagen.src="img/desert.svg"
        }else{
            let subtotal = 0;
            listado.innerHTML=""
            listado.innerHTML=pintarCabecera();
            for (let i = 0; i < localStorage.length; i++) {
                //sacar la clave
                const key = localStorage.key(i)
                //obtener coincidencia
                let match = inventario.find((elemento)=>{
                    return elemento.clave==localStorage.key(i)
                })
                let objeto = new Article (match.clave, match.nombre, match.categoria, match.ruta, match.precio, match.descripcion, match.extendido, null)
                listado.innerHTML+=generarCarrito(objeto, key)
    
                subtotal += objeto.precio*localStorage.getItem(key)
            }
            document.querySelector(".subtotal").innerHTML = subtotal
        }
    })
}

function generarCarrito(objeto, key){
    return ` 
    <div class="listado__productos">
        <div class="producto" id="producto-imagen">
            <div class="producto__imagen">
                <img src="img/productos/${objeto.ruta}" alt="Producto">
            </div>
            <div id="producto__desc">
                <h4>${objeto.nombre}</h4>
                <a href="#" onclick="quitarElemento('${objeto.clave}')">Quitar</a>
            </div>
        </div>
        <div class="producto">
            <h5 id="${objeto.clave}Precio" class="precioTotal">${objeto.precio}€</h5>
        </div>
        <div class="producto control_cantidad">
            <input type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown(); removeCart('${objeto.clave}')" class="btn--outline" value="-">
            <input type="number" name="" min="0" value="${localStorage.getItem(key)}">
            <input type="button" onclick="this.parentNode.querySelector('input[type=number]').stepUp(); addCart('${objeto.clave}')" class="plus btn--outline" value="+">                          
        </div>
        <div class="producto">
            <p id="${objeto.clave}Resultado">${objeto.precio*localStorage.getItem(key)}€</p>
        </div>            
    </div>
    `
}

function pintarCabecera(){
    return ` 
    <div class="listado__titulo">
        <h4 id="titulo_izq">Producto</h4>
        <h4>Precio</h4>
        <h4>Cantidad</h4>
        <h4>Total</h4>
    </div>
    `
}

function removeCart(clave){
    let cantidad = parseInt(localStorage.getItem(clave))
    if(cantidad>1){
        actualizarPrecio(clave, false)
        let valor = cantidad-1;
        localStorage.setItem(clave, valor);
        reload(clave, valor);
    }else
        quitarElemento(clave)
}

function quitarElemento(clave){
    localStorage.removeItem(clave)
    pintarLeerJSON()
}