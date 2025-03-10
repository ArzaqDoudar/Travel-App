
const port = 8000;
// Require Express to run server and routes
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express()


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

app.get('/all', (req, res) => {
    console.log("GET")

})
