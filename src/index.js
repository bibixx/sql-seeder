const exampleSql = require('./example-sql-psql');
const constraints = require('./example-sql-psql-constraints');

const opt = {
  database: 'PostgresQL'
}
const { Parser } = require('node-sql-parser');
const parser = new Parser();

const dataTypes = {
  INTEGER: 1,
  DATE: 2,
  VARCHAR: 3,
  CHAR: 4,
}

const randomFunction = {
  [dataTypes.INTEGER]: () => Math.floor(Math.random() * 100),
  [dataTypes.DATE]: () => new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toISOString(),
  [dataTypes.VARCHAR]: () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  [dataTypes.CHAR]: () => Math.random().toString(36).substring(2, 6),
}

const cleanSql = exampleSql
  .replace(/^-- (.+)$/gm, '')
  .replace('\n', '');

const ast = parser.astify(
  cleanSql,
  opt
);

const tablesInQuery = ast
  .filter(({ type }) => type === 'create');

const tables = tablesInQuery.map((table) => {
  const tableName = table.table[0].table;
  const tableReferences = constraints[tableName];

  return ({
    name: tableName,
    references: tableReferences || null,
    columns: table.create_definitions
      .filter(({ resource }) => resource === 'column')
      .map(({
        definition: { dataType, ...definition },
        ...column
      }) => ({
        name: column.column.column,
        type: dataTypes[dataType],
        typeOptions: definition,
        nullable: column.nullable.value === 'null',
      }))
  });
});

// console.dir(tables, {depth: null, colors: true});

const arrWithN = (n) => new Array(n).fill(null);

const tablesWithValues = tables
  .map(({ columns, ...rest }) => ({
    ...rest,
    values: arrWithN(45)
      .map(() =>
        columns.reduce((acc, { name, type }) => ({
          ...acc,
          [name]: randomFunction[type](),
        }), {})
      )
  }))

// console.dir(tablesWithValues, {depth: null, colors: true});

const findTable = (tables, tableName) => tables.find(({ name }) => name === tableName);
const randomElement = (elements) => elements[Math.floor(Math.random() * (elements.length - 1))];

const valuesWithReferences = tablesWithValues
  .map(({ references, values, ...rest }) => {
    const referenceKeys = references !== null ? Object.keys(references) : [];

    return ({
      ...rest,
      values: values.map((value) =>
        Object.fromEntries(
          Object.entries(value)
            .map(([key, value]) => {
              if (!referenceKeys.includes(key)) {
                return [key, value];
              }

              const referencedTable = findTable(tablesWithValues, references[key].table);

              const el = randomElement(referencedTable.values)[references[key].key];

              return [key, el];
            })
        )
      )
    })
  });

// console.dir(valuesWithReferences, {depth: null, colors: true});

const insertQueries = valuesWithReferences.flatMap(({ name, values }) => values.map((value) => (
  `INSERT INTO ${name} (${Object.keys(value).join(', ')}) VALUES (${
    Object.values(value)
      .map(
        v => {
          if (typeof v === 'string') {
            return `'${v}'`
          }

          return v;
        }
      )
      .join(', ')
})`
)))

// console.dir(insertQueries, {depth: null, colors: true});

console.log(insertQueries.join(';\n'));
