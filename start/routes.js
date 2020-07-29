'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('barang', 'BarangController.saveBarang')
  Route.get('barang', 'BarangController.getBarang')
  Route.get('barang/:id', 'BarangController.getDetailBarang')
  Route.put('barang/:id', 'BarangController.updateBarang')
  Route.delete('barang/:id', 'BarangController.deleteBarang')

  Route.post('kategori', 'KategoriController.saveKategori')
  Route.get('kategori', 'KategoriController.getKategori')
  Route.get('kategori/:id_kategori', 'KategoriController.getDetailKategori')
  Route.put('kategori/:id_kategori', 'KategoriController.updateKategori')
  Route.delete('kategori/:id_kategori', 'KategoriController.deleteKategori')

  Route.get('search-barang/:id_kategori', 'BarangController.CariBarang')
}).prefix('api')
