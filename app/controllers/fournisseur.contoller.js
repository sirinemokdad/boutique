const Customer = require("../models/fournisseur.model.js");

// Create and Save a new fournisseur
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Fournisseur
    const fournisseur = new Fournisseur({
        email: req.body.email,
        telephone: req.body.telephone,
        nom: req.body.nom,
        active: req.body.active
    });

    // Save Fournisseu in the database
    Fournisseur.create(fournisseur, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Fournisseur."
            });
        else res.send(data);
    });
};

// Retrieve all Fournisseurs from the database.
exports.findAll = (req, res) => {
    Fournisseur.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving fournisseur."
            });
        else res.send(data);
    });
};

// Find a single Fournisseur with a FournisseurId
exports.findOne = (req, res) => {
    Fournisseur.findById(req.params.fournisseurId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found fournisseur with id ${req.params.fournisseurId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving fournisseur with id " + req.params.fournisseurId
                });
            }
        } else res.send(data);
    });
};

// Update a Fournisseur identified by the FournisseurId in the request
exports.update = (req, res) => {
// Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Fournisseur.updateById(
        req.params.fournisseurId,
        new Fournisseur(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found fournisseur with id ${req.params.fournisseurId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating fournisseur with id " + req.params.fournisseurId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Fournisseur with the specified FournisseurId in the request
exports.delete = (req, res) => {
    Fournisseur.remove(req.params.fournisseurId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Fournisseur with id ${req.params.fournisseurId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Fournisseur with id " + req.params.fournisseurId
                });
            }
        } else res.send({ message: `Fournisseur was deleted successfully!` });
    });
};

// Delete all Fournisseurs from the database.
exports.deleteAll = (req, res) => {
    Fournisseur.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all fournisseur."
            });
        else res.send({ message: `All fournisseurs were deleted successfully!` });
    });
};