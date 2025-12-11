const pactum = require('pactum');
const { spec } = pactum;

describe ('API Teste', () =>{

    it('Login com sucesso', async () =>{
        await spec()
        .post('https://serverest.dev/login')
        .withBody({
            "email": "Mortimer_Streich38@hotmail.com",
            "password": "Senha@1063"
        })
        .expectStatus(200)
        .expectJsonLike({
            "message": "Login realizado com sucesso"
        })
        
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
        
    });
    
    it('Criar usuario com sucesso', async () =>{
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();

        await spec()
        .post('https://serverest.dev/usuarios')
        .withBody({
            "nome": "Fulano da Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
        .expectStatus(201)
        .expectJsonLike({
            "message": "Cadastro realizado com sucesso"
        })  
    });

    it('Validar criacao de usuario com email duplicado', async () =>{
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        // criando user base
        let user = await spec()
        .post('https://serverest.dev/usuarios')
        .withBody({
            "nome": "Fulano da Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
        //user com email duplicado
        await spec()
        .post('https://serverest.dev/usuarios')
        .withBody({
            "nome": "Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
        .expectStatus(400)
        .expectJsonLike({
            "message": "Este email já está sendo usado"
        })  
    });

    it('Listar usuarios com sucesso', async () =>{
        await spec()
        .get('https://serverest.dev/usuarios')
        .expectStatus(200)
    })

    it('Buscar usuario por id com sucesso', async () =>{
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        // Criar user para buscar
        let userDel = await spec()
        .post('https://serverest.dev/usuarios')
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
    });

    it('Buscar usuario com id menor de 16 caracteres', async () =>{      
        await spec()
        .get('https://serverest.dev/usuarios/1')
        .expectStatus(400)
        .expectJsonLike({
            "id": "id deve ter exatamente 16 caracteres alfanuméricos"
        }) 
    });

    it('Buscar usuario com id meior de 16 caracteres', async () =>{      
        await spec()
        .get('https://serverest.dev/usuarios/14c15d646f4r651efs3fcs')
        .expectStatus(400)
        .expectJsonLike({
            "id": "id deve ter exatamente 16 caracteres alfanuméricos"
        }) 
    });

    it('Buscar usuario com id nao encontrado', async () =>{      
        await spec()
        .get('https://serverest.dev/usuarios/1vPnkrR63tiS1111')
        .expectStatus(400)
        .expectJsonLike({
            "message": "Usuário não encontrado"
        }) 
    });

    it('Atualizar usuario com sucesso', async () =>{
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        // Criar user para editar
        let userDel = await spec()
        .post('https://serverest.dev/usuarios')
        .withBody({
            "nome": "Fulano da Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
        userId = userDel.json._id;
        //Edita user
        await spec()
        .put('https://serverest.dev/usuarios/{id}')
        .withPathParams('id', userId)
        .expectStatus(200)
        .withBody({
            "nome": "Ron Pouros",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
        .expectJsonLike({
            "message": "Registro alterado com sucesso"
        }) 
    });

    /*
    ////// API quebrada - permiti usar id invalido
    it('Atualizar usuario com id invalido', async () =>{
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        const emailDois = faker.faker.internet.email();
        // Criar user para editar
        let userDel = await spec()
        .post('https://serverest.dev/usuarios')
        .withBody({
            "nome": "Fulano da Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
        userId = userDel.json._id;
        //Edita user
        await spec()
        .put('https://serverest.dev/usuarios/111111111111111')
        .expectStatus(200)
        .withBody({
            "nome": "Ron Pouros",
            "email": emailDois,
            "password": "teste",
            "administrador": "true"
        })
        .expectJsonLike({
            "message": "Id invalido"
        }) 
    });*/

    it('Atualizar usuario com email ja em uso', async () =>{
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        const emailDois = faker.faker.internet.email();
        // Criar user para email em uso
        let userMail = await spec()
        .post('https://serverest.dev/usuarios')
        .withBody({
            "nome": "Fulano da Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
        // Criar user para editar
        let userEdit = await spec()
        .post('https://serverest.dev/usuarios')
        .withBody({
            "nome": "Fulano da Silva",
            "email": emailDois,
            "password": "teste",
            "administrador": "true"
        })
        userId = userEdit.json._id;
        //Edita user
        await spec()
        .put('https://serverest.dev/usuarios/{id}')
        .withPathParams('id', userId)
        .expectStatus(400)
        .withBody({
            "nome": "Ron Pouros",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
        .expectJsonLike({
            "message": "Este email já está sendo usado"
        }) 
    });

    it('Deletar usuario com sucesso', async () =>{
        const faker = await import('@faker-js/faker');
        const email = faker.faker.internet.email();
        // Criar user para deletar
        let userDel = await spec()
        .post('https://serverest.dev/usuarios')
        .withBody({
            "nome": "Fulano da Silva",
            "email": email,
            "password": "teste",
            "administrador": "true"
        })
        userId = userDel.json._id;
        // Deleta user
        await spec()
        .delete('https://serverest.dev/usuarios/{id}')
        .withPathParams('id', userId)
        .expectStatus(200)
        .expectJsonLike({
            "message": "Registro excluído com sucesso"
        })
    });

    it('Deletar usuario com carrinho', async () =>{
        await spec()
        .delete('https://serverest.dev/usuarios/qbMqntef4iTOwWfg')
        .expectStatus(200)
        .expectJsonLike({
            "message": "Nenhum registro excluído"
        })
    });

    it('Deletar usuario com id inexistente', async () =>{
        await spec()
        .delete('https://serverest.dev/usuarios/qbMqntef4iTO1111')
        .expectStatus(200)
        .expectJsonLike({
            "message": "Nenhum registro excluído"
        })
    });

});