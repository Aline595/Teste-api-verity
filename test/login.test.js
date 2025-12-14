const pactum = require('pactum');
const { spec } = pactum;
const { postLoginEventSchema } = require("../schemas/login/postLogin.schema.js");

describe ('Testes de login', () =>{

    it('Login com sucesso', async () =>{
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        const password = faker.faker.internet.password({ length: 8 });
        // Criar user para logar
        await spec()
        .post('https://serverest.dev/usuarios')
        .withBody({
            "nome": "Nome teste",
            "email": email,
            "password": password,
            "administrador": "true"
        })

        await spec()
        .post('https://serverest.dev/login')
        .withBody({
            "email": email,
            "password": password
        })
        .expectStatus(200)
        .expectJsonLike({
            "message": "Login realizado com sucesso"
        })
        .expectJsonSchema(postLoginEventSchema.ok)
        
    });
    
    it('Login com email incorreto', async () =>{
        const faker = await import('@faker-js/faker');
        const password = faker.faker.internet.password({ length: 8 });
        await spec()
        .post('https://serverest.dev/login')
        .withBody({
            "email": "Email_invalido",
            "password": password
        })
        .expectStatus(400)
        .expectJsonLike({
            "email": "email deve ser um email válido"
        })
        .expectJsonSchema(postLoginEventSchema.badRequest400)
        
    });
    
    it('Login com senha incorreta', async () =>{
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        
        await spec()
        .post('https://serverest.dev/login')
        .withBody({
            "email": email,
            "password": "inv"
        })
        .expectStatus(401)
        .expectJsonLike({
            "message": "Email e/ou senha inválidos"
        })
        .expectJsonSchema(postLoginEventSchema.badRequest)
    });

    it('Login com senha em branco', async () =>{
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        
        await spec()
        .post('https://serverest.dev/login')
        .withBody({
            "email": email,
            "password": ""
        })
        .expectStatus(400)
        .expectJsonLike({
            "password": "password não pode ficar em branco"
        })
        .expectJsonSchema(postLoginEventSchema.badRequestpassword)
    });

});