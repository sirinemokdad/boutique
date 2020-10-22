module.exports = app => {
    const produits = require("../controllers/produits.controller.js");

    // Create a new produit
    app.post("/produit", produits.create);

    // Retrieve all Customers
    app.get("/produit", produits.findAll);

    // Retrieve a single Customer with customerId
    app.get("/produit/:produitsId", produits.findOne);

    // Update a Customer with customerId
    app.put("/produit/:produitsId", produits.update);

    // Delete a Customer with customerId
    app.delete("/produit/:produitsId", produits.delete);

    // Create a new Customer
    app.delete("/produit", produits.deleteAll);
};