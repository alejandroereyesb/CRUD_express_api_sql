const express = require('express')
const news = require('./modules/news')
const app = express() // create server
const port = 3000

// Middleware
app.use(express.json()); // para poder leer datos del BODY del post
// Rutas
// Peticiones GET

app.get('/api', news.getHome)
app.get('/api/internacional', news.getInternacional) // READ BBDD
app.get('/api/deportes/:seccion?/:id?', news.getDeportes)
app.get('/api/politica/:id?', news.getPolitica)
app.get('/api/noticias',news.getNoticiaWriter)
// Peticion POST
app.post('/api/crear',news.crearNoticia) // CREATE BBDD

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
