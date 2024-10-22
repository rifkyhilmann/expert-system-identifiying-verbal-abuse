const db = require('../../config/db')

exports.deletePenyakit = (req, res) => {
    const {kd_penyakit} = req.params
    const sql = 'DELETE FROM penyakit WHERE kd_penyakit = ?';

    db.query(sql, [kd_penyakit], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Gagal menghapus penyakit', details: err.message });
        }
        res.status(200).json({ message: 'Penyakit berhasil dihapus' });
    });
}

exports.deleteGejala = (req, res) => {
    const {id_gejala} = req.params
    const sql = 'DELETE FROM gejala WHERE id_gejala = ?';

    db.query(sql, [id_gejala], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Gagal menghapus penyakit', details: err.message });
        }
        res.status(200).json({ message: 'Penyakit berhasil dihapus' });
    });
}

exports.deleteBasisKasus = (req, res) => {
    const {kd_penyakit} = req.params

    const sql = 'DELETE FROM basis_kasus WHERE kd_penyakit = ?'

    db.query(sql, [kd_penyakit], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Gagal menghapus basis kasus', details: err.message });
        }
        res.status(200).json({ message: 'Basis berhasil dihapus' });
    })
}

exports.deleteKonsultasi = (req, res) => {
    const { id_konsultasi } = req.params; // Mengambil id_konsultasi dari parameter URL

    const query = `
        DELETE FROM hasil_konsultasi
        WHERE id_konsultasi = ?;
    `;

    db.query(query, [id_konsultasi], (err, result) => {
        if (err) {
            res.status(500).send('Database query error');
            console.log('Error executing query:', err);
        } else {
            if (result.affectedRows > 0) {
                res.status(200).send(`Konsultasi dengan ID ${id_konsultasi} berhasil dihapus.`);
            } else {
                res.status(404).send(`Konsultasi dengan ID ${id_konsultasi} tidak ditemukan.`);
            }
        }
    });
};
