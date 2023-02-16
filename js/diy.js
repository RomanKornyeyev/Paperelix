//Seleccionamos todas las figuras del svg
let figuras = document.querySelectorAll(".figura")

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
    let nbInput = e.target.name
    console.log("Seleccion del nombre del input: " + nbInput)

    //Guardamos el color que se ha seleccionado
    let colorSele = document.querySelector('[name="' + nbInput + '"]').value
    console.log("Color seleccionado: " + colorSele)

    //Seleccionamos todos los elementos que se tienen que cambiar de color
    let elementoSele = document.querySelectorAll("." + nbInput.replace("input", ""))

    //Cambiamos el color, como es un svg hay que utilizar fill en vez de backgroundColor
    elementoSele.forEach(element => {
        element.style.fill = colorSele;
    });

})