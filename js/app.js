//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const cursos = document.querySelector('#lista-cursos');
let listaCursos = [];

cargarEventListeners();

function cargarEventListeners (){
    cursos.addEventListener('click',agregarCurso);

    carrito.addEventListener('click',eliminarCurso);

    carrito.addEventListener('click',vaciarCarrito);
}

function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const datosCurso = e.target.parentElement.parentElement;

        leerDatosCurso(datosCurso);
    }
}

//Eliminar curso del carrito de compras && vaciar carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        console.log(e.target.getAttribute('data-id'));
        const idCurso = e.target.getAttribute('data-id');

        listaCursos.map((curso,i) => {
            if(curso.id === idCurso){
                    listaCursos.splice(i,1);
            }
        });
    }
    else if(e.target.getAttribute('id') === 'vaciar-carrito')
    {
        console.log('vaciar carrito')
        listaCursos = []; 
    }
    carritoHTML();
}

//lee el contenido del html al que le dimos click
function leerDatosCurso(curso){
    console.log(curso);

    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    const existe = listaCursos.some(curso => curso.id == infoCurso.id);
    if(existe){
        const cursos = listaCursos.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
            }
            return curso;
        });
        listaCursos = [...cursos];
    }else{
        listaCursos = [...listaCursos, infoCurso]
    }
    carritoHTML();
}


//Muestra el carrito de compras en el html 

function carritoHTML(){

    //limpiar el html 

    limpiarHtml();

    //Recorre el carrito y genera el html

    listaCursos.forEach(curso =>{
        const{imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML=`
            <td>
                <img src='${imagen}' with="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id=${id}>X</a>
            </td>
            
        
        `;

        //Agrega el html del carrito en el body

        contenedorCarrito.appendChild(row);
    });
}

function limpiarHtml(){

    //forma lenta
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
