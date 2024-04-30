require('../models')

const request = require("supertest")
const app = require('../app')
const Product = require("../models/Product")

const BASE_URL = '/api/v1/cart'

let TOKEN
let userId
let productBody
let product

beforeAll(async () => {
    const user = {
        email:"yoneison@gmail.com",
        password:"yoneison1234"
    }

    const res = await request(app)
        .post('/api/v1/users/login')
        .send(user)

    TOKEN = res.body.token
    userId = res.body.user.id

    productBody = {
        title: 'iphone test',
        description: 'iphone description',
        price:100
    }

    product = await Product.create(productBody)

});

test("POST -> BASE_URL, should return statusCode 201 and res.body.quatity === cart.quantity", async () => {
    const cart = {
        quantity: 5,
        productId: product.id
    }

    const res = await request(app)
        .post(BASE_URL)
        .send(cart)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)

    
});

test("GET ALL -> BASE_URL, should return statusCode 200, and body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    await product.destroy()
});