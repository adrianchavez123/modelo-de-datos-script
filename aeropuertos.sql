create database aeropuertosBD;
create table Aeropuertos(
  idAeropuerto serial primary key,
  ciudad varchar not null,
  nacional boolean not null
);

CREATE TYPE month AS ENUM ('ENE', 'FEB', 'MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC');
create table Vuelos(
  origen integer references Aeropuertos(idAeropuerto),
  destino integer references Aeropuertos(idAeropuerto),
  cantidadRecorridos integer not null,
  kilosTrasportados decimal not null,
  cantidadPersonasTrasportadas integer not null,
  anio integer not null,
  mes month not null
);

INSERT INTO Aeropuertos (ciudad,nacional) VALUES ('ACAPULCO',TRUE);
INSERT INTO Aeropuertos (ciudad,nacional) VALUES ('LOS ANGELES',FALSE);

INSERT INTO Vuelos(origen,destino,cantidadRecorridos,kilosTrasportados,cantidadPersonasTrasportadas,anio,mes)
VALUES(1,2,0,0,0,2016,'ENE');
INSERT INTO Vuelos(origen,destino,cantidadRecorridos,kilosTrasportados,cantidadPersonasTrasportadas,anio,mes)
VALUES(1,2,1,32270,0,2016,'FEB');
INSERT INTO Vuelos(origen,destino,cantidadRecorridos,kilosTrasportados,cantidadPersonasTrasportadas,anio,mes)
VALUES(1,2,0,0,0,2016,'MAR');
INSERT INTO Vuelos(origen,destino,cantidadRecorridos,kilosTrasportados,cantidadPersonasTrasportadas,anio,mes)
VALUES(1,2,0,0,0,2016,'ABR');
INSERT INTO Vuelos(origen,destino,cantidadRecorridos,kilosTrasportados,cantidadPersonasTrasportadas,anio,mes)
VALUES(1,2,0,0,0,2016,'MAY');
INSERT INTO Vuelos(origen,destino,cantidadRecorridos,kilosTrasportados,cantidadPersonasTrasportadas,anio,mes)
VALUES(1,2,0,0,0,2016,'JUN');
INSERT INTO Vuelos(origen,destino,cantidadRecorridos,kilosTrasportados,cantidadPersonasTrasportadas,anio,mes)
VALUES(1,2,0,0,0,2016,'JUL');
INSERT INTO Vuelos(origen,destino,cantidadRecorridos,kilosTrasportados,cantidadPersonasTrasportadas,anio,mes)
VALUES(1,2,0,0,0,2016,'AGO');
INSERT INTO Vuelos(origen,destino,cantidadRecorridos,kilosTrasportados,cantidadPersonasTrasportadas,anio,mes)
VALUES(1,2,0,0,0,2016,'SEP');
INSERT INTO Vuelos(origen,destino,cantidadRecorridos,kilosTrasportados,cantidadPersonasTrasportadas,anio,mes)
VALUES(1,2,0,0,0,2016,'OCT');
INSERT INTO Vuelos(origen,destino,cantidadRecorridos,kilosTrasportados,cantidadPersonasTrasportadas,anio,mes)
VALUES(1,2,0,0,0,2016,'NOV');
INSERT INTO Vuelos(origen,destino,cantidadRecorridos,kilosTrasportados,cantidadPersonasTrasportadas,anio,mes)
VALUES(1,2,0,0,0,2016,'DIC');

SELECT ori.ciudad,dest.ciudad,cantidadRecorridos,kilosTrasportados,kilosTrasportados,anio,mes
FROM Vuelos 
INNER JOIN Aeropuertos AS ori
ON Vuelos.origen = ori.idAeropuerto
INNER JOIN Aeropuertos AS dest
ON Vuelos.destino = dest.idAeropuerto;