$(async function () {
    await userTable();
    // getNewUserForm();
    getDefaultModal();
    // addNewUser();
})

const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    getAllUsers: async () => await fetch('/api/users'),
}


// ЗАПОЛНЕНИЕ ТАБЛИЦЫ ЮЗЕРОВ ---- !!!добавить РОЛИ

async function userTable() {
    let table = $('#usersTable tbody');
    table.empty();

    await userFetchService.getAllUsers()
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
                           <td><button class="btnEdit btn btn-info" id="modal-edit">Edit</button></td>
                           <td><button class="btnDelete btn btn-danger" id="deleteUser">Delete</button></td>
                        </tr>
                )`;
                table.append(tableFilling);
            })
        })

// обрабатываем нажатие на любую из кнопок edit или delete
// достаем из нее данные и отдаем модалке, которую к тому же открываем
    $("#usersTable").find('button').on('click', (event) => {
        let defaultModal = $('#someDefaultModal');

        let targetButton = $(event.target);
        let buttonUserId = targetButton.attr('data-userid');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-userid', buttonUserId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })



}
//DELETE

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
                editUser(thisModal, userid);
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
