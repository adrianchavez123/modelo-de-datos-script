const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

let res = [];
let inputStream = Fs.createReadStream('tmp2.txt', 'utf8');
 
inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
        const [nombre,pais] = row;
        res.push(`INSERT INTO Instituciones (nombre,pais) values('${nombre}','${pais}');`);
    })
    .on('end', function (data) {
        console.log('No more rows!');
        //console.log(res);
        Fs.writeFile("institutos.csv", res.join('\n'), function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("The file was saved!");
      }); 
    });