const db = require('./../../config/db')

exports.upadateAdmin = (req, res) => {
    const {id_admin} = req.params
    const {nm_admin, username, password} = req.body

    const sql = 'UPDATE admin SET nm_admin = ?, username = ?, password = ? WHERE id_admin = ? '

    db.query(sql, [nm_admin, username, password, id_admin], (err, results) => {
        if (err) {
            console.error('Error executing query:', err); 
            return res.status(500).json({ error: 'Gagal memperbarui data admin', details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'admin tidak ditemukan' });
        }
        res.status(200).json({ message: 'Admin berhasil diperbarui' });
    })
}

exports.updateSiswa = (req, res) => {
    const {id_user} = req.params
    const {username, password, nm_lengkap, jns_kelamin, alamat, no_hp} = req.body

    const sql = 'UPDATE siswa SET username = ?, password = ?, nm_lengkap = ?, jns_kelamin = ?, alamat = ?, no_hp = ? WHERE id_user = ?'

    db.query(sql, [username, password, nm_lengkap, jns_kelamin, alamat, no_hp, id_user], (err, results) => {
        if (err) {
            console.error('Error executing query:', err); 
            return res.status(500).json({ error: 'Gagal memperbarui data Siswa', details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'siswa tidak ditemukan' });
        }
        res.status(200).json({ message: 'SIswa berhasil diperbarui' });
    })
}