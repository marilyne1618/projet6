const jut = require("jsonwebtoken")

// Ajout d'authorize pour la validation des tokens qui autorise l'authentification des utilisateurs
// "next" signifie de continuer après les conditions "if"
function authenticateUser(req, res, next) {
    console.log("authenticate user")
    const header = req.header("Authorization")
    // Affiche le status 403 s'il n'y a pas de header
    if (header == null) return res.status(403).send({ message: "Invalid" })

    // Utilisation du split pour récupérer la deuxième valeur du header s'il est undefind
    // Affiche le status 403 s'il n'y a pas de token
    const token = header.split(" ")[1]
    if (token == null) return res.status(403).send({ message: "token cannot be null" })

    // Vérification du token
    jut.verify(token, process.env.JWT, (err, decoded) => {
        // Cas où le mot de passe n'est pas valide avec un status 403
        if (err) return res.status(403).send({ message: "token invalid" + err })
        console.log("le token est bien valide, on continue")
        next()
    })
}

module.exports = { authenticateUser }