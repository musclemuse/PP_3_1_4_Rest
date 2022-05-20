const addNewUser = document.querySelector('#addNewUser')


const addFirstname = document.querySelector('#AddFirstname')
const addLastname = document.querySelector('#AddLastname')
const addPassword = document.querySelector('#AddPassword')
const addUsername = document.querySelector('#AddUsername')
const addAge = document.querySelector('#AddAge')

addNewUser.addEventListener('submit', () => {

    // e.preventDefault()
    userFetchService.addNewUser()
        .then(res => res.json())
        .then(() => {
            getTableWithUsers()
            addUsername.value = ''
            addPassword.value = ''
            addFirstname.value = ''
            addLastname.value = ''
            addAge.value = ''
            // addRole.value = ''
        })
})

