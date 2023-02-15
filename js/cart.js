//localizamos el objeto JSON y lo guardamos en un session storage
let listado = document.querySelector(".listado")
fetch('js/inventario.json')
    .then(response => response.json())
    .then(inventario => {
        let subtotal = 0;
        for (let i = 0; i < localStorage.length; i++) {
            //sacar la clave
            const key = localStorage.key(i)
            //obtener coincidencia
            let match = inventario.find((elemento)=>{
                return elemento.clave==localStorage.key(i)
            })
            let objeto = new Article (match.clave, match.nombre, match.categoria, match.ruta, match.precio, match.descripcion, match.extendido, null)
            listado.innerHTML+=generarTexto(objeto, key)

            subtotal += objeto.precio*localStorage.getItem(key)
        }
        document.querySelector(".subtotal").innerHTML = subtotal
    })


function generarTexto(objeto, key){
    return ` 
    <div class="listado__productos">
        <div class="producto" id="producto-imagen">
            <div class="producto__imagen">
                <img src="img/productos/${objeto.ruta}" alt="Producto">
            </div>
            <div id="producto__desc">
                <h4>${objeto.nombre}</h4>
                <a href="#">Quitar</a>
            </div>
        </div>
        <div class="producto">
            <h5 class="precioTotal">${objeto.precio}€</h5>
        </div>
        <div class="producto control_cantidad">
            <input type="button" onclick="this.parentNode.querySelector('input[type=number]').stepDown()" class="btn--outline" value="-">
            <input type="number" name="" min="0" value="${localStorage.getItem(key)}">
            <input type="button" onclick="this.parentNode.querySelector('input[type=number]').stepUp(); addCart('${objeto.clave}')" class="plus btn--outline" value="+">                          
        </div>
        <div class="producto">
            <p id="${objeto.clave}">${objeto.precio*localStorage.getItem(key)}€</p>
        </div>            
    </div>
    `
}