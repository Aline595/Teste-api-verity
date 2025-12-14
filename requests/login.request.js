const { urls } = require("../data/url.data.js")
const pactum = require('pactum')
const { spec } = pactum

class LoginRequest {
    async postLoginSucesso() {
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        const password = faker.faker.internet.password({ length: 8 });
        // Criar user para logar
        await spec()
        .post(urls.urlApi.urlUsuarios)
        .withBody({
            "nome": "Nome teste",
            "email": email,
            "password": password,
            "administrador": "true"
        })

        return await spec()
        .post(urls.urlApi.urlLogin)
        .withBody({
            "email": email,
            "password": password
        })
    }

    async postLoginEmailInvalido(){
        const faker = await import('@faker-js/faker');
        const password = faker.faker.internet.password({ length: 8 });
        return await spec()
        .post(urls.urlApi.urlLogin)
        .withBody({
            "email": "Email_invalido",
            "password": password
        })
    }

    async postLoginSenhaIncorreta () {
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        return await spec()
        .post(urls.urlApi.urlLogin)
        .withBody({
            "email": email,
            "password": "inv"
        })
    }

    async postLoginSenhaBranco () {
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        return await spec()
        .post(urls.urlApi.urlLogin)
        .withBody({
            "email": email,
            "password": ""
        })
    }
}

module.exports = new LoginRequest()