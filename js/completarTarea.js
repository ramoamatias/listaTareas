import {buscarTarea} from "./funciones.js";

export const marcarTareaComoCompletaDOM = (e,$listaCompleta,tareas) => {
        let identificadorTarea = e.target.getAttribute("data-id"),
            $liACompletar = document.getElementById(identificadorTarea),
            tarea = buscarTarea(identificadorTarea,tareas);

        tarea.marcarComoCompleta();
        
        $liACompletar.remove();
        $liACompletar.querySelector(".completa").classList.add("noMostrar");
        $liACompletar.querySelector(".recuperar").classList.add("noMostrar");
        $liACompletar.querySelector(".desMarcar").classList.remove("noMostrar");
        $liACompletar.querySelector(".descartar").classList.add("noMostrar");
        $liACompletar.querySelector(".editar").classList.add("noMostrar");
        $liACompletar.classList.add("tareaCompleta"); 
        
        $listaCompleta.appendChild($liACompletar); 
        localStorage.setItem("tareas",JSON.stringify(tareas)); 
}

// Esta funcion hace que se marque una tarea como completa

//Parametros que necesita la funcion:
// *-> e = es el evento que activa la accion.
// *-> $listaCompleta = elemento en el DOM en donde debo de agregar la tarea. Reprenseta lugar de la listaCompleta
// *-> tareas = array en donde se buscara los elementos y ademas se almacenará en el localstorage.


