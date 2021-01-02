const express = require('express')
const app = express()

const PORT = 3000

app.set('view engine', 'pug')
app.set('views', 'public/views')

app.use(express.static('public/resources'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/:name', (req, res) => {
    if(req.params.name == 'home') res.redirect('/')
    res.render(req.params.name)
})

app.listen(PORT, () => console.log("App running on port " + PORT))
