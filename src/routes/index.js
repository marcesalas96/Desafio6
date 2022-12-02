const express = require("express")
const { Router } = express
const router = Router()
const ProductControler = require("../controllers/ProductControler")
const productClass = new ProductControler()

router.get("/", productClass.getAll)
router.get("/:id", productClass.getById)
router.post("/", productClass.addProduct)
router.put("/:id", productClass.updateProduct)
router.delete("/:id", productClass.deleteById)

module.exports = router
