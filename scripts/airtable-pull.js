const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const Airtable = require('airtable');
const _ = require('lodash');

dotenv.config();

const apiKey = process.env.AIRTABLE_API_KEY;
const dbKey = process.env.AIRTABLE_DB_ID;

console.log('turkeyman rules', { apiKey, dbKey });

async function fetchRecords(tableName, fields) {
  const records = [];
  const base = new Airtable({ apiKey }).base(dbKey);
  console.log('fetchCourses =>', base);

  function page(rs, fetchNextPage) {
    rs.forEach(r => records.push(r.fields));
    fetchNextPage();
  }

  await base(tableName).select({ fields }).eachPage(page);

  function flattenRecord(record) {
    const obj = {};
    for (const field of fields) {
      const value = record[field];
      const key = _.camelCase(field);
      obj[key] = Array.isArray(value) ? value[0] : value;
    }
    return obj;
  }
  return records.map(flattenRecord);
}

async function constructTable(tableName, fields) {
  const records = await fetchRecords(tableName, fields);
  const dirData = path.join(process.cwd(), 'data');
  const pathJson = path.join(dirData, `${tableName}.json`);
  fs.writeFileSync(pathJson, JSON.stringify(records));
}

const tables = [
  {
    name: 'tracks',
    fields: [
      'id',
      'name',
      'filename',
      'school_term_id',
      'school_year_id',
      'class_id',
      'genre_id',
      'is_mastered',
    ],
  },
  {
    name: 'students',
    fields: ['id', 'first_name', 'last_name', 'graduation_year'],
  },
  { name: 'performances', fields: ['student_id', 'track_id'] },

  { name: 'courses', fields: ['id', 'label', 'description'] },
  { name: 'classes', fields: ['id', 'course_id', 'school_term_id'] },
  { name: 'school_years', fields: ['id'] },
  {
    name: 'school_terms',
    fields: ['id', 'school_year_id', 'term_label', 'term_index'],
  },
  { name: 'venues', fields: ['id', 'label', 'school_term_id'] },
  { name: 'genres', fields: ['id', 'label'] },
];

for (const table of tables) {
  constructTable(table.name, table.fields);
}
