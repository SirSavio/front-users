<template>
    <div class="container">
        <h1>Registro de Usuário</h1>
        <hr />
        <div v-if="error">
            <div
                class="alert alert-danger alert-dismissible fade show"
                role="alert"
            >
                {{error}}
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
        <h4 class="mt-3">Senha</h4>
        <input
            class="form-control mb-5"
            type="password"
            name="password"
            placeholder="Senha"
            v-model="password"
        />
        <hr />
        <button class="btn btn-success" @click="register()">Cadastrar</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            name: "",
            password: "",
            email: "",
            error: undefined, 
        };
    },
    methods: {
        register() {
            axios
                .post("http://localhost:8080/user", {
                    name: this.name,
                    password: this.password,
                    email: this.email,
                }).then((result) => {
                    console.log(result, 'deu certo')
                    this.$router.push({name: 'Home'})
                }).catch((error) => {
                    console.log('deu erro')
                    this.error = error.response.data.error;
                });
        },
    },
};
</script>

<style>
</style>