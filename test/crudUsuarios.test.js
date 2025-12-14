const pactum = require('pactum');
const { expect } = require("pactum")
const { spec } = pactum;
const { deleteUsuariosEventSchema } = require("../schemas/crudUsuarios/deleteUsuarios.schema.js");
const { getUsuariosEventSchema } = require("../schemas/crudUsuarios/getUsuarios.schema.js");
const { getUsuariosIdEventSchema } = require("../schemas/crudUsuarios/getUsuariosId.schema.js");
const { postUsuariosEventSchema } = require("../schemas/crudUsuarios/postUsuarios.schema.js");
const { putUsuariosEventSchema } = require("../schemas/crudUsuarios/putUsuarios.schema.js");
const { urls } = require("../data/url.data.js");
const UsuariosRequest = require('../requests/usuarios.resquest.js');

describe ('CRUD Usuarios', () =>{
    
    it('Criar usuario com sucesso', async () =>{
        responsePost = await UsuariosRequest.postCriarUsuarioComSucesso()
        expect(responsePost).to.have.status(201)
        expect(responsePost).to.have.jsonSchema(postUsuariosEventSchema.ok)
        expect(responsePost).to.have.jsonLike({
            "message": "Cadastro realizado com sucesso"
        })
    });

    it('Validar criacao de usuario com email duplicado', async () =>{
       responsePost = await UsuariosRequest.postCriarUsuarioComEmailDuplicado()
        expect(responsePost).to.have.status(400)
        expect(responsePost).to.have.jsonSchema(postUsuariosEventSchema.badRequest)
        expect(responsePost).to.have.jsonLike({
            "message": "Este email já está sendo usado"
        })
    });

    it('Listar usuarios com sucesso', async () =>{
        responsePost = await UsuariosRequest.getUsuarioSucesso()
        expect(responsePost).to.have.status(200)
        expect(responsePost).to.have.jsonSchema(getUsuariosEventSchema.ok)
    })

    it('Buscar usuario por id com sucesso', async () =>{
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
        
        await spec()
        .get('https://serverest.dev/usuarios/{id}')
        .withPathParams('id', userId)
        .expectStatus(200)
        .expectJsonLike({
            nome: 'Fulano da Silva',
            email: email,
            password: 'teste',
            administrador: 'true'
        }) 
        .expectJsonSchema(getUsuariosIdEventSchema.ok)
    });

    it('Buscar usuario com id menor de 16 caracteres', async () =>{      
        responsePost = await UsuariosRequest.getUsuarioIdMenor()
        expect(responsePost).to.have.status(400)
        expect(responsePost).to.have.jsonSchema(getUsuariosIdEventSchema.badRequest400)
        expect(responsePost).to.have.jsonLike({
            "id": "id deve ter exatamente 16 caracteres alfanuméricos"
        })
    });

    it('Buscar usuario com id maior de 16 caracteres', async () =>{  
        responsePost = await UsuariosRequest.getUsuarioIdMaior()
        expect(responsePost).to.have.status(400)
        expect(responsePost).to.have.jsonSchema(getUsuariosIdEventSchema.badRequest400)
        expect(responsePost).to.have.jsonLike({
            "id": "id deve ter exatamente 16 caracteres alfanuméricos"
        })
    });

    it('Buscar usuario com id nao encontrado', async () =>{   
        responsePost = await UsuariosRequest.getUsuarioIdinexistente()
        expect(responsePost).to.have.status(400)
        expect(responsePost).to.have.jsonSchema(getUsuariosIdEventSchema.badRequest)
        expect(responsePost).to.have.jsonLike({
            "message": "Usuário não encontrado"
        })
    });

    it('Atualizar usuario com sucesso', async () =>{
        responsePost = await UsuariosRequest.putAtualizarUsuarioSucesso()
        expect(responsePost).to.have.status(200)
        expect(responsePost).to.have.jsonSchema(putUsuariosEventSchema.ok)
        expect(responsePost).to.have.jsonLike({
            "message": "Registro alterado com sucesso"
        })
    });

    it('Atualizar usuario com email ja em uso', async () =>{
        responsePost = await UsuariosRequest.putAtualizarUsuarioEmailEmUso()
        expect(responsePost).to.have.status(400)
        expect(responsePost).to.have.jsonSchema(putUsuariosEventSchema.badRequest200)
        expect(responsePost).to.have.jsonLike({
            "message": "Este email já está sendo usado"
        })
    });

    it('Deletar usuario com sucesso', async () =>{
        responsePost = await UsuariosRequest.delUsuarioSucesso()
        expect(responsePost).to.have.status(200)
        expect(responsePost).to.have.jsonSchema(deleteUsuariosEventSchema.ok)
        expect(responsePost).to.have.jsonLike({
           "message": "Registro excluído com sucesso"
        })
    });

    it('Deletar usuario com carrinho', async () =>{
        responsePost = await UsuariosRequest.delUsuarioComCarrinho()
        expect(responsePost).to.have.status(200)
        expect(responsePost).to.have.jsonSchema(deleteUsuariosEventSchema.badRequest200)
        expect(responsePost).to.have.jsonLike({
           "message": "Nenhum registro excluído"
        })
    });

    it('Deletar usuario com id inexistente', async () =>{
        responsePost = await UsuariosRequest.delUsuarioinexistente()
        expect(responsePost).to.have.status(200)
        expect(responsePost).to.have.jsonSchema(deleteUsuariosEventSchema.badRequest200)
        expect(responsePost).to.have.jsonLike({
           "message": "Nenhum registro excluído"
        })
    });

});