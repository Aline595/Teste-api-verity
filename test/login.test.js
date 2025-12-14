const { expect } = require("pactum")
const { postLoginEventSchema } = require("../schemas/login/postLogin.schema.js")
const loginRequest = require('../requests/login.request.js')

describe ('Testes de login', () =>{

    it('Login com sucesso', async () =>{

        responsePost = await loginRequest.postLoginSucesso()
        expect(responsePost).to.have.status(200)
        expect(responsePost).to.have.jsonSchema(postLoginEventSchema.ok)
        expect(responsePost).to.have.jsonLike({
            "message": "Login realizado com sucesso"
        })
    });
    
    it('Login com email incorreto', async () =>{
        responsePost = await loginRequest.postLoginEmailInvalido()
        expect(responsePost).to.have.status(400)
        expect(responsePost).to.have.jsonSchema(postLoginEventSchema.badRequest400)
        expect(responsePost).to.have.jsonLike({
            "email": "email deve ser um email válido"
        })
    });
    
    it('Login com senha incorreta', async () =>{
        responsePost = await loginRequest.postLoginSenhaIncorreta()
        expect(responsePost).to.have.status(401)
        expect(responsePost).to.have.jsonSchema(postLoginEventSchema.badRequest)
        expect(responsePost).to.have.jsonLike({
            "message": "Email e/ou senha inválidos"
        })
    });

    it('Login com senha em branco', async () =>{
        responsePost = await loginRequest.postLoginSenhaBranco()
        expect(responsePost).to.have.status(400)
        expect(responsePost).to.have.jsonSchema(postLoginEventSchema.badRequestpassword)
        expect(responsePost).to.have.jsonLike({
            "password": "password não pode ficar em branco"
        })
    });

});