
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const db_name = path.join(__dirname, "data", "apptest.db");

const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'apptest.db'");
});

const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.listen(3000, () => { {
  console.log("Server started (http://localhost:3000/) !")}
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => { {
    // res.send("Hello world...");
    res.render("main")}
  });
  
  app.get("/bookevent", (req, res) => {
    const sql = "SELECT * FROM BookEvent ORDER BY id"
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("bookevent", { model: rows });
    });
  });
  app.get("/edit/:id", (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM BookEvent WHERE id = ?";
    db.get(sql, id, (err, row) => {
      // if (err) ...
      res.render("edit", { model: row });
    });
  });
  app.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    const book = [req.body.FirstName, req.body.LastName, req.body.Address, req.body.EMail, req.body.Phone, req.body.CNIC, req.body.Seats, req.body.Date, req.body.Venue, req.body.EventType, req.body.PaymentMethod, id];
    const sql = "UPDATE BookEvent SET FirstName = ?, LastName = ?, Address = ?, EMail = ?, Phone = ?, CNIC = ?, Seats = ?, Date = ?, Venue = ?, EventType = ?, PaymentMethod = ?  WHERE (id = ?)";
    db.run(sql, book, err => {
      // if (err) ...
      res.redirect("/bookevent");
    });
  });

  app.get("/create", (req, res) => {
   
    res.render("create", { model: {} });
  });

app.post("/verify",(req,res)=>{
const verify =[req.body.username ,req.body.password]
const sql = "SELECT EXISTS(SELECT 1 FROM login WHERE Name= ? AND Password = ?);";
    
    db.run(sql, verify, err => {
      // if (err) ...
      res.redirect("/bookevent");
    });
});
  // POST /create
app.post("/create", (req, res) => {
  
   
  const sql = "INSERT INTO BookEvent (id,FirstName, LastName, Address, EMail, Phone , CNIC , Seats, Date, Venue, EventType, PaymentMethod) VALUES (?,'?', '?', '?','?', '?', '?', ?, '?', '?', '?', '?')";
  const book = [req.body.id, req.body.FirstName, req.body.LastName, req.body.Address, req.body.EMail, req.body.Phone, req.body.CNIC, req.body.Seats, req.body.Date, req.body.Venue, req.body.EventType, req.body.PaymentMethod];
  db.run(sql, book, err => {
      // if (err) ...
      res.redirect("/bookevent");
    });
  });
  // GET /delete/5
app.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM BookEvent WHERE id = ?";
    db.get(sql, id, (err, row) => {
      // if (err) ...
      res.render("delete", { model: row });
    });
  });
// POST /delete/5
app.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE  FROM BookEvent WHERE id = ?";
    db.run(sql, id, err => {
      // if (err) ...
      res.redirect("/bookevent");
    });
  });