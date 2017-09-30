exports.up = function(knex, Promise) {
  return Promise.all([
    knex
      .table("resource_type")
      .insert([
        { type_name: "cpu", type_id: 1 },
        { type_name: "memory", type_id: 2 },
        { type_name: "storage", type_id: 3 },
        { type_name: "network", type_id: 4 },
        { type_name: "custom", type_id: 5 }
      ]),
    knex
      .table("currency")
      .insert([
        { currency_name: "USD", currency_id: 1 },
        { currency_name: "EUR", currency_id: 2 }
      ])
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex("resource_type").del(), knex("currency").del()]);
};
