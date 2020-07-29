'use strict'

const Barang = use('App/Models/Barang')
const Database = use('Database')

class BarangController {
    async getBarang ({response}) {
        let query = await Database.raw(`
          select * from barangs 
          join m_kategori on barangs.id_kategori = m_kategori.id_kategori
          order by nama_barang asc`)
        let data = query.rows;
        try {
          return response.status(200).json({ data });
        } catch (err) {
          console.log(err);
          return response.status(500).json({ msg: 'Internal server error' });
        }
    }

    async getDetailBarang ({params, response}) {
        const data = await Barang.find(params.id)
        return response.json(data)
    }

    async saveBarang ({request, response}) {
        const inputPost = request.only([
          'nama_barang',
          'id_kategori',
          'harga',
        ])
     
        const data = new Barang()
        data.nama_barang            = inputPost.nama_barang
        data.id_kategori              = inputPost.id_kategori
        data.harga            = inputPost.harga
        await data.save()
        return response.status(201).json(data)
    }

    async updateBarang ({params, request, response}) {
        const inputPost = request.only([
          'nama_barang',
          'id_kategori',
          'harga',
        ])

        const data = await Barang.find(params.id)
        if (!data) {
          return response.status(404).json({data: 'Resource not found'})
        }

        data.nama_barang       = inputPost.nama_barang
        data.id_kategori       = inputPost.id_kategori
        data.harga             = inputPost.harga
        await data.save()
        return response.status(200).json(data)
    }

    async deleteBarang ({params, response}) {

        const barang = await Barang.find(params.id)
        if (!barang) {
        return response.status(404).json({data: 'Resource not found'})
        }
        
        await barang.delete()
        
        return response.status(200).json("data "+barang.nama_barang+" berhasil dihapus")
    }

    async CariBarang ({params ,response}) {
      let raw_query = `select * from barangs
      where id_kategori = '${ params.id_kategori }'
      order by nama_barang asc`   
      
      let query = await Database.raw(raw_query)
        let data = query.rows;
        try {
          return response.status(200).json({ data });
        } catch (err) {
          console.log(err);
          return response.status(500).json({ msg: 'Internal server error' });
        }
    }
}

module.exports = BarangController
