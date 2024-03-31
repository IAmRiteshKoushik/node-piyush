const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 8000;

// Don't do this as this corrupts the upload
// Use DiskStorage instead
// const upload = multer({ dest: "uploads/" })

// cb : Callback
const storage = multer.diskStorage({
    destination: function(req, res, cb){
        // instead of null you can setup customError
        return cb(null, "uploads/");
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Render web-pages sing template files
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Parse application/json
app.use(express.json());

// Parse application/x-www-form-urlencoded
// Needed to parse multipart form data
app.use(express.urlencoded({ extended: false }));

// Parse incoming Request Object if object, with nested objects
// or generally any type
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    return res.render("homepage");
});

app.post("/upload", upload.single("profileImage"), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
});

app.listen(PORT, () => console.log(`Server Started at PORT:8000`));
