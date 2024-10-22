const db = require('../../config/db')

exports.siswaCount = (req, res) => {
    const sql = 'SELECT COUNT(*) AS total FROM siswa '
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err); 
            return res.status(500).json({ error: 'Error fetching total siswa', details: err.message });
        }
        
        const totalSiswa = results[0].total;
        res.status(200).json({ total: totalSiswa });
    });
}