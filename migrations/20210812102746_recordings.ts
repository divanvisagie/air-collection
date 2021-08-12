import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('recording', function (table) {
    table.bigIncrements('id')
    table.string('hex')
    table.string('flight')
    table.float('lat')
    table.float('lon')
    table.integer('altitude')
    table.integer('track')
    table.integer('speed')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('recording')
}
