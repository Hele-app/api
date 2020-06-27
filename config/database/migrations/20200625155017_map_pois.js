
exports.up = function(knex) {
  return knex.schema
    .createTable('map_pois', function (table) {
      table.increments()
      table.string('name').notNullable()
      table.text('description')
      table.string('address').notNullable()
      table.integer('zipcode').notNullable()
      table.string('city').notNullable()
      table.string('hour')
      table.string('phone').notNullable()
      table.string('site')
      table.float('latitude', 14, 10).notNullable()
      table.float('longitude', 14, 10).notNullable()
      table.integer('region_id').notNullable()
      table.timestamps()
    })
}

exports.down = function(knex) {
  return knex.schema.dropTable('map_pois')
}
