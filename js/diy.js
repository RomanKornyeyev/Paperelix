let botones = document.querySelector('.inputsColores');

//Seleccionamos todas las figuras del svg
let figuras = document.querySelectorAll(".figura")
//Array auxiliar
let formas = []

let btn = []
let etiqueta = []
let txtEtiqueta = []

let contenidoExtra = []
//Creamos inputs
figuras.forEach(e=>{
    if (!formas.includes(e.className.baseVal)) {
        formas.push(e.className.baseVal)
        //Creamos input
        btn = document.createElement('input');
        btn.setAttribute('type', 'color');
        btn.setAttribute('id', e.className.baseVal.replace(/\s/, "_"));
        btn.setAttribute('value', '#FFFFFF');
        
        let nb = e.className.baseVal.replace(/\sfigura/, "").replace(/([A-Z])/g, " $1")
        etiqueta = document.createElement('label');
        txtEtiqueta = document.createTextNode(capitalizar(nb));
        etiqueta.setAttribute('for', btn.id);
        
        etiqueta.appendChild(txtEtiqueta);
        etiqueta.appendChild(btn)
        
        botones.appendChild(etiqueta);
    }
})

//A cada elemento de ese array creado anteriormente, le aplicamos un addEventListener para que al hacer clic sobre dicho elemento, se centre el foco y se emule un clic de ratón sobre el input color que le corresponde.
figuras.forEach(element => {
    //Relacionamos la figura con el input
    element.addEventListener('click', function (e) {
        //Pillamos la clase (al ser un SVGElement... tenemos que especificar mediante baseVal, reemplazamos el espacio en blanco por un _)
        let seleccion = (this.className.baseVal).replace(/\s/, "_")
        console.log("Elemento seleccionado: " + seleccion)

        //llamamos mediante el id al input color que le corresponde, aplicamos el foco y simulamos un clic de ratón.
        document.querySelector('#' + seleccion).focus()
        document.querySelector('#' + seleccion).click()
    })
});

//Cambiar el color
document.addEventListener('input', function (e) {
    //Guardamos el nombre del input al que se le ha sometido la accion
    let nbInput = e.target.id
    console.log("Seleccion del nombre del input: " + nbInput)

    //Guardamos el color que se ha seleccionado
    let colorSele = document.querySelector('#' + nbInput).value
    console.log("Color seleccionado: " + colorSele)

    //Seleccionamos todos los elementos que se tienen que cambiar de color
    let elementoSele = document.querySelectorAll("." +nbInput.replace(/_[a-zA-Z]*/, ""))
    console.log(elementoSele)
    //Cambiamos el color, como es un svg hay que utilizar fill en vez de backgroundColor
    elementoSele.forEach(element => {
        element.style.fill = colorSele;
    });

})

let btnCart = document.querySelector("#addCart")
btnCart.addEventListener("click", function () {
    let etiquetas = document.getElementsByTagName('label');
    etiquetas = Array.from(etiquetas)
    etiquetas.shift()

    let coloresInput = document.querySelectorAll('input[type="color"]');
    let colFinales = []

    for (let i = 0; i < etiquetas.length; i++) {
        colFinales.push(etiquetas[i].innerText+": "+coloresInput[i].value)
    }
    sessionStorage.setItem("colores", JSON.stringify(colFinales))
    addCart("diy");
}, "diy")