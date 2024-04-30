require('../models')

const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')
const Cart = require('../models/Cart')


const BASE_URL = '/api/v1/purchase'

let TOKEN
let userId
let cartBody
let cart

beforeAll(async() => {
    const user = {
        email:"yoneison@gmail.com",
        password:"yoneison1234"
    }

    const res = await request(app)
        .post('/api/v1/users/login')
        .send(user)

    TOKEN = res.body.token
    userId = res.body.user.id

    cartBody = {
        quantity: 10,
        userId: 3,
        productId: 1
    }

    cart = await Cart.create(cartBody);
    // console.log(product)

});

test("POST -> BASE_URL, should return statusCode 201 and res.body.quantity === purchases.quantity", async () => {
    const purchase = {
        quantity:5,
        cartId: cart.id
    }

    const res = await request(app)
        .post(BASE_URL)
        .send(purchase)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(purchase.quantity)

    await product.destroy()

});