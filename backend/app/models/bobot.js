const db = require('../config/db');

const getTotalBobots = () => {
    return new Promise((resolve, reject) => {
        // Ambil semua bobot dari tabel gejala
        db.query('SELECT b1, b2, b3, b4, b5 FROM gejala', (error, results) => {
            if (error) {
                return reject(error);
            }

            // Hitung total bobot jika diperlukan
            let totalBobots = { b1: 0, b2: 0, b3: 0, b4: 0, b5: 0 };
            results.forEach(row => {
                totalBobots.b1 += row.b1;
                totalBobots.b2 += row.b2;
                totalBobots.b3 += row.b3;
                totalBobots.b4 += row.b4;
                totalBobots.b5 += row.b5;
            });

            resolve(totalBobots);
        });
    });
};

module.exports = getTotalBobots
