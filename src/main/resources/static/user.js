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
                            <td>${user.roles.map(role => role.name === 'ROLE_USER' ? ' USER' : ' ADMIN')}</td>
            </tr>`
        tableUser.innerHTML = selectedUser
    })

