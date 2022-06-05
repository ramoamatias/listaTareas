export class Tarea {

    constructor(tarea,id) {
        this.id = id;
        this.tarea = tarea;
        this.estado = 'incompleta';
        this.estadoAnterior = null;
        this.fechaCreacion = new Date();
        this.fechaEliminada = null;
        this.fechaCompletado = null;
        this.color = "#00b8ffd9";
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

    getColor () {
        return this.color;
    }
    
    setColor(nuevoColor) {
        this.color = nuevoColor;
    }
}