const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost', 
    user: 'root', 
    password:'Hola1234$',
    connectionLimit: 5,
    database:'new_schema'
});
// titulo, contenido,url,topic
async function crearTabla(){
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query(" CREATE TABLE `News` (`ID` INT NOT NULL AUTO_INCREMENT, `Titulo` VARCHAR(255) NULL,`Contenido` VARCHAR(255) NULL,`URL` VARCHAR(100) NULL,`Topic` VARCHAR(255) NULL,PRIMARY KEY (`ID`));");
      
      console.log(res); 
  
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
}
//crearTabla()

// CREATE
exports.createNews = async (article) => {
    let conn;
    try {
      conn = await pool.getConnection();

      const query = "INSERT INTO News (Titulo,Contenido,URL,Topic,WriterID) VALUES (?,?,?,?,(SELECT ID from new_schema.Writers WHERE Email=?));";
      const datos = [article.titulo,article.contenido,article.url, article.topic,article.email];
      const res = await conn.query(query,datos); // ejecuta query + datos
      console.log(res);
      return res; 
  
    } catch (err) {
        console.log(err);
        return null;
    } finally {
      if (conn) return conn.end();
    }
}

let noticia = {
    titulo: "Un oso panda conquista a más de cuatro millones de personas por su ternura",
    contenido:"Se llama Fu Bao y con sólo seis meses este oso panda muy unido a su cuidador. Tanto, que se aferra por complet",
    url:"https://static.scientificamerican.com/espanol/cache/file/050D641B-C40F-460A-B",
    topic:"internacional"
}
// Crea noticia
//createNews(noticia);



// READ
// topic --> politica, deportes, internacional
exports.readNews = async(topic) => {
    let conn;
    let resultado;
    try {
      conn = await pool.getConnection();
      let res = await conn.query("SELECT * FROM News WHERE Topic=?;",[topic]); // DEVUELVE TODO DE NEWS
      resultado = res;
    } catch (err) {
        console.log(err);
        resultado = null;
    } finally {
      if (conn) conn.end();
      return resultado;
    }
}

exports.readNewsFromWriter = async(email) => {
    let conn;
    let resultado;
    try {
      conn = await pool.getConnection();
      let res = await conn.query("SELECT n.Titulo, n.WriterID, w.Nombre FROM News AS n INNER JOIN Writers AS w ON n.WriterID=w.ID WHERE w.Email=?;",[email]); // DEVUELVE TODO DE NEWS de Email
      resultado = res;
    } catch (err) {
        console.log(err);
        resultado = null;
    } finally {
      if (conn) conn.end();
      return resultado;
    }
}


//readNews('internacional').then(data => console.log(data));

/*
//Probar funcion
//readNews('internacional');

// UPDATE

// DELETE
*/