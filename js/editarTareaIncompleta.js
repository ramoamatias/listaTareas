import {buscarTarea} from "./funciones.js";


export const editarTareaIncompletaDOM = (e,tareas) => {           
    let identificadorTarea = e.target.getAttribute("data-id"),
            $liARecuperar = document.getElementById(identificadorTarea),
            $texto = $liARecuperar.querySelector(".text"),
            textAEditar = $texto.innerText,
            $contenedorOpciones = $liARecuperar.querySelector(".contenedorOpciones"),
            $inputEditor = $contenedorOpciones.children[0],
            $btnOk = $contenedorOpciones.children[1],
            $btnCancel = $contenedorOpciones.children[2];;
    
        $liARecuperar.querySelector(".completa").classList.add("noMostrar");
        $liARecuperar.querySelector(".desMarcar").classList.add("noMostrar");
        $liARecuperar.querySelector(".eliminar").classList.add("noMostrar");
        $liARecuperar.querySelector(".recuperar").classList.add("noMostrar");
        $liARecuperar.querySelector(".descartar").classList.add("noMostrar");
        $liARecuperar.querySelector(".editar").classList.add("noMostrar");

        $texto.classList.add("noMostrar");
        $inputEditor.removeAttribute("hidden");
        $inputEditor.classList.remove("noMostrar");
        $inputEditor.value = textAEditar;
        $btnOk.removeAttribute("hidden");
        $btnOk.classList.remove("noMostrar") ;
        $btnCancel.removeAttribute("hidden");
        $btnCancel.classList.remove("noMostrar");


        $btnOk.addEventListener("click",()=>{
            let tarea = buscarTarea(identificadorTarea,tareas);
            
            if ($inputEditor.value.trim() !==""){
                tarea.setTarea($inputEditor.value);
                $texto.innerHTML = $inputEditor.value;
            }

            $liARecuperar.querySelector(".completa").classList.remove("noMostrar");
            $liARecuperar.querySelector(".desMarcar").classList.add("noMostrar");
            $liARecuperar.querySelector(".eliminar").classList.remove("noMostrar");
            $liARecuperar.querySelector(".recuperar").classList.add("noMostrar");
            $liARecuperar.querySelector(".descartar").classList.add("noMostrar");
            $liARecuperar.querySelector(".editar").classList.remove("noMostrar");
            $inputEditor.classList.add("noMostrar");
            $btnOk.classList.add("noMostrar") ;
            $btnCancel.classList.add("noMostrar");
            $texto.classList.remove("noMostrar");
            
            localStorage.setItem("tareas",JSON.stringify(tareas));
        });

        $btnCancel.addEventListener("click",()=>{
            $liARecuperar.querySelector(".completa").classList.remove("noMostrar");
            $liARecuperar.querySelector(".desMarcar").classList.add("noMostrar");
            $liARecuperar.querySelector(".eliminar").classList.remove("noMostrar");
            $liARecuperar.querySelector(".recuperar").classList.add("noMostrar");
            $liARecuperar.querySelector(".descartar").classList.add("noMostrar");
            $liARecuperar.querySelector(".editar").classList.remove("noMostrar");
            $inputEditor.classList.add("noMostrar");
            $btnOk.classList.add("noMostrar") ;
            $btnCancel.classList.add("noMostrar");
            $texto.classList.remove("noMostrar");
        });
}

//Nos permitira poder editar una tarea 

//Parametros que necesita la funcion:
// *-> e = es el evento que activa la accion. Para obtener el id de la tarea.
// *-> tareas = array en donde se buscara los elementos y ademas se almacenará en el localstorage.
