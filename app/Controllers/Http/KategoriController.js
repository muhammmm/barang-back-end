'use strict'

const Kategori = use('App/Models/Kategori')
const Database = use('Database')

class KategoriController {
    async getKategori ({response}) {
        let query = await Database.raw(`
          select * from m_kategori
          order by nama_kategori asc`)
        let data = query.rows;
        try {
          return response.status(200).json({ data });
        } catch (err) {
          console.log(err);
          return response.status(500).json({ msg: 'Internal server error' });
        }
    }

    async getDetailKategori ({params, response}) {
        const data = await Kategori.find(params.id_kategori)
        return response.json(data)
    }

    async saveKategori ({request, response}) {
        const inputPost = request.only([
          'nama_kategori'
        ])
     
        const data = new Kategori()
        data.nama_kategori            = inputPost.nama_kategori
        await data.save()
        return response.status(201).json(data)
    }

    async updateKategori ({params, request, response}) {
        const inputPost = request.only([
          'nama_kategori'
        ])

        const data = await Kategori.find(params.id_kategori)
        if (!data) {
          return response.status(404).json({data: 'Resource not found'})
        }

        data.nama_kategori      = inputPost.nama_kategori
        await data.save()
        return response.status(200).json(data)
    }

    async deleteKategori ({params, response}) {

        const kategori = await Kategori.find(params.id_kategori)
        if (!kategori) {
        return response.status(404).json({data: 'Resource not found'})
        }
        
        await kategori.delete()
        
        return response.status(200).json("data "+kategori.nama_kategori+" berhasil dihapus")
    }
}

module.exports = KategoriController
