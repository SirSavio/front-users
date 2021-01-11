<template>
    <div class="container">
        <h1>Login</h1>
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
        <button class="btn btn-success" @click="Login()">Login</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            password: "",
            email: "",
            error: undefined, 
        };
    },
    methods: {
        Login() {
            axios
                .post("http://localhost:8080/login", {
                    password: this.password,
                    email: this.email,
                }).then((result) => {
                    localStorage.setItem('token', result.data.token)
                    this.$router.push({name: 'Home'})
                }).catch((error) => {
                    console.log(error.response)
                    this.error = error.response.data.message;
                });
        },
    },
};
</script>

<style>
</style>