const sql = require("./db.js");

// constructor
const Fournisseur = function(fournisseur) {
    this.cin = fournisseur.email;
    this.email = fournisseur.email;
    this.telephone = fournisseur.email;
    this.name = fournisseur.name;
    this.active = fournisseur.active;
};

Fournisseur.create = (newFournisseur, result) => {
    sql.query("INSERT INTO fournisseur SET ?", newFournisseur, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created fournisseur: ", { id: res.insertId, ...newFournisseur });
        result(null, { id: res.insertId, ...newFournisseur });
    });
};

Fournisseur.findById = (fournisseurId, result) => {
    sql.query(`SELECT * FROM fournisseur WHERE id = ${fournisseurId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found fournisseur: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found fournisseur with the id
        result({ kind: "not_found" }, null);
    });
};

Fournisseur.getAll = result => {
    sql.query("SELECT * FROM fournisseur", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("fournisseur: ", res);
        result(null, res);
    });
};

Fournisseur.updateById = (cin, fournisseur, result) => {
    sql.query(
        "UPDATE fournisseur SET cin = ?, email = ?, telephone = ?,nom = ?,active = ? WHERE id = ?",
        [fournisseur.email, fournisseur.telephone, fournisseur.nom,fournisseur.active, cin],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found fournisseur with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated fournisseur: ", { id: id, ...fournisseur });
            result(null, { id: cin, ...fournisseur });
        }
    );
};

Fournisseur.remove = (cin, result) => {
    sql.query("DELETE FROM fournisseur WHERE id = ?", cin, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found fournisseur with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted fournisseur with cin: ", cin);
        result(null, res);
    });
};

Fournisseur.removeAll = result => {
    sql.query("DELETE FROM fournisseur", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} fournisseur`);
        result(null, res);
    });
};

module.exports = Fournisseur;