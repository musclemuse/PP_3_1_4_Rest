const tableUser = document.querySelector('#usersTable')

fetch("http://localhost:8080/api/user/")
    .then(res => res.json())
    .then(user => {
        let selectedUser = `
            <tr>
                            <td>${user.id}</td>
                            <td>${user.firstname}</td>
                            <td>${user.lastname}</td>
                            <td>${user.age}</td>
                            <td>${user.username}</td>
                            <td>${getRoleForUser(user)}</td>
            </tr>`
        tableUser.innerHTML = selectedUser
    })

