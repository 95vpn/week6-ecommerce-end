const User = require('./User')
const Category = require('./Category')
const Product = require('./Product')
const Cart = require('./Cart')
const Purchase = require('./Purchase')
const ProductImg = require('./ProductImg')

Product.belongsTo(Category)
Category.hasMany(Product)

//CART -- USERID

Cart.belongsTo(User)
User.hasMany(Cart)

//Cart - ProductId
Cart.belongsTo(Product)
Product.hasMany(Cart)

//purchase -- userId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//purchase -- productId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)

//product iMG -> PRODUCTiD
ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)
