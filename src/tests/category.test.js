const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/categories'

let TOKEN
let categoryId

beforeAll(async () => {

    const user = {
        email:"yoneison@gmail.com",
        password:"yoneison1234"
    }

    const res = await request(app)
        .post(`/api/v1/users/login`)
        .send(user)

    console.log(res.body)
    TOKEN = res.body.token
});

test("POST -> BASE_URL should return statusCode 201, and res.body.name === category.name", async () => {
    const category = {
        name:"Tecno"
    }
    const res = await request(app)
        .post(BASE_URL)
        .send(category)
        .set('Authorization', `Bearer ${TOKEN}`)

        categoryId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
})

test("GET -> BASE_URL, should return statusCode 200, and body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
        
});

test("DELETE -> BASE_URL/:id shouñld rreturn statusCode 204" , async () => {

    const res =await request(app)
        .delete(`${BASE_URL}/${categoryId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
});

