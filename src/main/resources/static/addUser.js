const addNewUser = document.querySelector('#addNewUser')
const navUsersTab = document. querySelector('#newUser')

const addFirstname = document.querySelector('#AddFirstname')
const addLastname = document.querySelector('#AddLastname')
const passwordNew = document.querySelector('#AddPassword')
const usernameAdd = document.querySelector('#AddUsername')
const ageNew = document.querySelector('#AddAge')

addNewUser.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch("http://localhost:8080/api/users/",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({method: 'POST', headers: userFetchService.head, body: JSON.stringify(user)})


    // {
    //     'username': usernameAdd.value,
    //     'password': passwordNew.value,
    //     'firstName': addFirstname.value,
    //     'secondName': addLastname.value,
    //     'age': ageNew.value
    // }

    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            navUsersTab.click()
            showUser(res, usersTable)
            usernameAdd.value = ''
            passwordNew.value = ''
            addFirstname.value = ''
            addLastname.value = ''
            ageNew.value = ''
        })
})

// function getSelectValues(select) {
//     let result = [];
//     let options = select && select.options;
//     let opt;
//
//     for (let i=0, iLen=options.length; i<iLen; i++) {
//         opt = options[i];
//
//         if (opt.selected) {
//             result.push(opt.value);
//         }
//     }
//     return result;
// }