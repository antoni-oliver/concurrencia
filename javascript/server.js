import express from "express"

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log(`Rebut: ${id}`);
    setTimeout(() => {
        res.send(`${id}`);
        console.log(`Servit: ${id}`);
    }, 100);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});