import {buscarTarea} from "./funciones.js";

export const marcarComoEliminadaTareaDOM = (e,tareas,cantidadTareasEliminadas,$contadorTareasEliminadas) => {
  
  if (e.target.matches("img")){
    let identificadorTarea = e.target.getAttribute("data-id"),
       $liAEliminar = document.getElementById(identificadorTarea);
  
    let tarea = buscarTarea(identificadorTarea,tareas);
    tarea.marcarComoEliminada();
    $liAEliminar.remove();
  
    $liAEliminar.querySelector(".completa").classList.add("noMostrar");
    $liAEliminar.querySelector(".desMarcar").classList.add("noMostrar");
    $liAEliminar.querySelector(".eliminar").classList.add("noMostrar");
    $liAEliminar.querySelector(".descartar").classList.remove("noMostrar");
    $liAEliminar.querySelector(".recuperar").classList.remove("noMostrar");
    $liAEliminar.querySelector(".descartar").classList.remove("noMostrar");
    $liAEliminar.querySelector(".editar").classList.add("noMostrar");
    $liAEliminar.classList.remove("tareaCompleta") || $liAEliminar.classList.remove("tareaIncompleta"); 
    $liAEliminar.classList.add("tareaEliminada"); 
    
      if (cantidadTareasEliminadas ===1){
        $contadorTareasEliminadas.removeAttribute("hidden");
        document.querySelector(".cestoBasura").removeAttribute("hidden");
    }
    
    if (cantidadTareasEliminadas > 9) {
        $contadorTareasEliminadas.innerHTML = `9+`;
    } else {
        $contadorTareasEliminadas.innerText = cantidadTareasEliminadas;
    }
  
  localStorage.setItem("tareas",JSON.stringify(tareas));
  }
}

// Esta funcion se encarga de pasar una tarea completa/incompleta al estado eliminada

//Parametros que necesita la funcion:
// *-> e = es el evento que activa la acción, mediante el cual obtenemos el identificador de la tarea.
// *-> tareas = array en donde se buscara los elementos y ademas se almacenará en el localstorage.
// *-> cantidadTareasEliminadas = es el contador de tareas eliminadas  que nos indicara como mostrar el cartel de cantidad eliminadas.
// *-> $contadorTareasEliminadas = es el elemento Html en el cuando plasmamos el valor del contador de tareas eliminadas.


