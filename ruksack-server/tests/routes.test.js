const request = require('supertest')
const app = require('../server')
describe('Post Endpoints', () => {
  it('should create a new event', async () => {
    const res = await request(app)
      .post('/events')
      .send({
        name: 'Summer Camp 2020',
        notes: 'Support Camp Old Indian',
      });
    expect(res.statusCode).toEqual(200)
    expect(res.body.event.id).toEqual(1)
    expect(res.body.event.name).toEqual('Summer Camp 2020')
    expect(res.body.event.notes).toEqual('Support Camp Old Indian')
  })
})