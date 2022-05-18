$(async function () {
    await getTableWithUsers();
    // getNewUserForm();
    // getDefaultModal();
    // addNewUser();
})


const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    // bodyAdd : async function(user) {return {'method': 'POST', 'headers': this.head, 'body': user}},
    findAllUsers: async () => await fetch('/api/users'),
    findOneUser: async (id) => await fetch(`/api/users/${id}`),
    addNewUser: async (user) => await fetch('/api/users', {
        method: 'POST',
        headers: userFetchService.head,
        body: JSON.stringify(user)
    }),
    updateUser: async (user, id) => await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: userFetchService.head,
        body: JSON.stringify(user)
    }),
    deleteUser: async (id) => await fetch(`/api/users/${id}`, {method: 'DELETE', headers: userFetchService.head})
}

async function getTableWithUsers() {
    let table = $('#mainTableWithUsers tbody');
    table.empty();

    await userFetchService.findAllUsers()
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
                           <td>${user.role}</td>
                           <td><button class="btnEdit btn btn-info" id="modal-edit">Edit</button></td>
                           <td><button class="btnDelete btn btn-danger" id="modal-delete" data-toggle="modal">Delete</button></td>
                        </tr>
                )`;
                table.append(tableFilling);
            })
        })


// обрабатываем нажатие на любую из кнопок edit или delete
// достаем из нее данные и отдаем модалке, которую к тому же открываем
    $("#mainTableWithUsers").find('button').on('click', (event) => {
        let defaultModal = $('#someDefaultModal');

        let targetButton = $(event.target);
        let buttonUserId = targetButton.attr('data-userid');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-userid', buttonUserId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}


async function getNewUserForm() {
    let button = $(`#SliderNewUserForm`);
    let form = $(`#defaultSomeForm`)
    button.on('click', () => {
        if (form.attr("data-hidden") === "true") {
            form.attr('data-hidden', 'false');
            form.show();
            button.text('Hide panel');
        } else {
            form.attr('data-hidden', 'true');
            form.hide();
            button.text('Show panel');
        }
    })
}


// что то деалем при открытии модалки и при закрытии
// основываясь на ее дата атрибутах
async function getDefaultModal() {
    $('#someDefaultModal').modal({
        keyboard: true,
        backdrop: "static",
        show: false
    }).on("show.bs.modal", (event) => {
        let thisModal = $(event.target);
        let userid = thisModal.attr('data-userid');
        let action = thisModal.attr('data-action');
        switch (action) {
            case 'edit':
                editUser(thisModal, userid);  //ЗАМЕНИТЬ НА EDITUSER
                break;
            case 'delete':
                deleteUser(thisModal, userid);
                break;
        }
    }).on("hidden.bs.modal", (e) => {
        let thisModal = $(e.target);
        thisModal.find('.modal-title').html('');
        thisModal.find('.modal-body').html('');
        thisModal.find('.modal-footer').html('');
    })
}


// редактируем юзера из модалки редактирования, забираем данные, отправляем
async function editUser(modal, id) {
    let preuser = await userFetchService.findOneUser(id);
    let user = preuser.json();

    modal.find('.modal-title').html('Edit user');

    let editButton = `<button  class="btn btn-outline-success" id="editButton">Edit</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group" id="modal-edit">
                <input type="text" class="form-control" id="id" name="id" value="${user.id}" disabled><br>
                <input class="form-control" type="text" id="firstname" value="${user.firstname}"><br>
                <input class="form-control" type="text" id="lastname" value="${user.lastname}"><br>
                <input class="form-control" id="age" type="number" value="${user.age}">
                <input class="form-control" type="text" id="username" value="${user.username}"><br>
                <input class="form-control" type="text" id="password" value="${user.password}"><br>
                <input class="form-control" type="text" id="role" value="${user.role}"><br>
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    $("#editButton").on('click', async () => {
        let id = modal.find("#id").val().trim();
        let firstname = modal.find("#firstname").val().trim();
        let lastname = modal.find("#lastname").val().trim();
        let age = modal.find("#age").val().trim();
        let username = modal.find("#username").val().trim();
        let password = modal.find("#password").val().trim();
        let role = modal.find("#role").val().trim();

        let data = {
            firstname: firstname,
            lastname: lastname,
            age: age,
            username: username,
            password: password,
            role: role
        }
        const response = await userFetchService.updateUser(data, id);

        if (response.ok) {
            getTableWithUsers();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}


// удаляем юзера из модалки удаления
async function deleteUser(modal, id) {
    await userFetchService.deleteUser(id);
    getTableWithUsers();
    modal.find('.modal-title').html('DELETE');
    modal.find('.modal-body').html('User was deleted');
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(closeButton);
}


async function addNewUser() {
    $('#addNewUserButton').click(async () => {
        let addUserForm = $('#defaultSomeForm')


        let firstname = addUserForm.find('#AddFirstname').val().trim();
        let lastname = addUserForm.find('#AddLastname').val().trim();
        let age = addUserForm.find('#AddAge').val().trim();
        let username = addUserForm.find('#AddUsername').val().trim();
        let password = addUserForm.find('#AddPassword').val().trim();
        let role = addUserForm.find('#AddRole').val().trim();

        let data = {
            firstname: firstname,
            lastname: lastname,
            age: age,
            username: username,
            password: password,
            role: role
        }
        const response = await userFetchService.addNewUser(data);
        if (response.ok) {
            getTableWithUsers();
            addUserForm.find('#AddFirstname').val('');
            addUserForm.find('#AddLastname').val('');
            addUserForm.find('#AddAge').val('');
            addUserForm.find('#AddUsername').val('');
            addUserForm.find('#AddPassword').val('');
            addUserForm.find('#AddRole').val('');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addUserForm.prepend(alert)
        }
    })

}


////////////////Модальное окно удаления////////////////////////////

const deleteModal = new bootstrap.Modal(document.getElementById('someDefaultModal'));
const idDeleteForm = document.getElementById('idDel')
const usernameDeleteForm = document.getElementById('usernameDel')
const surnameDeleteForm = document.getElementById('surnameDel')
const ageDeleteForm = document.getElementById('ageDel')
const emailDeleteForm = document.getElementById('emailDel')
const deleteForm = document.querySelector('.deleteFormModal')


on(document, 'click', '.btnDelete', e => {

    const parent = e.target.parentNode.parentNode
    id = parent.children[0].innerHTML;
    username = parent.children[1].innerHTML;
    surname = parent.children[2].innerHTML;
    age = parent.children[3].innerHTML;
    email = parent.children[4].innerHTML;


    idDeleteForm.value = id;
    usernameDeleteForm.value = username;
    surnameDeleteForm.value = surname;
    ageDeleteForm.value = age;
    emailDeleteForm.value = email;
    deleteModal.show()
})
/////////////////////////////////////сабмит формы удаления//////////////////
deleteForm.addEventListener('submit', e => {
    e.preventDefault()
    const urlDelete = `http://localhost:8080/api/users/${id}`
    fetch(urlDelete, {
        method: 'DELETE'

    })
        .then(res => fillUsersTable(res))

    deleteModal.hide()
})