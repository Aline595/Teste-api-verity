import { faker } from '@faker-js/faker';

class PessoaFactory {

    static criarPessoa(overrides = {}) {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 8 }),
            administrador: 'true',
            ...overrides
        };
    }

}

export default PessoaFactory;
