import express from "express"
import pg from "pg"

const port = 8000
const app = express();

const Pool = pg.Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "aws_todo",
    password: "8610540677",
    port: 5432,
})

app.use(express.json())


app.get("/api/get-all-todos", async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM todo")
        res.status(200).json(result.rows)
        return
    } catch (error) {
        res.status(500).json({ message: error.message })
        return
    }
})


app.post("/api/create-todo", async (req, res) => {
    // const { name, email } = req.body;
    console.log(req.body)
   const name = req.body.name;
   const email = req.body.email;

    try {
        const result =await pool.query("INSERT INTO todo(name,email) VALUES ($1,$2) RETURNING *", [name, email]) 
        res.status(201).json(result.rows[0])
        return
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



app.use('/', express.static("./dist"))










app.listen(port, () => {
    console.log("Server Listening")
})


