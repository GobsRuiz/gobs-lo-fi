const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads/images/userPhoto")
    },
    filename: (req, file, callback) => {
        const fileName = new Date().toISOString().replaceAll(/[:.]/g, "")+file.originalname;
        callback(null, fileName);
    }
})
const upload = multer({ storage: storage })





// Routes
router.get("/", (req, res, next) => {
    return;
})

router.post("/", upload.single("user_photo"), (req, res, next) => {
    console.log(req.file);

    // Check if there is any empty field
    for(let i = 0; i < Object.keys(req.body).length; i++){
        if(req.body[Object.keys(req.body)[i]].length == 0){
            return res.status(401).send({
                error: "Campo "+ Object.keys(req.body)[i] +" obrigatório"
            })
        }
    }

    // Save to database
    mysql.getConnection((error, conn) => {
        if(error) return res.status(500).send({error: error});

        conn.query(
            "INSERT INTO singer (name, genre, photo_path) VALUES (?,?,?)",
            [req.body.name, req.body.genre, req.body.photo_path],
            
            (error, result, field) => {
                conn.release();

                if(error) return res.status(500).send({error: error});

                res.status(201).send({
                    message: "Cantor adicionado com sucesso",
                })
            }
        )
    })

    // res.end()
})





// Exports
module.exports = router;