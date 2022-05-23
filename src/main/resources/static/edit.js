let editModal = new bootstrap.Modal(document.getElementById('editModal'), {
    keyboard: false
})

let usersTable = document.querySelector('#usersTable')

// const inputRolesDelete = document.querySelector('#deleteRoles')
const submitEdit = document.querySelector('#submitEdit')

const idEdit = document.querySelector('#idEdit')
const firstNameEdit = document.querySelector('#firstnameEdit')
const lastnameEdit = document.querySelector('#lastnameEdit')
const ageEdit = document.querySelector('#ageEdit')
const usernameEdit = document.querySelector('#usernameEdit')
const passwordEdit = document.querySelector('#passwordEdit')



//
eventButton(document, 'click', '#editModalOpen', e => {
    // const parentTr = e.target.parentNode.parentNode
    // const id = parentTr.firstElementChild.innerHTML
    // addRolesForSelectById(inputRolesDelete, id)
    const parentTr = e.target.parentNode.parentNode
    const id = parentTr.firstElementChild.innerHTML

    fetch("http://localhost:8080/api/users/" + id)
        .then(res => res.json())
        .then(user => {
            idEdit.value = user.id
            firstNameEdit.value = user.firstname
            lastnameEdit.value = user.lastname
            ageEdit.value = user.age
            usernameEdit.value = user.username
            passwordEdit.value = user.password
        })

})

submitEdit.addEventListener('submit', (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    // let id = idEdit.value
    fetch("http://localhost:8080/api/users/" ,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Referer': null
        },
        body: JSON.stringify({
            'id': idEdit.value,
            'firstname': firstNameEdit.value,
            'lastname': lastnameEdit.value,
            'age': ageEdit.value,
            'username': usernameEdit.value,
            'password': passwordEdit.value

        })
    })
        .then(() => {
            editModal.hide()
            Array.from(usersTable.querySelectorAll('tr')).map(tr => {
                if (tr.firstElementChild.innerHTML == id) {
                    let currentNode = tr.firstChild
                    currentNode.textContent = idEdit.value
                    currentNode = currentNode.nextSibling
                    currentNode.textContent = firstNameEdit.value
                    currentNode = currentNode.nextSibling
                    currentNode.textContent = lastnameEdit.value
                    currentNode = currentNode.nextSibling
                    currentNode.textContent = ageEdit.value
                    currentNode = currentNode.nextSibling
                    currentNode.textContent = usernameEdit.value
                    // currentNode = currentNode.nextSibling
                    // getRoleForUserById(id, currentNode)
                }
            })
        })
})