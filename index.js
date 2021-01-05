
const http = require('http')
const https = require('https')
const fs = require('fs')

const express = require('express')
const app = express()

/* Constants */
const isDarkMode = false
/* Constants */

const pageNames = {
    'login': "Connection",
    'home':  "Accueil",
    'mail':  "Vos mails",
    'settings': "Paramètres",
    'edt': "Emploi du temps"
}

app.set('view engine', 'pug')
app.set('views', 'public/views')

app.use(express.static('public/resources'))

app.get('/', (req, res) => {
    res.render('login', {
        darkMode: isDarkMode,
        stylesheet: 'login',
        pageName: pageNames['login']
    })
})

app.get('/:name', (req, res) => {
    const name = req.params.name;

    if(name == 'login') res.redirect('/')

    if(fs.existsSync(`public/views/${name}.pug`)) {
        res.render(name, {
            stylesheet: name,
            darkMode: isDarkMode,
            pageName: pageNames[name]
        })
    } else {
        render404(res)
    }
    
})

app.get('/mail/:id([0-9]+)', (req, res) => {
    res.render('mail-view', {
        stylesheet: 'mail-view',
        pageName: "Vos mails",
        darkMode: isDarkMode
    })
})

app.all('*', (req, res) => render404(res))

const render404 = (res) => {
    res.render('404', {
        stylesheet: '404',
        darkMode: isDarkMode,
        pageName: '404'
    })
}

/* Server init */
http.createServer(app).listen(3000, () => console.log("App running on port 3000"))

/*https.createServer({
    key: fs.readFileSync('private/server.key'),
    cert: fs.readFileSync('private/server.cert')
}, app).listen(3001, () => console.log("App running on port 443"))*/
