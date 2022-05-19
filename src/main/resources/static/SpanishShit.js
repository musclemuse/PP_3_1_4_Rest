//Definición de variables
const url = 'http://localhost:8080/api/users/'
const contenedor = document.querySelector('tbody')
let usersTable = ''

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')
const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const age = document.getElementById('age')
const username = document.getElementById('username')
const password = document.getElementById('password')
const role = document.getElementById('role')
var option = ''

btnCrear.addEventListener('click', ()=>{
    firstname.value = ''
    lastname.value = ''
    age.value = ''
    username.value = ''

    modalArticulo.show()
    option = 'crear'
})

//ТАБЛИЦА ПОЛЬЗОВАТЕЛЕЙ
const table = (users) => {
    users.forEach(user => {
        usersTable += `<tr>
                            <td>${user.id}</td>
                            <td>${user.firstname}</td>
                            <td>${user.lastname}</td>
                            <td>${user.age}</td>
                            <td>${user.username}</td>
                            <td>${user.role}</td>
                            <td><button class="btnEdit btn btn-info">Edit</button></td>
                           <td><button class="btnDelete btn btn-danger">Delete</button></td>
                            
                       </tr>
                    `
    })
    contenedor.innerHTML = usersTable

}

//Procedimiento Mostrar
fetch(url)
    .then( response => response.json() )
    .then( data => table(data) )
    .catch( error => console.log(error))


const on = (element, event, selector, handler) => {
    //console.log(element)
    //console.log(event)
    //console.log(selector)
    //console.log(handler)
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//УДАЛЕНИЕ
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    alertify.confirm("This is a confirm dialog.",
        function(){
            fetch(url+id, {
                method: 'DELETE'
            })
                .then( res => res.json() )
                .then( ()=> location.reload())
            //alertify.success('Ok')
        },
        function(){
            alertify.error('Cancel')
        })
})

//Procedimiento Editar
let idForm = 0
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const descripcionForm = fila.children[1].innerHTML
    const precioForm = fila.children[2].innerHTML
    const stockForm = fila.children[3].innerHTML
    firstname.value =  descripcionForm
    lastname.value =  precioForm
    age.value =  stockForm
    option = 'editar'
    modalArticulo.show()

})

//Procedimiento para Crear y Editar
formArticulo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(option=='crear'){
        //console.log('OPCION CREAR')
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                descripcion:firstname.value,
                precio:lastname.value,
                stock:age.value
            })
        })
            .then( response => response.json() )
            .then( data => {
                const nuevoArticulo = []
                nuevoArticulo.push(data)
                table(nuevoArticulo)
            })
    }
    if(option=='editar'){
        //console.log('OPCION EDITAR')
        fetch(url+idForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                descripcion:firstname.value,
                precio:lastname.value,
                stock:age.value
            })
        })
            .then( response => response.json() )
            .then( response => location.reload() )
    }
    modalArticulo.hide()
})