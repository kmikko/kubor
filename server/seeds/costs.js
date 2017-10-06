exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("costs")
    .del()
    .then(function() {
      // Inserts seed entries
      // Generate seed data for years [2017-2037],
      // months [1-2] and types ["cpu", "memory", "network", "storage"]
      const data = Array(21)
        .fill()
        .map((y, i) => 2017 + i)
        .map((y, i) =>
          Array(12)
            .fill()
            .map((m, i) => [
              {
                resource_type: "cpu",
                year: y,
                month: i + 1,
                cost: 0
              },
              {
                resource_type: "memory",
                year: y,
                month: i + 1,
                cost: 0
              },
              {
                resource_type: "network",
                year: y,
                month: i + 1,
                cost: 0
              },
              {
                resource_type: "storage",
                year: y,
                month: i + 1,
                cost: 0
              }
            ])
            .reduce((a, b) => a.concat(b))
        )
        .reduce((a, b) => a.concat(b));

      return knex.batchInsert("costs", data, 100);
    });
};
