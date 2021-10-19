window.onload=function()
{
    cargaRegistrosBasedeDatos();
  

 bGrabar.addEventListener("click", grabar,false);
 bModificar.addEventListener("click", modificar,false); 
 bBorrar.addEventListener("click", borrar,false); 
 bSiguiente.addEventListener("click", siguiente,false); 
 bAnterior.addEventListener("click", anterior,false); 
 bTabla.addEventListener("click", imprimirentabla,false); 
}
var datos = new Array();





        //////////////////////////////////// G R A B A R //////////////////////////////////
        function grabar() {
            addItem() 
        }
        
        //////////////////////////////////// G R A B A R //////////////////////////////////

     //////////////////////////////////// modificar //////////////////////////////////
     function modificar() {

        updateItem();
       
     }

     
    //////////////////////////////////// modificar //////////////////////////////////

    //////////////////////////////////// borrar //////////////////////////////////
    function borrar(){
        deleteItem( document.getElementById('iID').value)
    }
    
    
        function siguiente() {
       
            
        }
        function anterior() {
         
            
        }
        
        
        function cargaRegistrosBasedeDatos() {

            getItems()  
            
        }
        function imprimirentabla()
        {
            cargaRegistrosBasedeDatos()

        }