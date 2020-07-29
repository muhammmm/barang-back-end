'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Kategori extends Model {
    static get table(){
        return 'm_kategori'
    }

    static get primaryKey(){
        return 'id_kategori'
    }
}

module.exports = Kategori
