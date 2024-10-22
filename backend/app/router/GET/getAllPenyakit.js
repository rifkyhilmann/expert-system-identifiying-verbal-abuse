const db = require('../../config/db')

exports.getAllPenyakit = (req, res) => {
    const sql = 'SELECT * FROM penyakit'
    db.query(sql, (err, results) => {
        if(err) {
            res.status(500).send("Error Fetching Siswa")
        }
        res.status(200).send(results)
    })
}
exports.getPenyakitByKode = (req, res) => {
    const {kd_penyakit} = req.params
    const sql = 'SELECT * FROM penyakit WHERE kd_penyakit = ?'
    db.query(sql, [kd_penyakit], (err, results) => {
        if(err) {
            res.status(500).send("Error Fetching Siswa")
        }
        res.status(200).send(results)
    })
}

exports.getAllGejala = (req, res) => {
    const sql = 'SELECT * FROM gejala'
    db.query(sql, (err, results) => {
        if(err) {
            res.status(500).send("Error Fetching Siswa")
        }
        res.status(200).send(results)
    })
}

exports.getGejalaById = (req, res) => {
    const {id_gejala} = req.params
    const sql = 'SELECT * FROM gejala WHERE id_gejala = ?'
    db.query(sql, [id_gejala], (err, results) => {
        if(err) {
            res.status(500).send("Error Fetching Siswa")
        }
        res.status(200).send(results)
    })
}

exports.getAllKonsultasi = (req, res) => {
    const query = `
        SELECT
            hk.id_konsultasi,
            s.nm_lengkap AS nama_siswa,
            DATE_FORMAT(k2.tgl_konsultasi, '%H:%i:%s %d-%m-%Y') AS tgl_konsultasi,
            GROUP_CONCAT(g.nm_gejala SEPARATOR ', ') AS gejala,
            k2.nilai
        FROM
            hasil_konsultasi hk
        JOIN
            siswa s ON hk.id_user = s.id_user
        JOIN
            keterangan k2 ON hk.id_konsultasi = k2.id_konsultasi AND hk.id_user = k2.id_user
        JOIN
            gejala g ON hk.id_gejala = g.id_gejala
        GROUP BY
            hk.id_konsultasi, hk.id_user, k2.tgl_konsultasi, k2.nilai, s.nm_lengkap;
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Database query error');
            console.log('Error executing query:', err);
        } else {
            res.json(results);
        }
    });
};


exports.getKonsultasiByUserId = (req, res) => {
    const userId = req.params.id_user;  // Mengambil id_user dari parameter URL
    const query = `
        SELECT
            hk.id_konsultasi,
            s.nm_lengkap AS nama_siswa,
            k2.tgl_konsultasi,
            GROUP_CONCAT(g.nm_gejala SEPARATOR ', ') AS gejala,
            k2.nilai
        FROM
            hasil_konsultasi hk
        JOIN
            siswa s ON hk.id_user = s.id_user
        JOIN
            keterangan k2 ON hk.id_konsultasi = k2.id_konsultasi AND hk.id_user = k2.id_user
        JOIN
            gejala g ON hk.id_gejala = g.id_gejala
        WHERE
            hk.id_user = ?
        GROUP BY
            hk.id_konsultasi, hk.id_user, k2.tgl_konsultasi, k2.nilai, s.nm_lengkap;
    `;
    
    db.query(query, [userId], (err, results) => {
        if (err) {
            res.status(500).send('Database query error');
            console.log('Error executing query:', err);
        } else {
            res.json(results);
        }
    });
};




exports.getAllBasisKasus = (req, res) => {
    const query = `
        SELECT
            bk.kd_penyakit,
            p.nm_penyakit,
            GROUP_CONCAT(g.nm_gejala SEPARATOR ', ') AS gejala
        FROM
            basis_kasus bk
        JOIN
            penyakit p ON bk.kd_penyakit = p.kd_penyakit
        JOIN
            gejala g ON bk.id_gejala = g.id_gejala
        GROUP BY
            bk.kd_penyakit, p.nm_penyakit;
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Database query error');
            console.log('Error executing query:', err);
        } else {
            const formattedResults = results.map((row, index) => ({
                id: index + 1,
                kd_penyakit : row.kd_penyakit,
                penyakit: row.nm_penyakit + ` (${row.kd_penyakit})`,
                gejala: row.gejala.split(', ').map(gejala => ' ' + gejala),
                
            }));
            res.json(formattedResults);
        }
    });
}

exports.getTotalKonsultasi = (req, res) => {
    const query = `
        SELECT COUNT(DISTINCT hk.id_konsultasi) AS total_konsultasi
        FROM hasil_konsultasi hk;
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Database query error');
            console.log('Error executing query:', err);
        } else {
            res.json({ total_konsultasi: results[0].total_konsultasi });
        }
    });
};


