const { User } = require("../mongo")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Fonction pour la création du modèle utilisateur
async function createUser(req, res) {
    // Try et Catch En cas d'erreur d'enregistrement de l'utilisateur
    try {
        const { email, password } = req.body
        const hashedPassword = await hashPassword(password)
        const user = new User({ email, password: hashedPassword })
        await user.save()
        res.status(201).send({ message: "Utilisateur enregisté !" })
    } catch (err) {
        res.status(409).send({ message: "Utilisateur non enregistré" + err })
    }
}

// Fonction qui permet de hacher le mot de passe (10 fois)
function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds)
}

async function logUser(req, res) {
    // Try et Catch En cas d'erreur du mot de passe
    try {
        // récupération de l'email d'un utilisateur dans la base de données
        const email = req.body.email
        const password = req.body.password
        // Trouver une personne dans une base de données
        const user = await User.findOne({ email: email })

        // Fonction qui demande de comparer le password lors du login
        const isPasswordOk = await bcrypt.compare(password, user.password)
        if (!isPasswordOk) {
            res.status(403).send({ message: "mot de passe incorrect" })
        }
        const token = createToken(email)
        res.status(200).send({ userId: user?._id, token: token })
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: "erreur interne" })
    }
}

// Création d'un token pour éviter de ressaisir ses identifiants
function createToken(email) {
    // mot de passe se trouvant dans le fichier .env
    const jwtPassword = process.env.JWT
    return token = jwt.sign({ email: email }, jwtPassword)
}

// Exportation des fonctions dans le fichier index.js
module.exports = { createUser, logUser }