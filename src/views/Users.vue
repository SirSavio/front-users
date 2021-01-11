<template>
    <div>
        <div class="container">
            <h1>Painel ADM</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Cargo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ processRole(user.role) }}</td>
                        <td>
                            <router-link
                                :to="{name: 'UserEdit', params: {id: user.id}}"
                                ><button class="btn btn-success mr-5">
                                    Editar
                                </button></router-link
                            >
                            -
                            <button
                                class="btn btn-danger"
                                @click="setUserId(user.id)"
                                data-bs-toggle="modal"
                                data-bs-target="#modalDelete"
                            >
                                Remover
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div
            class="modal fade"
            id="modalDelete"
            tabindex="-1"
            aria-labelledby="modalDelete"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalDelete">Apagar</h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" id="id" />
                        Você quer apagar o usuário?
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            @click="deleteUser()"
                            class="btn btn-danger"
                        >
                            Apagar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    created() {
        const req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };
        axios
            .get("http://localhost:8080/user", req)
            .then((result) => {
                this.users = result.data;
            })
            .catch((error) => {
                console.log(error.response);
            });
    },
    data() {
        return {
            users: [],
        };
    },
    methods: {
        processRole: function (value) {
            if (value == "a") return "Administrador";
            else return "Comum";
        },
        setUserId: function (userId) {
            document.getElementById("id").value = userId;
        },
        deleteUser: function () {
            const id = document.getElementById("id").value;

            const req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };

            axios
                .delete("http://localhost:8080/user/" + id, req)
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>

<style>
</style>