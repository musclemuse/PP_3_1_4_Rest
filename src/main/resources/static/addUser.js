const addNewUser = document.querySelector('#addNewUser')
// const navUsersTab = document. querySelector('#home-tab')
const addFirstname = document.querySelector('#AddFirstname')
const addLastname = document.querySelector('#AddLastname')
const addPassword = document.querySelector('#AddPassword')
const addUsername = document.querySelector('#AddUsername')
const addAge = document.querySelector('#AddAge')
const addRoles = document.querySelector('#AddRoles')

addNewUser.addEventListener('submit', (e) => {
    // e.preventDefault()
    fetch("http://localhost:8080/api/users/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            'firstname': addFirstname.value,
            'lastname': addLastname.value,
            'age': addAge.value,
            'password': addPassword.value,
            'username': addUsername.value,
            roles: [
                addRoles.value
            ]
        })
    })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            // navUsersTab.click()
            getTableWithUsers()
            addUsername.value = ''
            addPassword.value = ''
            addFirstname.value = ''
            addLastname.value = ''
            addAge.value = ''
            addRoles.value = ''
        })
})

