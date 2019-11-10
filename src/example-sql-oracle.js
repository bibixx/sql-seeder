const sql = `
CREATE TABLE AirlineEmployees (
    employeeId integer  NOT NULL,
    personId integer  NOT NULL,
    airlineId integer  NOT NULL,
    startDate date  NOT NULL,
    endDate date  NULL,
    CONSTRAINT AirlineEmployees_pk PRIMARY KEY (employeeId)
) ;
`;


module.exports = sql;
