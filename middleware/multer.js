// Multer récupère les données lus par body-parser
const multer = require("multer")

// Sauvegarde des images avec un nom unique
const storage = multer.diskStorage({
    destination: "images/",
    // Renome le fichier (cb = callback)
    filename: function (req, file, cb) {
        // Ne va pas au 2ème argument en cas d'erreur
        cb(null, makeFilename(req, file))
    }
})

// originalname met un nouveau nom avec l'extension .jpg 
function makeFilename(req, file) {
    console.log("req, file:", req, file)
    // Remplace les espaces par des tirets
    const fileName = `${Date.now()}-${file.originalname}`.replace(/\s/g, "-")
    file.fileName = fileName
    return fileName
}

// Récupèration du fichier (image) et création d'un dossier de destination
const upload = multer({ storage: storage })

module.exports = { upload }