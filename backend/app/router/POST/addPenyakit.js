const db = require('./../../config/db')


exports.addPenyakit = (req, res) => {
    const { kd_penyakit, nm_penyakit, ket, solusi } = req.body;
    const sql = 'INSERT INTO penyakit (kd_penyakit, nm_penyakit, ket, solusi) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [kd_penyakit, nm_penyakit, ket, solusi], (err, results) => {
        if (err) {
            console.error('Error executing query:', err); // Menambahkan log kesalahan untuk debugging
            return res.status(500).json({ error: 'Gagal menambah penyakit', details: err.message });
        }
        res.status(200).json({ message: 'Tambah penyakit berhasil' });
    });
}

exports.addGejala = (req, res) => {
    const { kd_gejala, nm_gejala, question, b1, b2, b3, b4, b5 } = req.body;
    const sql = 'INSERT INTO gejala (kd_gejala, nm_gejala, question, b1, b2, b3, b4, b5) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(sql, [kd_gejala, nm_gejala, question, b1, b2, b3, b4, b5], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.status(200).json({ message: 'Gejala added successfully', data: results });
    });
}

exports.addBasisKasus = (req, res) => {
    const { kd_penyakit, id_gejala } = req.body;

    if (!Array.isArray(id_gejala) || id_gejala.length === 0) {
        return res.status(400).send("ID Gejala harus berupa array dan tidak boleh kosong.");
    }

    const sql = 'INSERT INTO basis_kasus (kd_penyakit, id_gejala) VALUES ?';
    
    const values = id_gejala.map(id => [kd_penyakit, id]);

    // Menjalankan query
    db.query(sql, [values], (err, results) => {
        if (err) {
            console.error(err); // Untuk debugging
            return res.status(500).send("Gagal Menambahkan Data");
        }
        res.status(200).send("Data Berhasil Di Tambahkan");
    });
}