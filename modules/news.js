const fetch = require('node-fetch');
const db = require('../model/db');
const API_KEY = '---API KEY HERE---';

// Home
exports.getHome = (req, res) => {
    res.status(200).json({name:"noticias PUG",desc:"Bienvenido a la pagina de perritos"});
}
// Internacional
exports.getInternacional = async (req, res) => {
    let news = await db.readNews('internacional'); //Array de JSONs con news internacional
    res.status(200).json({name:"Internacional",desc:"Aqui noticias internacionales",noticias:news});
}
// Deportes
exports.getDeportes = (req, res) => {
    console.log(req.params.seccion); // Parametro de seccion
    console.log(req.params);
    //let secciones =["futbol","baloncesto","tenis"]
    // Con seccion + ID --> http://localhost:3000/deportes/futbol/2824 
    if(req.params.seccion && req.params.id){
        // Futbol, baloncesto u otros
        console.log(`seccion: ${req.params.seccion} noticia ${req.params.id}`);
        let msj =`Te renderizo la seccion: ${req.params.seccion}  y la noticia: ${req.params.id}`;
        res.status(200).json({message:msj});
        //res.render('deportes',{message:msj})
    }
    // Con seccion. Ruta--> http://localhost:3000/deportes/futbol
    else if(req.params.seccion){
        console.log(`seccion: ${req.params.seccion}`);
        let msj = `Te mando la seccion: ${req.params.seccion}`;
        res.status(200).json({message:msj});
    // Sin parametros. Ruta --> http://localhost:3000/deportes
    }else{
        // Deportes
        let msj = 'Te mando datos de deportes';
        res.status(200).json({message:msj});
    }
}
// Politica
// http://localhost:3000/politica
// http://localhost:3000/politica/12
// http://localhost:3000/politica/2

exports.getPolitica = (req, res) => {
    // Consulta a la API de noticias
    if(req.params.id){
        fetch(`http://newsapi.org/v2/everything?q=politics&from=2021-01-15&sortBy=publishedAt&apiKey=${API_KEY}`)
        .then(data => data.json())
        .then(news =>{
            let id = req.params.id; // Num de la noticia
            console.log(news.articles[id]);
            console.log(news.articles[id].title);
            console.log(news.articles[id].content);
            res.status(200).json({
                titulo:news.articles[req.params.id].title,
                contenido:news.articles[req.params.id].content,
                url:news.articles[req.params.id].urlToImage
            });
        })
        .catch(e => console.log(e))
    }else{ // si no pasas el :id
        res.status(200).json({
            titulo:'Pagina general de politica',
            contenido:'Estas son las ultimas noticias'
        })
    }
}

exports.crearNoticia = async (req,res) =>{
    console.log(req.body)
    let result = await db.createNews(req.body);
    res.status(200).json({status: "Noticia guardada!", data:{body:req.body}})

}
//http://localhost:3000/api/noticias?email=Luis@gmail.com
///url?email=andres@gmail.com - req.query 
exports.getNoticiaWriter = async (req, res) => {
    let news = await db.readNewsFromWriter(req.query.email); //Array de JSONs con news internacional
    res.status(200).json({name:"Internacional",desc:"Aqui noticias internacionales",noticias:news});
}
