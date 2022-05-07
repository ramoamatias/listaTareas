import {buscarTarea} from "./funciones.js";

export const marcarTareaComoIncompletaDOM = (e,$listaIncompleta,tareas) => {           
            let identificadorTarea = e.target.getAttribute("data-id"),
               $liADesmarcar = document.getElementById(identificadorTarea),
               tarea = buscarTarea(identificadorTarea,tareas);

            tarea.marcarComoIncompleta();

            $liADesmarcar.remove();
            $liADesmarcar.querySelector(".completa").classList.remove("noMostrar");
            $liADesmarcar.querySelector(".desMarcar").classList.add("noMostrar");
            $liADesmarcar.querySelector(".descartar").classList.add("noMostrar");
            $liADesmarcar.querySelector(".editar").classList.remove("noMostrar");
            $liADesmarcar.classList.remove("tareaCompleta"); 
            $liADesmarcar.classList.add("tareaIncompleta"); 
          
            $listaIncompleta.appendChild($liADesmarcar); 
            localStorage.setItem("tareas",JSON.stringify(tareas));
} 

// Esta funcion se encarga de pasar una tarea completa al estado incompleta.

//Parametros que necesita la funcion:
// *-> e = es el evento que activa la accion.
// *-> $listaIncompleta = elemento en el DOM en donde debo de agregar la tarea. Reprenseta lugar de la listaIncompleta
// *-> tareas = array en donde se buscara los elementos y ademas se almacenará en el localstorage.
