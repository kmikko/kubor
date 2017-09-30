exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw(
      "CREATE TABLE 'costs' (" +
        "'id'	INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
        "'year'	INTEGER CHECK(year >= 2017 AND year <= 2037), " +
        "'month'	INTEGER CHECK(month >= 1 AND month <= 12), " +
        "'resource_type'	TEXT NOT NULL DEFAULT ('custom') REFERENCES resource_type(type_name), " +
        "'resource_label' TEXT NOT NULL DEFAULT (''), " +
        "'cost'	INTEGER NOT NULL, " +
        "'currency'	TEXT NOT NULL DEFAULT ('USD') REFERENCES currency(currency_name), " +
        "CONSTRAINT cost_unique UNIQUE (year, month, resource_type, resource_label) ON CONFLICT REPLACE);"
    ),
    knex.schema.raw(
      "CREATE TABLE 'resource_type' (" +
        "'type_name'	TEXT PRIMARY KEY NOT NULL," +
        "'type_id' INTEGER UNIQUE" +
        ");"
    ),
    knex.schema.raw(
      "CREATE TABLE 'currency' (" +
        "'currency_name' TEXT PRIMARY KEY NOT NULL," +
        "'currency_id' INTEGER UNIQUE" +
        ");"
    )
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("currency"),
    knex.schema.dropTable("resource_type"),
    knex.schema.dropTable("costs")
  ]);
};
