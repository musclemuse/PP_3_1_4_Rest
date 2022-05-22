let deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'), {
    keyboard: false
})

const deleteUserForm = document.querySelector('#deleteModal')
// const inputRolesDelete = document.querySelector('#deleteRoles')
const postDeleteUser = document.querySelector('#postDeleteUser')
const idDelete = document.querySelector('#idDelete')
const firstNameDelete = document.querySelector('#firstnameDelete')
const lastnameDelete = document.querySelector('#lastnameDelete')
const ageDelete = document.querySelector('#ageDelete')
const usernameDelete = document.querySelector('#usernameDelete')
const passwordDelete = document.querySelector('#passwordDelete')


const eventButton = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}


//
eventButton(document, 'click', '#deleteModalOpen', e => {
    const parentTr = e.target.parentNode.parentNode
     const id = parentTr.firstElementChild.innerHTML
    // addRolesForSelectById(inputRolesDelete, id)

    fetch("http://localhost:8080/api/users/" + id)
        .then(res => res.json())
        .then(user => {
            // getTableWithUsers()
            idDelete.value = user.id
            usernameDelete.value = user.username
            firstNameDelete.value = user.firstname
            lastnameDelete.value = user.lastname
            ageDelete.value = user.age
        })

})

postDeleteUser.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let id = idDelete.value
    fetch("http://localhost:8080/api/users/" + id,{
        method: 'DELETE'
    })
        .then(() => {
            deleteModal.hide()
            Array.from(usersTable.querySelectorAll('tr')).map(tr => {
                if (tr.firstElementChild.innerHTML === id) {
                    tr.parentNode.removeChild(tr)
                }
            })
        })
})

// deleteUserForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     fetch('http://localhost:8080/api/users/' + id, {
//         method: 'DELETE'
//     })
//         .then(res => res.json())
//         .then(res => {
//             removeUser(currentUserId);
//             deleteUserForm.removeEventListener('submit', () => {
//             });
//             $("#deleteModal").ariaModal("hide")
//         })
// })