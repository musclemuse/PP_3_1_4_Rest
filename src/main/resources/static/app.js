// // ЗАПОЛНЕНИЕ ТАБЛИЦЫ ЮЗЕРОВ ---- !!!добавить РОЛИ
// $(async function () {
//     await getTableWithUsers();
//
// })

const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findAllUsers: async () => await fetch('http://localhost:8080/api/users/'),
    addNewUser: async (user) => await fetch('api/users', {method: 'POST', headers: userFetchService.head, body: JSON.stringify({

            'firstname': addFirstname.value,
            'lastname': addLastname.value,
            'age': addAge.value,
            'password': addPassword.value,
            'username': addUsername.value,
            // 'role': role.value
        })})
    }


function getTableWithUsers() {
let table = $('#usersTable tbody');
     userFetchService.findAllUsers()
        .then(res => res.json())
        .then(users => {

            users.forEach(user => {
                let tableFilling = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.firstname}</td>
                            <td>${user.lastname}</td>
                            <td>${user.age}</td>
                            <td>${user.username}</td>
                            <td> ${user.role} </td> 
                           <td><button id="buttonEditModalOpen" data-bs-target="#editModal" class="btnEdit btn btn-info" data-bs-toggle="modal" >Edit</button></td>
                           <td><button id="deleteModalOpen" data-bs-target="#deleteModal" class="btnDelete btn btn-danger" id="deleteUser">Delete</button></td>
                        </tr>
                )`;
                table.append(tableFilling);
            })
        })

}

getTableWithUsers()



// fetch("http://localhost:8080/api/users/")
//     .then(res => res.json())
//     .then(users => {
//         users.forEach(user => {
//             showUser(user, usersTable)
//         })
//     })


// let usersTable = document.querySelector('#usersTable')
//
// function showUser(user, tableFilling) {
//     let tr = null
//     let td = null
//     tr = document.createElement('tr')
//     td = document.createElement('td')
//     td.textContent = user.id
//     tr.append(td)
//     td = document.createElement('td')
//     td.textContent = user.firstname
//     tr.append(td)
//     td = document.createElement('td')
//     td.textContent = user.lastname
//     tr.append(td)
//     td = document.createElement('td')
//     td.textContent = user.age
//     tr.append(td)
//     td = document.createElement('td')
//     td.textContent = user.username
//     tr.append(td)
//     td = document.createElement('td')
//     td.textContent = "need_to_add_role"
//     tr.append(td)
//     td = document.createElement('td')
//     td.innerHTML += `
//             <button id="buttonEditModalOpen" data-bs-target="#editModal" class="btnEdit btn btn-info" data-bs-toggle="modal" >Edit</button>
//     `
//     tr.append(td)
//     td = document.createElement('td')
//     td.innerHTML += `
//             <button id="deleteModalOpen" data-bs-target="#deleteModal" class="btnDelete btn btn-danger" id="deleteUser">Delete</button>
//     `
//     tr.append(td)
//
//     tableFilling.append(tr)
// }
//
// fetch("http://localhost:8080/api/users/")
//     .then(res => res.json())
//     .then(users => {
//         users.forEach(user => {
//             showUser(user, usersTable)
//         })
//     })

