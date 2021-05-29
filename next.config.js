const fs = require('fs');
const path = require('path');

function loadData(tableName) {
  const dataDirectory = path.join(process.cwd(), 'data');

  const jsonPath = path.join(dataDirectory, `${tableName}.json`);

  const records = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  return records;
}

const schoolYears = loadData('school_years').sort((a, b) =>
  a.id > b.id ? -1 : 1
);
const courses = loadData('courses').sort((a, b) =>
  a.label > b.label ? 1 : -1
);
const genres = loadData('genres').sort((a, b) => (a.id > b.id ? 1 : -1));

async function redirects() {
  return [
    {
      source: '/courses',
      destination: `/courses/${courses[0].id}`,
      permanent: true,
    },
    {
      source: '/years',
      destination: `/years/${schoolYears[0].id}`,
      permanent: true,
    },
    {
      source: '/genres',
      destination: `/genres/${genres[0].id}`,
      permanent: true,
    },
  ];
}
module.exports = {
  redirects,
};
