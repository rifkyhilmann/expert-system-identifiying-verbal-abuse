const db = require('../../config/db')

exports.deleteAdmin =  (req, res) => {
    const {id_admin} = req.params
    const sql = 'DELETE FROM admin WHERE id_admin = ?'

    db.query(sql,[id_admin], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Gagal menghapus Admin', details: err.message });
        }
        res.status(200).json({ message: 'Data Admin berhasil dihapus' });
    })
}
exports.deleteSiswa =  (req, res) => {
    const {id_user} = req.params
    const sql = 'DELETE FROM siswa WHERE id_user = ?'

    db.query(sql,[id_user], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Gagal menghapus Admin', details: err.message });
        }
        res.status(200).json({ message: 'Data Siswa berhasil dihapus' });
    })
}

