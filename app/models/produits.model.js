const sql = require("./db.js");

// constructor
const Produits = function(produits) {
    this.ref = produits.ref;
    this.name = produits.name;
    this.quantite = produits.quantite;
    this.prix = produits.prix;
    this.promotion = produits.promotion;
    this.disponible = produits.disponible;
};

Produits.create = (newproduits, result) => {
    sql.query("INSERT INTO produit SET ?", newproduits, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created produits: ", { id: res.insertId, ...newproduits });
        result(null, { id: res.insertId, ...newproduits });
    });
};

Produits.findById = (produitsId, result) => {
    sql.query(`SELECT * FROM produit WHERE id = ${produitsId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found produits: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found produits with the id
        result({ kind: "not_found" }, null);
    });
};

Produits.getAll = result => {
    sql.query("SELECT * FROM produit", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("produits: ", res);
        result(null, res);
    });
};

Produits.updateById = (id, produits, result) => {
    sql.query(
        "UPDATE produit SET ref = ?, name = ?, quantite = ?,prix = ?, promotion = ?, disponible = ? WHERE id = ?",
        [produits.ref, produits.name, produits.quantite,produits.prix,produits.promotion,produits.disponible, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found produit with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated produits: ", { id: id, ...produits });
            result(null, { id: id, ...produits });
        }
    );
};

Produits.remove = (id, result) => {
    sql.query("DELETE FROM produit WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found produit with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted produit with id: ", id);
        result(null, res);
    });
};

Produits.removeAll = result => {
    sql.query("DELETE FROM produit", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} produit`);
        result(null, res);
    });
};
module.exports = Produits;