const { urls } = require("../data/url.data.js")
const pactum = require('pactum')
const { spec } = pactum

class UsuariosRequest {
    async postCriarUsuarioComSucesso() {
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        return await spec()
        .post(urls.urlApi.urlUsuarios)
        .withBody({
            "nome": "Nome de teste",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
    }

    async postCriarUsuarioComEmailDuplicado() {
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        // criando user base
        await spec()
        .post(urls.urlApi.urlUsuarios)
        .withBody({
            "nome": "Fulano da Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
        //user com email duplicado
        return await spec()
        .post(urls.urlApi.urlUsuarios)
        .withBody({
            "nome": "Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
    }

    async getUsuarioIdSucesso() {
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        // Criar user para buscar
        let userDel = await spec()
        .post(urls.urlApi.urlUsuarios)
        .withBody({
            "nome": "Fulano da Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
        userId = userDel.json._id;
        return await spec()
        .get('https://serverest.dev/usuarios/{id}')
        .withPathParams('id', userId)
    }

    async getUsuarioSucesso () {
        return await spec()
        .get(urls.urlApi.urlUsuarios)
    }

    async getUsuarioIdMenor () {
        return await spec()
        .get('https://serverest.dev/usuarios/1')
    }

    async getUsuarioIdMaior () {
        return await spec()
        .get('https://serverest.dev/usuarios/114c15d646f4r651efs3fcs')
    }

    async getUsuarioIdinexistente () {
        return await spec()
        .get('https://serverest.dev/usuarios/1vPnkrR63tiS1111')
    }

    async putAtualizarUsuarioSucesso(){
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        // Criar user para editar
        let userDel = await spec()
        .post(urls.urlApi.urlUsuarios)
        .withBody({
            "nome": "Fulano da Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
        userId = userDel.json._id;
        //Edita user
        return await spec()
        .put('https://serverest.dev/usuarios/{id}')
        .withPathParams('id', userId)
        .withBody({
            "nome": "Ron Pouros",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
    }

    async putAtualizarUsuarioEmailEmUso(){
         const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        const emailDois = faker.faker.internet.email();
        // Criar user para email em uso
        let userMail = await spec()
        .post(urls.urlApi.urlUsuarios)
        .withBody({
            "nome": "Fulano da Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
        // Criar user para editar
        let userEdit = await spec()
        .post(urls.urlApi.urlUsuarios)
        .withBody({
            "nome": "Fulano da Silva",
            "email": emailDois,
            "password": "teste",
            "administrador": "true"
        })
        userId = userEdit.json._id;
        //Edita user
        return await spec()
        .put('https://serverest.dev/usuarios/{id}')
        .withPathParams('id', userId)
        .withBody({
            "nome": "Ron Pouros",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
    }

    async delUsuarioSucesso(){
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        // Criar user para deletar
        let userDel = await spec()
        .post(urls.urlApi.urlUsuarios)
        .withBody({
            "nome": "Fulano da Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
        userId = userDel.json._id;
        // Deleta user
        return await spec()
        .delete('https://serverest.dev/usuarios/{id}')
        .withPathParams('id', userId)
    }

    async delUsuarioComCarrinho(){
        return await spec()
        .delete('https://serverest.dev/usuarios/qbMqntef4iTOwWfg')
    }

    async delUsuarioinexistente(){
        return await spec()
        .delete('https://serverest.dev/usuarios/qbMqntef4iTO1111')
    }
}

module.exports = new UsuariosRequest()