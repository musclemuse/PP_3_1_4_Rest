var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'), {
    keyboard: false
})
const inputRolesDelete = document.querySelector('#inputRoles-delete')
const postDeleteUser = document.querySelector('#postDeleteUser')
const idDelete = document.querySelector('#id-delete')
const emailDelete = document.querySelector('#email-delete')
const firstnameDelete = document.querySelector('#firstname-delete')
const lastnameDelete = document.querySelector('#lastname-delete')
const ageDelete = document.querySelector('#age-delete')

const eventButton = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }    })
}

eventButton(document, 'click', '#buttonDeleteModalOpen', e => {
    const parentTr = e.target.parentNode.parentNode
    const id = parentTr.firstElementChild.innerHTML
    addRolesForSelectById(inputRolesDelete, id)

    fetch(urlUser+id)
        .then(res => res.json())
        .then(user => {
            idDelete.value = user.id
            emailDelete.value = user.email
            firstnameDelete.value = user.firstname
            lastnameDelete.value = user.lastname
            ageDelete.value = user.age
        })

})

postDeleteUser.addEventListener('submit', (e) => {
    e.preventDefault()
    let id = idDelete.value
    fetch(urlUser + id,{
        method: 'DELETE'
    })
        .then(() => {
            deleteModal.hide()
            Array.from(usersTable.querySelectorAll('tr')).map(tr => {
                if (tr.firstElementChild.innerHTML == id) {
                    tr.parentNode.removeChild(tr)
                }
            })
        })
})