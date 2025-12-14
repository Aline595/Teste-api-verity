const pactum = require('pactum');
const faker = require('@faker-js/faker');
const { spec } = pactum;
const { postLoginEventSchema } = require("../schemas/login/postLogin.schema.js");

describe ('Testes de login', () =>{

    it('Login com sucesso', async () =>{
        const email = faker.faker.internet.email();

        // Criar user para logar
        await spec()
        .post('https://serverest.dev/usuarios')
        .withBody({
            "nome": "Fulano da Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })

        await spec()
        .post('https://serverest.dev/login')
        .withBody({
            "email": email,
            "password": "teste"
        })
        .expectStatus(200)
        .expectJsonLike({
            "message": "Login realizado com sucesso"
        })
        .expectJsonSchema(postLoginEventSchema.ok)
        
    });
    
    it('Login com email incorreto', async () =>{
        await spec()
        .post('https://serverest.dev/login')
        .withBody({
            "email": "Mortimer_Streich38",
            "password": "Senha@1063"
        })
        .expectStatus(400)
        .expectJsonLike({
            "email": "email deve ser um email válido"
        })
        .expectJsonSchema(postLoginEventSchema.badRequest400)
        
    });
    
    it('Login com senha incorreta', async () =>{
        await spec()
        .post('https://serverest.dev/login')
        .withBody({
            "email": "Mortimer_Streich38@hotmail.com",
            "password": "Senha@"
        })
        .expectStatus(401)
        .expectJsonLike({
            "message": "Email e/ou senha inválidos"
        })
        .expectJsonSchema(postLoginEventSchema.badRequest)
    });

});