'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BarangSchema extends Schema {
  up () {
    this.create('barangs', (table) => {
      table.increments()
      table.string('nama_barang').nullable()
      table.integer('id_kategori')
      table.string('harga').nullable()
      table.timestamps()
    }),
    this.create('m_kategori', (table) => {
      table.increments('id_kategori')
      table.string('nama_kategori').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('barangs')
    this.drop('kategoris')
  }
}

module.exports = BarangSchema
