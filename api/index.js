// Variables
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

// Routes
const routerSinger = require("./routes/singer");


// Others
const app = express();





// App use
// Public
app.use("/public", express.static("uploads"))

// Morgan
app.use(morgan("dev"));

// Cors
app.use(cors())

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/singer", routerSinger);

// Error
app.use((req, res, next) => {
    const error = new Error("Não encontrado!");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            message: error.message
        }
    })
})





// Exports
module.exports = app;