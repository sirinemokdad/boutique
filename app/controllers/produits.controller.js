const Produits  = require("../models/produits.model.js");

// Create and Save a new produit
exports.create = (req, res) => {
// Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a produit
    const produits = new Produits({
        ref: req.body.ref,
        name: req.body.name,
        quantite: req.body.quantite,
        prix: req.body.prix,
        promotion: req.body.promotion,
        disponible: req.body.disponible
    });

    // Save Customer in the database
    Produits.create(produits, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        else res.send(data);
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Produits.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Produits.findById(req.params.produitsId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found produits with id ${req.params.produitsId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving produits with id " + req.params.produitsId
                });
            }
        } else res.send(data);
    });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
// Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Produits.updateById(
        req.params.produitsId,
        new Customer(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found produits with id ${req.params.produitsId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating produits with id " + req.params.produitsId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Produits.remove(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found produits with id ${req.params.produitsId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.v
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Produits.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all produits."
            });
        else res.send({ message: `All Customers were deleted successfully!` });
    });
};