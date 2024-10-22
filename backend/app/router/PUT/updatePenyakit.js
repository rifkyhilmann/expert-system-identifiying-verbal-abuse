const db = require('./../../config/db')

exports.updatePenyakit = (req, res) => {
    const { kd_penyakit } = req.params
    const { nm_penyakit, ket, solusi } = req.body

    const sql = 'UPDATE penyakit SET nm_penyakit = ?, ket = ?, solusi = ? WHERE kd_penyakit = ?';
    
    db.query(sql, [nm_penyakit, ket, solusi, kd_penyakit], (err, results) => {
        if (err) {
            console.error('Error executing query:', err); 
            return res.status(500).json({ error: 'Gagal memperbarui penyakit', details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Penyakit tidak ditemukan' });
        }
        res.status(200).json({ message: 'Penyakit berhasil diperbarui' });
    });
}
exports.updateGejala = (req, res) => {
    const { id_gejala } = req.params;
    const { kd_gejala, nm_gejala, question, b1, b2, b3, b4, b5 } = req.body;

    const sql = 'UPDATE gejala SET kd_gejala = ?, nm_gejala = ?, question = ?, b1 = ?, b2 = ?, b3 = ?, b4 = ?, b5 = ? WHERE id_gejala = ?';

    db.query(sql, [kd_gejala, nm_gejala, question, b1, b2, b3, b4, b5, id_gejala], (err, results) => {
        if (err) {
            console.error('Error executing query:', err); 
            return res.status(500).json({ error: 'Gagal memperbarui gejala', details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Gejala tidak ditemukan' });
        }
        res.status(200).json({ message: 'Gejala berhasil diperbarui' });
    });
}
