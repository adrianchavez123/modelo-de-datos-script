create database aeropuertosBD;
create table Aeropuertos(
  idAeropuerto int not null auto_increment,
  ciudad varchar(250) not null,
  nacional boolean not null,
  primary key(idAeropuerto)
);

create table Vuelos(
  origen int, 
  destino int,
  cantidadRecorridos int not null,
  kilosTrasportados double not null,
  cantidadPersonasTrasportadas int not null,
  anio integer not null,
  mes enum ('ENE', 'FEB', 'MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC') not null,
  foreign key (origen) references Aeropuertos(idAeropuerto),
  foreign key (destino) references Aeropuertos(idAeropuerto)
);
