exports.up = function(knex, Promise) {
  return knex.schema.raw(
    "CREATE TABLE `metrics` (" +
      "`timestamp` INTEGER NOT NULL, " +
      "`type` TEXT NOT NULL, " +
      "`value` NUMERIC NOT NULL, " +
      "`namespace` TEXT NOT NULL, " +
      "UNIQUE(timestamp, type, namespace) ON CONFLICT REPLACE)"
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("metrics");
};
