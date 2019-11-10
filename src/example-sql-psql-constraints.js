const constraints = {
  AirlineEmployees: {
    'airlineId': {
      table: 'Airlines',
      key: 'airlineId',
    },
    'personId': {
      table: 'People',
      key: 'personId',
    },
  },
  Pilots: {
    'employeeId': {
      table: 'AirlineEmployees',
      key: 'employeeId',
    },
    'rankId': {
      table: 'PilotRanks',
      key: 'rankId',
    },
  },
  Airlines: {
    'countryOfOriginId': {
      table: 'Countries',
      key: 'countryId',
    },
  },
  Planes: {
    'airlineId': {
      table: 'Airlines',
      key: 'airlineId',
    },
    'manufacturerId': {
      table: 'Manufacturers',
      key: 'manufacturerId',
    },
  },
  Airports: {
    'cityId': {
      table: 'Cities',
      key: 'cityId',
    },
  },
  Cities: {
    'countryId': {
      table: 'Countries',
      key: 'countryId',
    },
  },
  Flights: {
    'originId': {
      table: 'Airports',
      key: 'airportId',
    },
    'destinationId': {
      table: 'Airports',
      key: 'airportId',
    },
    'pilotCrewId': {
      table: 'PilotsCrews',
      key: 'crewId',
    },
    'planeId': {
      table: 'Planes',
      key: 'planeId',
    },
  },
  Mechanic_Malfunctions: {
    'malfunctionId': {
      table: 'Malfunctions',
      key: 'malfunctionId',
    },
    'mechanicId': {
      table: 'Mechanics',
      key: 'mechanicId',
    },
  },
  Malfunctions: {
    'planeId': {
      table: 'Planes',
      key: 'planeId',
    },
  },
  Manufacturers: {
    'countryOfOriginId': {
      table: 'Countries',
      key: 'countryId',
    },
  },
  Mechanics: {
    'employeeId': {
      table: 'AirlineEmployees',
      key: 'employeeId',
    },
    'managerId': {
      table: 'Mechanics',
      key: 'mechanicId',
    },
  },
  PilotsCrews: {
    'firstOfficerId': {
      table: 'Pilots',
      key: 'pilotId',
    },
    'secondOfficerId': {
      table: 'Pilots',
      key: 'pilotId',
    },
    'captainId': {
      table: 'Pilots',
      key: 'pilotId',
    },
  }
};

module.exports = constraints;
