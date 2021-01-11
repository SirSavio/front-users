<template>
    <div class="container">
        <h1>Editar de Usuário</h1>
        <hr />
        <div v-if="error">
            <div
                class="alert alert-danger alert-dismissible fade show"
                role="alert"
            >
                {{ error }}
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
            </div>
        </div>
        <h4 class="mt-5">Nome</h4>
        <input
            class="form-control"
            type="text"
            name="name"
            placeholder="Nome do usuário"
            v-model="name"
        />
        <h4 class="mt-3">Email</h4>
        <input
            class="form-control"
            type="email"
            name="email"
            placeholder="email@rmail.com"
            v-model="email"
        />
        <hr />
        <button class="btn btn-success" @click="update()">Salvar</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            name: "",
            email: "",
            error: undefined,
            id: -1,
        };
    },
    methods: {
        update() {
            const req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };
            console.log(this.id)
            axios
                .put("http://localhost:8080/user", {
                    name: this.name,
                    email: this.email,
                    id: this.id,
                }, req)
                .then((result) => {
                    console.log(result);
                    this.$router.push({ name: "Users" });
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
    },
    created() {
        const req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };
        axios
            .get("http://localhost:8080/user/" + this.$route.params.id, req)
            .then((result) => {
                console.log(result.data);
                this.name = result.data.user.name;
                this.email = result.data.user.email;
                this.id = result.data.user.id;
            })
            .catch((err) => {
                console.log(err);
                this.$router.push({ name: "Users" });
            });
    },
};
</script>

<style>
</style>