class Tarea {

    constructor(tarea,id) {
        this.id = id;
        this.tarea = tarea;
        this.estado = 'incompleta';
        this.estadoAnterior = null;
        this.fechaCreacion = new Date();
        this.fechaEliminada = null;
        this.fechaCompletado = null;
    }

    getId() {
        return this.id;
    }

    setId(nuevoId){
        this.id = nuevoId;
    }


    getTarea(){
        return this.tarea;
    }

    setTarea(nuevaTarea){
        this.tarea = nuevaTarea;
    }

    getEstado(){
        return this.estado;
    }

    setEstado(nuevoEstado){
        this.estado = nuevoEstado;
    }
    
    getEstadoAnterior(){
        return this.estadoAnterior;
    }

    setEstadoAnterior(nuevoEstado){
        this.estadoAnterior = nuevoEstado;
    }

    getFechaCreacion(){
        return this.fechaCreacion;
    }

    getFechaCompletado(){
        return this.fechaCompletado;
    }

    setFechaCompletado(nuevaFecha){
         this.fechaCompletado = nuevaFecha;
    }

    getFechaEliminada(){
        return this.fechaEliminada;
    }

    setFechaEliminada(nuevaFecha){
        this.fechaEliminada = nuevaFecha;
    }


    marcarComoCompleta(){
        this.setEstadoAnterior(this.getEstado());
        this.setEstado("completa");
        this.setFechaCompletado(new Date());
    }

    marcarComoEliminada(){
        this.setEstadoAnterior(this.getEstado());
        this.setEstado("eliminada");
        this.setFechaEliminada(new Date());
    }

    marcarComoIncompleta(){   //recuperar una tarea Eliminada
        this.setEstadoAnterior(this.getEstado());
        this.setEstado("incompleta");
        this.setFechaEliminada(null);
    }
}

const buscarTarea = (id) => {
    return tareas.find( el => el.id == id);
}

const eliminarTarea = (id) => {
  let posicion = tareas.findIndex( el => el.id == id);
  tareas.splice(posicion,1);
}

const $templateTareaIncompleta = document.getElementById("template").content,
    $listaIncompleta = document.getElementById("listaIncompleta"),
    $listaCompleta = document.getElementById("listaCompleta"),
    $listaEliminadas = document.getElementById("listaEliminadas");

const tareas = [];    

let $li,identificador = 1,
    cantidadTareasEliminadas = 0,
    $contadorTareasEliminadas = document.querySelector(".totalTareasEliminadas");



let $formulario = document.getElementById("formulario");

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
    
    
    let $btnCompleta = $li.querySelector(".completa");
    $btnCompleta.setAttribute("data-id",identificador);
    $btnCompleta.classList.remove("noMostrar");
    // Agrego evento para completar una tarea
    $btnCompleta.addEventListener("click", (e) => {
    
        if (e.target.matches("img")){        
            let identificadorTarea = e.target.getAttribute("data-id"),
            $liACompletar = document.getElementById(identificadorTarea);
            let tarea = buscarTarea(identificadorTarea);
            tarea.marcarComoCompleta();
            
            $liACompletar.remove();
            $liACompletar.querySelector(".completa").classList.add("noMostrar");
            $liACompletar.querySelector(".recuperar").classList.add("noMostrar");
            $liACompletar.querySelector(".desMarcar").classList.remove("noMostrar");
            $liACompletar.querySelector(".descartar").classList.add("noMostrar");
            $liACompletar.querySelector(".editar").classList.add("noMostrar");
            $liACompletar.classList.add("tareaCompleta");    
            $listaCompleta.appendChild($liACompletar); 
        } 
    });

    
    // Volvemos una tarea a incompleta
    let $btnDesMarcar = $li.querySelector(".desMarcar");
    $btnDesMarcar.setAttribute("data-id",identificador);
    $btnDesMarcar.classList.add("noMostrar");

    $btnDesMarcar.addEventListener("click", (e) => {
    
        if (e.target.matches("img")){        
            let identificadorTarea = e.target.getAttribute("data-id"),
               $liACompletar = document.getElementById(identificadorTarea);

            let tarea = buscarTarea(identificadorTarea);
            tarea.marcarComoIncompleta();

            $liACompletar.remove();
        
            
            $liACompletar.querySelector(".completa").classList.remove("noMostrar");
            $liACompletar.querySelector(".desMarcar").classList.add("noMostrar");
            $liACompletar.querySelector(".descartar").classList.add("noMostrar");
            $liACompletar.querySelector(".editar").classList.remove("noMostrar");
            
            $liACompletar.classList.remove("tareaCompleta"); 
            $liACompletar.classList.add("tareaIncompleta"); 
          
            $listaIncompleta.appendChild($liACompletar); 
        } 
    });





    //Eliminamamos una tarea

    let $btnEliminar = $li.querySelector(".eliminar");
    $btnEliminar.setAttribute("data-id",identificador);
    $btnEliminar.addEventListener("click", (e) => {
    
        if (e.target.matches("img")){        
            let identificadorTarea = e.target.getAttribute("data-id"),
               $liAEliminar = document.getElementById(identificadorTarea);
        
            let tarea = buscarTarea(identificadorTarea);
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
            
            cantidadTareasEliminadas++;
            if (cantidadTareasEliminadas ===1){
                $contadorTareasEliminadas.removeAttribute("hidden");
                document.querySelector(".cestoBasura").removeAttribute("hidden");
            }
            
            if (cantidadTareasEliminadas >= 9) {
                $contadorTareasEliminadas.innerHTML = `9+`;
            } else {
                $contadorTareasEliminadas.innerText = cantidadTareasEliminadas;
            }
            
        //   $listaEliminadas.appendChild($liAEliminar); 
        } 
    });

     let $btnEditar = $li.querySelector(".editar");
     $btnEditar.setAttribute("data-id",identificador);
     //Editamos una tarea incompleta
     $btnEditar.addEventListener("click", (e) => {
        let identificadorTarea = e.target.getAttribute("data-id"),
        $liARecuperar = document.getElementById(identificadorTarea);


        $liARecuperar.querySelector(".completa").classList.add("noMostrar");
        $liARecuperar.querySelector(".desMarcar").classList.add("noMostrar");
        $liARecuperar.querySelector(".eliminar").classList.add("noMostrar");
        $liARecuperar.querySelector(".recuperar").classList.add("noMostrar");
        $liARecuperar.querySelector(".descartar").classList.add("noMostrar");
        $liARecuperar.querySelector(".editar").classList.add("noMostrar");

        let $texto = $liARecuperar.querySelector(".text")
        $texto.classList.add("noMostrar");
        let textAEditar = $texto.innerText,
            $contenedorOpciones = $liARecuperar.querySelector(".contenedorOpciones"),
            $inputEditor = $contenedorOpciones.children[0],
            $btnOk = $contenedorOpciones.children[1],
            $btnCancel = $contenedorOpciones.children[2];

        $inputEditor.removeAttribute("hidden");
        $btnOk.removeAttribute("hidden");
        $btnCancel.removeAttribute("hidden");
        $btnOk.classList.remove("noMostrar") ;
        $btnCancel.classList.remove("noMostrar");
        $inputEditor.classList.remove("noMostrar");
        $inputEditor.value = textAEditar;


        $btnOk.addEventListener("click",()=>{
            let tarea = buscarTarea(identificadorTarea);
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

     });

    $listaIncompleta.appendChild($li);
    identificador++;
});

let $cestoBasura = document.querySelector(".cestoBasura");
let $modal = document.querySelector(".modal");

$cestoBasura.addEventListener("click",(e)=>{

    $modal.classList.remove("noMostrar");
    let tareasEliminadas = tareas.filter(el => el.getEstado() === "eliminada"),
    $fragment = document.createDocumentFragment();
    console.log(tareasEliminadas);
    $listaEliminadas.innerHTML="";

    tareasEliminadas.forEach(el =>{
        $li = document.importNode($templateTareaIncompleta,true); 
            $li.querySelector("li").setAttribute("id",el.getId());
            $li.querySelector(".text").innerText = el.getTarea();
            $li.querySelector(".completa").classList.add("noMostrar");
            $li.querySelector(".completa").setAttribute("data-id",el.getId());
            $li.querySelector(".desMarcar").classList.add("noMostrar");
            $li.querySelector(".desMarcar").setAttribute("data-id",el.getId());
            $li.querySelector(".eliminar").classList.add("noMostrar");
            $li.querySelector(".eliminar").setAttribute("data-id",el.getId());
            $li.querySelector(".descartar").classList.remove("noMostrar");
            $li.querySelector(".descartar").setAttribute("data-id",el.getId());
            $li.querySelector(".recuperar").classList.remove("noMostrar");
            $li.querySelector(".recuperar").setAttribute("data-id",el.getId());
            // $li.querySelector(".descartar").classList.remove("noMostrar");
            $li.querySelector(".editar").classList.add("noMostrar");
            $li.querySelector(".editar").setAttribute("data-id",el.getId());
            $li.querySelector("li").classList.add("tareaEliminada"); 


            $li.querySelector(".recuperar").addEventListener("click",(e)=>{
                let identificadorTarea = e.target.getAttribute("data-id"),
                $tareaRecuperar = document.getElementById(identificadorTarea);

                let tarea = buscarTarea(identificadorTarea);
                $tareaRecuperar.remove();

            
                if (tarea.getEstadoAnterior() === "completa") {
                    tarea.marcarComoCompleta();
                    $tareaRecuperar.querySelector(".completa").classList.add("noMostrar");
                    $tareaRecuperar.querySelector(".desMarcar").classList.remove("noMostrar");
                    $tareaRecuperar.querySelector(".eliminar").classList.remove("noMostrar");
                    $tareaRecuperar.querySelector(".recuperar").classList.add("noMostrar");
                    $tareaRecuperar.querySelector(".descartar").classList.add("noMostrar");
                    $tareaRecuperar.querySelector(".editar").classList.add("noMostrar");
                    $tareaRecuperar.classList.remove("tareaEliminada"); 
                    $tareaRecuperar.classList.add("tareaCompleta"); 
                    $listaCompleta.appendChild($tareaRecuperar);
                }else if (tarea.getEstadoAnterior() === "incompleta") {
                    tarea.marcarComoIncompleta();
                    $tareaRecuperar.querySelector(".completa").classList.remove("noMostrar");
                    $tareaRecuperar.querySelector(".desMarcar").classList.add("noMostrar");
                    $tareaRecuperar.querySelector(".eliminar").classList.remove("noMostrar");
                    $tareaRecuperar.querySelector(".recuperar").classList.add("noMostrar");
                    $tareaRecuperar.querySelector(".descartar").classList.add("noMostrar");
                    $tareaRecuperar.querySelector(".editar").classList.remove("noMostrar");
                    $tareaRecuperar.classList.remove("tareaEliminada"); 
                    $tareaRecuperar.classList.add("tareaIncompleta"); 
                    $listaIncompleta.appendChild($tareaRecuperar);
            
                }

                cantidadTareasEliminadas--;
                if (cantidadTareasEliminadas === 0) {
                    $contadorTareasEliminadas.setAttribute("hidden",true);                
                    document.querySelector(".cestoBasura").setAttribute("hidden",true);
                }else if(cantidadTareasEliminadas<9) {
                    $contadorTareasEliminadas.innerText = cantidadTareasEliminadas;
                }

                //HAcemos qyue vuelvan a tener el escuchador ya que son nuevos elementos.
                //marcar como incompleta una tarea.
                $tareaRecuperar.querySelector(".desMarcar").addEventListener("click", (e) => {
    
                    if (e.target.matches("img")){        
                        let identificadorTarea = e.target.getAttribute("data-id"),
                           $liACompletar = document.getElementById(identificadorTarea);
            
                        let tarea = buscarTarea(identificadorTarea);
                        tarea.marcarComoIncompleta();
            
                        $liACompletar.remove();
                    
                        
                        $liACompletar.querySelector(".completa").classList.remove("noMostrar");
                        $liACompletar.querySelector(".desMarcar").classList.add("noMostrar");
                        $liACompletar.querySelector(".descartar").classList.add("noMostrar");
                        $liACompletar.querySelector(".editar").classList.remove("noMostrar");
                        
                        $liACompletar.classList.remove("tareaCompleta"); 
                        $liACompletar.classList.add("tareaIncompleta"); 
                      
                        $listaIncompleta.appendChild($liACompletar); 
                    } 
                });

                //marcar como completa una tarea
                $tareaRecuperar.querySelector(".completa").addEventListener("click", (e) => {
    
                    if (e.target.matches("img")){        
                        let identificadorTarea = e.target.getAttribute("data-id"),
                        $liACompletar = document.getElementById(identificadorTarea);
                        let tarea = buscarTarea(identificadorTarea);
                        tarea.marcarComoCompleta();
                        
                        $liACompletar.remove();
                        $liACompletar.querySelector(".completa").classList.add("noMostrar");
                        $liACompletar.querySelector(".recuperar").classList.add("noMostrar");
                        $liACompletar.querySelector(".desMarcar").classList.remove("noMostrar");
                        $liACompletar.querySelector(".descartar").classList.add("noMostrar");
                        $liACompletar.querySelector(".editar").classList.add("noMostrar");
                        $liACompletar.classList.add("tareaCompleta");    
                        $listaCompleta.appendChild($liACompletar); 
                    } 
                });

                //marcamos como eliminada una tarea
                $tareaRecuperar.querySelector(".eliminar").addEventListener("click", (e) => {
    
                    if (e.target.matches("img")){        
                        let identificadorTarea = e.target.getAttribute("data-id"),
                           $liAEliminar = document.getElementById(identificadorTarea);
                    
                        let tarea = buscarTarea(identificadorTarea);
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
                        
                        cantidadTareasEliminadas++;
                        if (cantidadTareasEliminadas ===1){
                            $contadorTareasEliminadas.removeAttribute("hidden");
                            document.querySelector(".cestoBasura").removeAttribute("hidden");
                        }
                        
                        if (cantidadTareasEliminadas >= 9) {
                            $contadorTareasEliminadas.innerHTML = `9+`;
                        } else {
                            $contadorTareasEliminadas.innerText = cantidadTareasEliminadas;
                        }
                        
                    //   $listaEliminadas.appendChild($liAEliminar); 
                    } 
                });
            
                //Editamos una tarea incompleta
                 $tareaRecuperar.querySelector(".editar").addEventListener("click", (e) => {
                    let identificadorTarea = e.target.getAttribute("data-id"),
                    $liARecuperar = document.getElementById(identificadorTarea);
            
            
                    $liARecuperar.querySelector(".completa").classList.add("noMostrar");
                    $liARecuperar.querySelector(".desMarcar").classList.add("noMostrar");
                    $liARecuperar.querySelector(".eliminar").classList.add("noMostrar");
                    $liARecuperar.querySelector(".recuperar").classList.add("noMostrar");
                    $liARecuperar.querySelector(".descartar").classList.add("noMostrar");
                    $liARecuperar.querySelector(".editar").classList.add("noMostrar");
            
                    let $texto = $liARecuperar.querySelector(".text")
                    $texto.classList.add("noMostrar");
                    let textAEditar = $texto.innerText,
                        $contenedorOpciones = $liARecuperar.querySelector(".contenedorOpciones"),
                        $inputEditor = $contenedorOpciones.children[0],
                        $btnOk = $contenedorOpciones.children[1],
                        $btnCancel = $contenedorOpciones.children[2];
            
                    $inputEditor.removeAttribute("hidden");
                    $btnOk.removeAttribute("hidden");
                    $btnCancel.removeAttribute("hidden");
                    $btnOk.classList.remove("noMostrar") ;
                    $btnCancel.classList.remove("noMostrar");
                    $inputEditor.classList.remove("noMostrar");
                    $inputEditor.value = textAEditar;
            
            
                    $btnOk.addEventListener("click",()=>{
                        let tarea = buscarTarea(identificadorTarea);
                        tarea.setTarea($inputEditor.value);
                        $texto.innerHTML = $inputEditor.value;
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
            
                 });
            });
            
            //Eliminar definitivamente una tarea
            $li.querySelector(".descartar").addEventListener("click",(e)=>{
                let identificadorTarea = e.target.getAttribute("data-id"),
                    $tareaEliminar = document.getElementById(identificadorTarea);
                $tareaEliminar.remove();    

                eliminarTarea(identificadorTarea);
                cantidadTareasEliminadas--;

                if (cantidadTareasEliminadas === 0) {
                    $contadorTareasEliminadas.setAttribute("hidden",true);
                    document.querySelector(".cestoBasura").setAttribute("hidden",true);
                }else if(cantidadTareasEliminadas<9) {
                    $contadorTareasEliminadas.innerText = cantidadTareasEliminadas;
                }

                
            });

            $fragment.appendChild($li);

      
    });
   
 $listaEliminadas.appendChild($fragment);














});


let $modalCancel = document.querySelector(".modal-header img");


$modalCancel.addEventListener("click",()=>{
        $modal.classList.add("noMostrar");
        ;
});


window.addEventListener('load', function() {
    console.log('La página ha terminado de cargarse!!');
});
