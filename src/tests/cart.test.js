require('../models')

const request = require("supertest")
const app = require('../app')
const Product = require("../models/Product")

const BASE_URL = '/api/v1/cart'

let TOKEN
let userId
let productBody
let product
let cart
let cartId

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
        price: 100
    }

    product = await Product.create(productBody)
});

test("POST -> BASE_URL, should return statusCode 201 and res.body.quatity === cart.quantity", async () => {
    cart = {
        quantity: 5,
        productId: product.id
    }

    const res = await request(app)
        .post(BASE_URL)
        .send(cart)
        .set("Authorization", `Bearer ${TOKEN}`)

    cartId = res.body.id

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

    
});

test("Get ONE -> BASE_URL/:id, should return statusCode 200 and res.body.quantity ===  cart.quantity", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${cartId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)

    
});

test("PUT -> BASE_URL/:id, -> should return statudCode 200, and res.body.quantity === bodyUpdate.quantity", async () => {
    
    const bodyUpdate = {
        quantity:1
    }
    const res = await request(app)
        .put(`${BASE_URL}/${cartId}`)
        .send(bodyUpdate)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(bodyUpdate.quantity)
});

test("DELETE, -> BASE_URL/:id should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${cartId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
    
    expect(res.statusCode).toBe(204)

    await product.destroy()
});