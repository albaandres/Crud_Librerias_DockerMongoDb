const uri = 'http://127.0.0.1:3000/api/libro';
let todos = [];

function getItems()  
{ 
    fetch("http://127.0.0.1:3000/api/libro/")
        .then(response => response.json())
        .then(data => {  _displayItems(data); })
        .catch(error => console.error('Unable to get items.', error));

}
 
function addItem() {
    
    const item = {        
        isbn: document.getElementById('iISBN').value.trim(),
        titulo: document.getElementById('Titulo').value.trim(),
        autor: document.getElementById('Autor').value.trim(),
        editorial: document.getElementById('Editorial').value.trim(),
        paginas: document.getElementById('Paginas').value.trim()
    };

   

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            
        })
        .catch(error => console.error('Error al añadir registro.', error));
}

function deleteItem(id) {

    const itemId = document.getElementById('iID').value;

    
    console.log("ID    "+`${uri}/${id}`)
    fetch(`${uri}/${itemId}`, {    
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Error al eliminar el registro.', error));
}

function displayEditForm(registro) {
    //Reecibo el registro que quiero editar
  
     document.getElementById('iID').value = registro._id;
    document.getElementById('iISBN').value = registro.isbn;
    document.getElementById('Titulo').value = registro.titulo;
    document.getElementById('Autor').value = registro.autor;
    document.getElementById('Editorial').value = registro.editorial;
    document.getElementById('Paginas').value = registro.paginas;
   // document.getElementById('editForm').style.display = 'block';

    


}

function updateItem() {
    const itemId = document.getElementById('iID').value;
    const item = {
        id: parseInt(itemId, 10),
        isbn: document.getElementById('iISBN').value.trim(),
        titulo: document.getElementById('Titulo').value.trim(),
        autor: document.getElementById('Autor').value.trim(),
        editorial: document.getElementById('Editorial').value.trim(),
        paginas: document.getElementById('Paginas').value.trim()
    };

    // Envia con el método PUT el registro a modificar en formato JSON
    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('No se actualiza el registro', error));

    closeInput();

    return false;
}

function closeInput() {
  //  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'Registro ' : 'Registros ';

    document.getElementById('pnr').innerText = `Nº de ${name} ${itemCount}`;
}

function _displayItems(data) {
    
    const tBody = document.getElementById('cuerpo');
    tBody.innerHTML = '';

   
    _displayCount(data.length);

    const button = document.createElement('button');
 
 for(let i=0;i<data.length;i++){

   
 }
    data.forEach(item => {
     
      
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
      //  editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

       // Otra forma mas estandar de llamar a una function y pasarle un  parameto
        // el parametro que pasa item  , tiene los datos de todo el registro del empleado
        editButton.addEventListener("click", function () { displayEditForm(item ) }, false);
/*
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
       // deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);
        // Me gusta mas utilizar eventos con addEventListener que atributos
        // Pasamos el id del registro a eliminar
        deleteButton.addEventListener("click", function () { deleteItem(item._id) }, false);
*/
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(item.isbn);
        td1.appendChild(textNode);
     
        let td2 = tr.insertCell(1);
        let textNode1 = document.createTextNode(item.titulo);
        td2.appendChild(textNode1);

        let td3 = tr.insertCell(2);
        let textNode2 = document.createTextNode(item.autor);
        td3.appendChild(textNode2);

        let td4 = tr.insertCell(3);
        let textNode3 = document.createTextNode(item.editorial);
        td4.appendChild(textNode3);

        let td5 = tr.insertCell(4);
        let textNode4 = document.createTextNode(item.paginas);
        td5.appendChild(textNode4);

        let td6 = tr.insertCell(5);
        td6.appendChild(editButton);

     /*   let td7 = tr.insertCell(6);
        td7.appendChild(deleteButton);*/
    });

    todos = data;
    //************************************************************************
    // Nada mas cargar el fichero js en memoria ejecuta este comando que viosualiza en una
    // table los resgsitros de empleados obtenidos desde le ApiRest
  // getItems();
}