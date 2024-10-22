const db = require('../../config/db')

exports.getAllSiswa = (req, res) => {
    const sql = 'SELECT * FROM siswa'
    db.query(sql, (err, results) => {
        if(err) {
            res.status(500).send("Error Fetching Siswa")
        }
        res.status(200).send(results)
    })
}
exports.getAdminById = (req, res) => {
    const {id_admin} = req.params
    const sql = 'SELECT * FROM admin WHERE id_admin = ? '
    db.query(sql,[id_admin], (err, results) => {
        if(err) {
            res.status(500).send("Error Fetching Siswa")
        }
        res.status(200).send(results)
    })
}
exports.getSiswaById = (req, res) => {
    const {id_user} = req.params
    const sql = 'SELECT * FROM siswa WHERE id_user = ? '
    db.query(sql,[id_user], (err, results) => {
        if(err) {
            res.status(500).send("Error Fetching Siswa")
        }
        res.status(200).send(results)
    })
}

exports.getAllAdmin = (req, res) => {
    const sql = 'SELECT * FROM admin'
    db.query(sql, (err, results) => {
        if(err) {
            res.status(500).send("Error Fetching Siswa")
        }
        res.status(200).send(results)
    })
}

exports.adminCount = (req, res) => {
    const sql = 'SELECT COUNT(*) AS total FROM siswa ';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err); // Menambahkan log kesalahan untuk debugging
            return res.status(500).json({ error: 'Error fetching total siswa', details: err.message });
        }
        
        // Mengambil nilai total dari hasil query
        const totalSiswa = results[0].total;
        res.status(200).json({ total: totalSiswa });
    });
}

