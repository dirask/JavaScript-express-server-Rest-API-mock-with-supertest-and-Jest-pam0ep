const supertest = require('supertest')

const createRequester = () => {
    // it is necessary to reload ../server module after mocks are defined
    const app = require('../server');
    return supertest(app);
};

describe('users api', () => {
    // always we want to use defined modules as initial state
    beforeEach(() => jest.resetModules());

    it('getting mocked module name', async () => {
        jest.doMock('../db', () => {
            // '../db' mock
            return {
                getUsers: () => ['mocked john', 'mocked ann', 'mocked matt']
            };
        });
        // we need to create requester after mock is defined
        const requester = createRequester();
        const users = await requester.get('/backend/users');
        expect(users.body[0]).toBe('mocked john');
        expect(users.body[1]).toBe('mocked ann');
        expect(users.body[2]).toBe('mocked matt');
    });
})