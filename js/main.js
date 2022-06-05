import {Tarea} from "./tarea.js";
import {marcarTareaComoCompletaDOM,marcarTareaComoIncompletaDOM,editarTareaIncompletaDOM,marcarComoEliminadaTareaDOM,recuperarTareaEliminadaDOM,eliminarDefinitivamenteTareaDOM,eliminarTarea} from "./funciones.js";

const $templateTareaIncompleta = document.getElementById("template").content,
    $listaIncompleta = document.getElementById("listaIncompleta"),
    $listaCompleta = document.getElementById("listaCompleta"),
    $listaEliminadas = document.getElementById("listaEliminadas");
    
let tareas = [], //tendre mis tareas
    cantidadTareasEliminadas, //contaré cuantas tareas eliminadas tengo.
    identificador, //Id para asignarselo a cada tarea creada.
    $li, //li que voy a usar para insertar en el HTML.
    $contadorTareasEliminadas = document.querySelector(".totalTareasEliminadas"), //Elemento HTML para mostrar la cantidad de tareas Eliminadas.
    $formulario = document.getElementById("formulario");

$formulario.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    $templateTareaIncompleta.querySelector("li").setAttribute("id",identificador);
    let textoInput = e.target.firstElementChild.value;

    if (textoInput.trim() ==="") {
        textoInput = "Tarea Vacia";
    }
    $templateTareaIncompleta.querySelector(".text").innerText = textoInput //recuperamos el valor del imput

    const tarea = new Tarea(textoInput.trim(),identificador);
    tareas.push(tarea);
    e.target.firstElementChild.value = "";
    
    $li = document.importNode($templateTareaIncompleta,true); //tengo el elemento li

    
    
    $li.querySelector(".desMarcar").classList.add("noMostrar");
    $li.querySelector(".eliminar").classList.remove("noMostrar");
    $li.querySelector(".descartar").classList.add("noMostrar");
    $li.querySelector(".recuperar").classList.add("noMostrar");
    
    
    // Agrego evento para completar una tarea
    let $btnCompleta = $li.querySelector(".completa");
    $btnCompleta.setAttribute("data-id",identificador);
    $btnCompleta.classList.remove("noMostrar");
    $btnCompleta.addEventListener("click",(e)=>{
        marcarTareaComoCompletaDOM(e,$listaCompleta,tareas);
    });

    
    // Volvemos una tarea a incompleta
    let $btnDesMarcar = $li.querySelector(".desMarcar");
    $btnDesMarcar.setAttribute("data-id",identificador);
    $btnDesMarcar.classList.add("noMostrar");
    $btnDesMarcar.addEventListener("click", (e) => {
        marcarTareaComoIncompletaDOM(e,$listaIncompleta,tareas);
    });

   //Eliminamamos una tarea
    let $btnEliminar = $li.querySelector(".eliminar");
    $btnEliminar.setAttribute("data-id",identificador);
    $btnEliminar.addEventListener("click", (e) => {
        cantidadTareasEliminadas = parseInt(localStorage.getItem("cantidadTareasEliminadas")) + 1 ;
        marcarComoEliminadaTareaDOM(e,tareas,cantidadTareasEliminadas,$contadorTareasEliminadas);
        localStorage.setItem("cantidadTareasEliminadas",cantidadTareasEliminadas); 
        Toastify({
            text: "Tarea Eliminada",
            duration: 1500,
            // destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: false,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, rgba(0, 184, 255, 0.8509803922), #f077dc)",
                borderRadius: "25px",
                transform: "translate(-100%,0%)",
                fontWeight: "bold",
                fontFamily: "cursive"
            }
            
        }).showToast(); 
    });


    //Editamos una tarea incompleta
    let $btnEditar = $li.querySelector(".editar");
    $btnEditar.setAttribute("data-id",identificador);
    $btnEditar.addEventListener("click", (e) => {
        editarTareaIncompletaDOM(e,tareas);
    });
     

    $listaIncompleta.appendChild($li);
    identificador++;
    localStorage.setItem("identificador",identificador);
    localStorage.setItem("tareas",JSON.stringify(tareas));
});


let $cestoBasura = document.querySelector(".cestoBasura");
let $modal = document.querySelector(".modal");

$cestoBasura.addEventListener("click",(e)=>{

    $modal.classList.remove("noMostrar");
    let tareasEliminadas = tareas.filter(el => el.getEstado() === "eliminada"),
    $fragment = document.createDocumentFragment();
    
    while ($listaEliminadas.firstChild) {
        $listaEliminadas.removeChild($listaEliminadas.firstChild);
    }

    tareasEliminadas.forEach(el =>{
        let id = el.getId();
        $li = document.importNode($templateTareaIncompleta,true); //Creamos un elemnto Li para renderizar.

            $li.querySelector("li").setAttribute("id",id);
            $li.querySelector(".text").innerText = el.getTarea();
            $li.querySelector(".completa").classList.add("noMostrar");
            $li.querySelector(".completa").setAttribute("data-id",id);

            $li.querySelector(".desMarcar").classList.add("noMostrar");
            $li.querySelector(".desMarcar").setAttribute("data-id",id);

            $li.querySelector(".eliminar").classList.add("noMostrar");
            $li.querySelector(".eliminar").setAttribute("data-id",id);

            $li.querySelector(".descartar").classList.remove("noMostrar");
            $li.querySelector(".descartar").setAttribute("data-id",id);
            
            $li.querySelector(".editar").classList.add("noMostrar");
            $li.querySelector(".editar").setAttribute("data-id",id);
            
            $li.querySelector("li").classList.add("tareaEliminada"); 
            
            $li.querySelector("li").style.backgroundColor = el.getColor();
            //Recuperamos una Tarea de la Papelera.
            let $btnRecuperar = $li.querySelector(".recuperar");
            $btnRecuperar.classList.remove("noMostrar");
            $btnRecuperar.setAttribute("data-id",id);

            $btnRecuperar.addEventListener("click",(e)=>{
                cantidadTareasEliminadas = parseInt(localStorage.getItem("cantidadTareasEliminadas")) - 1 ;
                recuperarTareaEliminadaDOM(e,tareas,cantidadTareasEliminadas,$contadorTareasEliminadas,$listaCompleta,$listaIncompleta);
                localStorage.setItem("cantidadTareasEliminadas",cantidadTareasEliminadas);
            });
            


            //Eliminar definitivamente una tarea
            $li.querySelector(".descartar").addEventListener("click",(e)=>{
                cantidadTareasEliminadas = parseInt(localStorage.getItem("cantidadTareasEliminadas")) - 1 ;
                eliminarDefinitivamenteTareaDOM(e,tareas,cantidadTareasEliminadas,$contadorTareasEliminadas);
                localStorage.setItem("cantidadTareasEliminadas",cantidadTareasEliminadas);         
            });

            $fragment.appendChild($li);
    });
   
    $modal.querySelector(".eliminarTodo").addEventListener("click",(e)=> {
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
        })
        
        swalWithBootstrapButtons.fire({
            title: 'Seguro que desea eliminar todas las Tareas?',
            text: "No podras revertir este proceso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, borralo !',
            cancelButtonText: 'No, cancelar !',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Papelera de Tareas Vaciada!',
                    'Todas sus tareas fueron eliminadas',
                    'success'
                )

                while ($listaEliminadas.firstChild) {
                    $listaEliminadas.removeChild($listaEliminadas.firstChild);
                }
        
                localStorage.setItem("cantidadTareasEliminadas",0);
                $contadorTareasEliminadas.setAttribute("hidden",true);
                document.querySelector(".cestoBasura").setAttribute("hidden",true);
        
                let eliminadas = tareas.filter(el => el.getEstado() === "eliminada");
                eliminadas.forEach(elemento => {
                   eliminarTarea(elemento.getId(),tareas);
                });
                
                localStorage.setItem("tareas",JSON.stringify(tareas));





            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'No se eliminará ninguna Tarea :)',
                    'error'
                )
            }
        })


    });

 $listaEliminadas.appendChild($fragment);
});



let $modalCancel = document.querySelector(".modal-header img");


$modalCancel.addEventListener("click",()=>{
        $modal.classList.add("noMostrar");
        ;
});


window.addEventListener('load', () => {
    let storage = localStorage;
    identificador = storage.getItem("identificador");
    
    identificador ===null && storage.setItem("identificador",1);
    
    identificador = parseInt(storage.getItem("identificador"));
    
    cantidadTareasEliminadas  = storage.getItem("cantidadTareasEliminadas");

    cantidadTareasEliminadas ===null && storage.setItem("cantidadTareasEliminadas",0);

    cantidadTareasEliminadas = parseInt(storage.getItem("cantidadTareasEliminadas"));

    const tarea = JSON.parse(storage.getItem("tareas")); //Obtenemos nuestro Array de Tareas.
    if (tarea!== null) { //tengo tareas

        //cargo el array con objetos para poder aplicar los metodos que tiene y no sea un objeto literal.
        tarea.forEach(el => {
            let tarea = new Tarea(el.tarea,el.id);
            tarea.setEstado(el.estado);
            tarea.setEstadoAnterior(el.estadoAnterior);
            tarea.setFechaCompletado(el.fechaCompletado);
            tarea.fechaCreacion = el.fechaCreacion;
            tarea.fechaEliminada = el.fechaEliminada;
            tarea.setColor(el.color);
            tareas.push(tarea);
        });

        tareas.forEach((el) => {
            let id = el.getId();
                $templateTareaIncompleta.querySelector("li").setAttribute("id",id);
                
                $templateTareaIncompleta.querySelector(".text").innerText = el.getTarea();
                $li = document.importNode($templateTareaIncompleta,true); //tengo el elemento li
                
                console.dir($li.querySelector(`li`));
                
                let $btnCompleta = $li.querySelector(".completa");
                $btnCompleta.setAttribute("data-id",id);
                $btnCompleta.classList.remove("noMostrar");
                // Agrego evento para completar una tarea
                $btnCompleta.addEventListener("click", (e) => {
                    marcarTareaComoCompletaDOM(e,$listaCompleta,tareas);
                });

                
                // Volvemos una tarea a incompleta
                let $btnDesMarcar = $li.querySelector(".desMarcar");
                $btnDesMarcar.setAttribute("data-id",id);
                $btnDesMarcar.classList.add("noMostrar");

                $btnDesMarcar.addEventListener("click", (e) => {
                    marcarTareaComoIncompletaDOM(e,$listaIncompleta,tareas);
                });


                //Eliminamamos una tarea (cambiamos su estado a eliminada).
                let $btnEliminar = $li.querySelector(".eliminar");
                $btnEliminar.setAttribute("data-id",id);
                $btnEliminar.addEventListener("click", (e) => {
                    cantidadTareasEliminadas = parseInt(localStorage.getItem("cantidadTareasEliminadas")) + 1 ;
                    marcarComoEliminadaTareaDOM(e,tareas,cantidadTareasEliminadas,$contadorTareasEliminadas);
                    localStorage.setItem("cantidadTareasEliminadas",cantidadTareasEliminadas);  
                });


                let $btnEditar = $li.querySelector(".editar");
                $btnEditar.setAttribute("data-id",id);
                //Editamos una tarea incompleta
                $btnEditar.addEventListener("click", (e) => {
                    editarTareaIncompletaDOM(e,tareas);
                });

                
                //Como debemos de cargar las tareas que existian en el localStorage debemos de saber el estado que tenia.
                //Ya que debemos de pintar las incompletas y completas segun corresponda.
                if (el.getEstado() === "incompleta" ) {
                    $li.querySelector(".completa").classList.remove("noMostrar");
                    $li.querySelector(".desMarcar").classList.add("noMostrar");
                    $li.querySelector(".eliminar").classList.remove("noMostrar");
                    $li.querySelector(".recuperar").classList.add("noMostrar");
                    $li.querySelector(".descartar").classList.add("noMostrar");
                    $li.querySelector(".editar").classList.remove("noMostrar");
                    $li.querySelector("li").classList.add("tareaIncompleta");
                    $li.querySelector("li").classList.remove("tareaCompleta");
                    $li.querySelector("li").style.backgroundColor = el.getColor();
                    $listaIncompleta.appendChild($li);
                }else if (el.getEstado() === "completa") {
                    $li.querySelector(".completa").classList.add("noMostrar");
                    $li.querySelector(".desMarcar").classList.remove("noMostrar");
                    $li.querySelector(".eliminar").classList.remove("noMostrar");
                    $li.querySelector(".recuperar").classList.add("noMostrar");
                    $li.querySelector(".descartar").classList.add("noMostrar");
                    $li.querySelector(".editar").classList.add("noMostrar");
                    $li.querySelector("li").classList.remove("tareaIncompleta");
                    $li.querySelector("li").classList.add("tareaCompleta");
                    $li.querySelector("li").style.backgroundColor = el.getColor();
                    $listaCompleta.appendChild($li);
                }
                
        });
    }




    if (cantidadTareasEliminadas === 0) {
        $contadorTareasEliminadas.setAttribute("hidden",true);
        document.querySelector(".cestoBasura").setAttribute("hidden",true);
    }else if(cantidadTareasEliminadas<9) {
        $contadorTareasEliminadas.innerText = cantidadTareasEliminadas;
    }

    (cantidadTareasEliminadas >= 9)
        ? $contadorTareasEliminadas.innerHTML = `9+`
        : $contadorTareasEliminadas.innerText = cantidadTareasEliminadas;
    
    if (cantidadTareasEliminadas > 0) {
        $contadorTareasEliminadas.removeAttribute("hidden");
        document.querySelector(".cestoBasura").removeAttribute("hidden");
    }
});





