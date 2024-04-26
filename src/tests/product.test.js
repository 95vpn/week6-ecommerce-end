require('../models')
const request = require("supertest")
const app = require('../app')
const Category = require("../models/Category")

const BASE_URL = '/api/v1/products'

let category
let TOKEN
let productId
let product

beforeAll(async () => {
    const user = {
        email:"yoneison@gmail.com",
        password:"yoneison1234"
    }
    const res = await request(app)
        .post(`/api/v1/users/login`)
        .send(user)
    
        TOKEN = res.body.token

   category = await Category.create({ name:'tecno' })
});



test("POST -> BASE_URL should return statusCode 201, and res.body.title === category.title", async () => {
    const product = {
        title:"celular",
        description:"iphone 15",
        price:890,
        categoryId:category.id
    }



    const res = await request(app)
        .post(BASE_URL)
        .send(product)
        .set('Authorization', `Bearer ${TOKEN}`)

    productId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

    // await category.destroy()
});



test("GETALL -> BASE_URL should return statusCode 200, and res.body.length === 1 ", async () => {
    const res = await request(app)
        .get(BASE_URL)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    
});

test("GETONE -> BASE_URL/:id should return statusCode 200, and res.body ", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${productId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

    await category.destroy()
});