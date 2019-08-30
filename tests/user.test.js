const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)

describe('GET /test', () => {
  it('Get the test end-point', async done => {
    const response = await request.get('/test')

    expect(response.status).toBe(200)
    expect(response.body).toBe('Test passed')
    done()
  })
})
