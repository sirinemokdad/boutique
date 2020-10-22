module.exports = app => {
    const fournisseur = require("../controllers/fournisseur.contoller");

    // Create a new Fournisseur
    app.post("/fournisseur", fournisseur.create);

    // Retrieve all Fournisseurs
    app.get("/fournisseur", fournisseur.findAll);

    // Retrieve a single Fournisseur with customerId
    app.get("/fournisseur/:fournisseurId", fournisseur.findOne);

    // Update a Fournisseur with FournisseurId
    app.put("/fournisseur/:fournisseurId", fournisseur.update);

    // Delete a Fournisseur with FournisseurId
    app.delete("/fournisseur/:fournisseurId", fournisseur.delete);

    // Create a new Fournisseur
    app.delete("/fournisseur", fournisseur.deleteAll);
};