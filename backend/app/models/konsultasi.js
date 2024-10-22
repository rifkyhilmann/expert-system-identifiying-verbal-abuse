const db = require('../config/db');

const getHasilKonsultasi = (id_konsultasi, kode_penyakit) => {
    return new Promise((resolve, reject) => {
        db.query(`
            SELECT SUM(IF(a.id_konsultasi=?, c.b1, 0)) AS j1
            FROM hasil_konsultasi a
            JOIN gejala c ON a.id_gejala = c.id_gejala
            WHERE a.id_gejala IN (
                SELECT b.id_gejala
                FROM basis_kasus b
                WHERE b.kd_penyakit LIKE ?
            )
        `, [id_konsultasi, kode_penyakit], (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return reject(new Error('Hasil query tidak sesuai'));
            }
            // Debugging output
            console.log('Result from query:', results);
            resolve(results[0] || {});
        });
    });
};

module.exports = {
    getHasilKonsultasi,
};
