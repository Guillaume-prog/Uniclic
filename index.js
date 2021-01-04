
const http = require('http')
const https = require('https')
const fs = require('fs')

const express = require('express')
const app = express()

const pageNames = {
    'login': "Connection",
    'home':  "Accueil",
    'mail':  "Vos mails",
    'settings': "Paramètres"
}

app.set('view engine', 'pug')
app.set('views', 'public/views')

app.use(express.static('public/resources'))

app.get('/', (req, res) => {
    res.render('landing')
})

app.get('/:name', (req, res) => {
    const name = req.params.name;

    if(name == 'landing') res.redirect('/')
    res.render(name, {
        stylesheet: name,
        darkMode: false,
        pageName: pageNames[name]
    })
})

app.get('/mail/:id([0-9]+)', (req, res) => {
    res.render('mail.php')
})

/* Server init */
http.createServer(app).listen(3000)

/*https.createServer({
    key: fs.readFileSync('private/server.key'),
    cert: fs.readFileSync('private/server.cert')
}, app).listen(3001, () => console.log("App running on port 443"))*/
