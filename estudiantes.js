const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

let res = [];
let inputStream = Fs.createReadStream('estudiantes.txt', 'utf8');
 
inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
        const [apellidoPaterno,apellidoMaterno,nombre,sexo] = row;
        res.push(`INSERT INTO Estudiantes (apellidoPaterno,apellidoMaterno,nombre,sexo) values('${apellidoPaterno}','${apellidoMaterno}','${nombre}','${sexo}');`);
    })
    .on('end', function (data) {
        console.log('No more rows!');
        //console.log(res);
        Fs.writeFile("estudiantes.csv", res.join('\n'), function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("The file was saved!");
      }); 
    });