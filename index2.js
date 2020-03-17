const { Client } = require('pg')
const Fs = require('fs');
const CsvReadableStream = require('csv-reader');
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'BecasMovilidad',
  password: 'docker',
  port: 5432,
});
client.connect();

let res = [];
let inputStream = Fs.createReadStream('Becas-Nuevas-Movilidad-Extranjero-2018.csv', 'utf8');
 
inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
        const [aPaterno,aMaterno,nombre,area,nivel,inst,pais] = row;
        let nivelPrefix = nivel;
        const doc = RegExp('DOCTORADO','g');
        const mae = RegExp('MAESTRIA','g');
        const esp = RegExp('ESPECIALIDAD','g');
        nivelPrefix =(doc.test(nivel)) ? 'DOC' :nivelPrefix;
        nivelPrefix =(mae.test(nivel)) ? 'MAE' :nivelPrefix;
        nivelPrefix =(esp.test(nivel)) ? 'ESP' : nivelPrefix;
        client.query(`SELECT idEstudiante from Estudiantes WHERE apellidoPaterno='${aPaterno}' AND apellidoMaterno='${aMaterno}' AND nombre='${nombre}'`).then(res => {
          const data = res.rows;
          let idEstudiante = undefined;
          data.forEach(row => {
            idEstudiante = row.idestudiante;
          });
          
          return idEstudiante;
      }).then( idEstudiante => {
        //console.log(idEstudiante);
        return client.query(`SELECT idInstitucion from Instituciones where nombre='${inst}' AND pais='${pais}'`)
        .then(res => {
          const data = res.rows;
          let idInstitucion = undefined;
          data.forEach(row => {
            idInstitucion = row.idinstitucion;
          });
          return ({idEstudiante,idInstitucion})
        })
        .then( data =>{
  const {idEstudiante,idInstitucion} = data;
          if(idEstudiante && idInstitucion){
          res.push(`INSERT INTO EstudiantesExtranjero (nivel,anio,idEstudiante,idArea,idInstitucion)VALUES('${nivelPrefix}','2018','${idEstudiante}',${area},'${idInstitucion}');`);
          console.log(`INSERT INTO EstudiantesExtranjero (nivel,anio,idEstudiante,idArea,idInstitucion)VALUES('${nivelPrefix}','2018','${idEstudiante}',${area},'${idInstitucion}')`);
          }
        })
        .catch( err => console.log(err.stack));
      
      }).catch(err => {
          console.log(err.stack);
      }).finally(() => {
          //client.end()
      })
        
    })
    .on('end', function (data) {
        console.log('No more rows!');
        //console.log(res);

    });
/*

client.query('SELECT * from AreasDeConocimiento', (err, res) => {
  console.log(err, res)
  client.end()
})*/

setTimeout(() => {
  console.log("hey");
  Fs.writeFile("estudiantesExtranjero.csv", res.join('\n'), function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("The file was saved!");
      });
  client.end();
},135000);