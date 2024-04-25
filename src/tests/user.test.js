const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/users'

let TOKEN
let userId

beforeAll(async () => {

    const user = {
        email:"yoneison@gmail.com",
        password:"yoneison1234"
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(user)

    console.log(res.body)
    TOKEN = res.body.token
});

test("GET -> BAE_URL, should return statusCode 200, and res.body.length === 1", async () => {
    const res = await request (app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});

test("POST -> BASE_URL should return 201, and res.body.firstName === user.firstName", async () => {
    const user = {
        firstName:"Mauricio",
        lastName:"Jaramillo",
        email:"mauricio@gmail.com",
        password:"mauricio1234",
        phone:"14864"
    }
    console.log(user)
    const res = await request(app)
        .post(BASE_URL)
        .send(user)

        userId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
});

test("PUT -> BASE_URL/:id, should return statusCode 200,  and res.body.firstName === bodyUpdate.firstName ", async () => {
    const bodyUpdate = {
        firstName:"Fabricio"
    }
    const res = await request (app)
        .put(`${BASE_URL}/${userId}`)
        .send(bodyUpdate)
        .set('Authorization', `Bearer ${TOKEN}`)

        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.firstName).toBe(bodyUpdate.firstName)
});

test("POST -> BASE_URL/:id, should return statusCode 200, and res.body.user.email === user.email, ans res.body.token === to be defined", async () => {
    const user = {
        email:"mauricio@gmail.com",
        password:"mauricio1234",
    }
    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(user)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.email).toBe(user.email)
    expect(res.body.token).toBeDefined()
});

test("POST BASE_URL/login should retur statusCode 401", async () => {
    const userInvalid = {
        email:"mauricio@gmail.com",
        password:"invalid password"
    }
    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(userInvalid)
    
    expect(res.statusCode).toBe(401)
});

test("DELETE, -> BASE_URL/:id should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
    
    expect(res.statusCode).toBe(204)
});