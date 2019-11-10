const sql = `
-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-11-10 17:55:03.234

-- tables
-- Table: AirlineEmployees
CREATE TABLE AirlineEmployees (
    employeeId integer  NOT NULL,
    personId integer  NOT NULL,
    airlineId integer  NOT NULL,
    startDate date  NOT NULL,
    endDate date  NULL,
    CONSTRAINT AirlineEmployees_pk PRIMARY KEY (employeeId)
);

-- Table: Airlines
CREATE TABLE Airlines (
    airlineId integer  NOT NULL,
    name varchar(255)  NOT NULL,
    countryOfOriginId integer  NOT NULL,
    CONSTRAINT Airlines_pk PRIMARY KEY (airlineId)
);

-- Table: Airports
CREATE TABLE Airports (
    airportId integer  NOT NULL,
    airportName varchar(255)  NOT NULL,
    icao char(4)  NOT NULL,
    cityId integer  NOT NULL,
    CONSTRAINT Airports_pk PRIMARY KEY (airportId)
);

-- Table: Cities
CREATE TABLE Cities (
    cityId integer  NOT NULL,
    cityName varchar(255)  NOT NULL,
    countryId integer  NOT NULL,
    CONSTRAINT Cities_pk PRIMARY KEY (cityId)
);

-- Table: Countries
CREATE TABLE Countries (
    countryId integer  NOT NULL,
    countryName varchar(255)  NOT NULL,
    CONSTRAINT Countries_pk PRIMARY KEY (countryId)
);

-- Table: Flights
CREATE TABLE Flights (
    flightId integer  NOT NULL,
    originId integer  NOT NULL,
    destinationId integer  NOT NULL,
    departureTime date  NOT NULL,
    arrivalTime date  NULL,
    planeId integer  NOT NULL,
    pilotCrewId integer  NOT NULL,
    CONSTRAINT Flights_pk PRIMARY KEY (flightId)
);

-- Table: Malfunctions
CREATE TABLE Malfunctions (
    malfunctionId integer  NOT NULL,
    planeId integer  NOT NULL,
    malfunctionTitle varchar(255)  NOT NULL,
    malfunctionNote varchar(4000)  NOT NULL,
    CONSTRAINT Malfunctions_pk PRIMARY KEY (malfunctionId)
);

-- Table: Manufacturers
CREATE TABLE Manufacturers (
    manufacturerId integer  NOT NULL,
    name varchar(255)  NOT NULL,
    countryOfOriginId integer  NOT NULL,
    CONSTRAINT Manufacturers_pk PRIMARY KEY (manufacturerId)
);

-- Table: Mechanic_Malfunctions
CREATE TABLE Mechanic_Malfunctions (
    mechanicMalfunctionId integer  NOT NULL,
    mechanicId integer  NOT NULL,
    malfunctionId integer  NOT NULL,
    resolutionDate date  NOT NULL,
    CONSTRAINT Mechanic_Malfunctions_pk PRIMARY KEY (mechanicMalfunctionId,resolutionDate)
);

-- Table: Mechanics
CREATE TABLE Mechanics (
    mechanicId integer  NOT NULL,
    employeeId integer  NOT NULL,
    managerId integer  NULL,
    CONSTRAINT Mechanics_pk PRIMARY KEY (mechanicId)
);

-- Table: People
CREATE TABLE People (
    personId integer  NOT NULL,
    firstName varchar(255)  NOT NULL,
    middleName varchar(255)  NULL,
    lastName varchar(255)  NOT NULL,
    CONSTRAINT People_pk PRIMARY KEY (personId)
);

-- Table: PilotRanks
CREATE TABLE PilotRanks (
    rankId integer  NOT NULL,
    rankName varchar(255)  NOT NULL,
    CONSTRAINT PilotRanks_pk PRIMARY KEY (rankId)
);

-- Table: Pilots
CREATE TABLE Pilots (
    pilotId integer  NOT NULL,
    rankId integer  NOT NULL,
    employeeId integer  NOT NULL,
    CONSTRAINT Pilots_pk PRIMARY KEY (pilotId)
);

-- Table: PilotsCrews
CREATE TABLE PilotsCrews (
    crewId integer  NOT NULL,
    flightId integer  NOT NULL,
    captainId integer  NOT NULL,
    firstOfficerId integer  NOT NULL,
    secondOfficerId integer  NULL,
    CONSTRAINT PilotsCrews_pk PRIMARY KEY (crewId)
);

-- Table: Planes
CREATE TABLE Planes (
    planeId integer  NOT NULL,
    manufacturerId integer  NOT NULL,
    airlineId integer  NOT NULL,
    registrationNumber varchar(255)  NOT NULL,
    dateOfProduction date  NOT NULL,
    CONSTRAINT Planes_pk PRIMARY KEY (planeId)
);

`;

module.exports = sql;
