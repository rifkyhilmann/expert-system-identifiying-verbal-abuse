const db = require('../../config/db')

exports.LoginSiswa = (req, res) => {
  const { username, password } = req.body;

  // Periksa apakah username dan password diberikan
  if (!username || !password) {
      return res.status(400).send("Username and Password are required");
  }

  // Buat query untuk memeriksa pengguna
  const sql = `SELECT * FROM siswa WHERE username = ? AND password = ?`;
  db.query(sql, [username, password], (err, results) => {
      if (err) {
          // Jika ada kesalahan dalam query, kirim respons dengan status 500
          return res.status(500).send("Database query error: " + err.message);
      }

      if (results.length === 0) {
          // Jika tidak ada hasil, kirim respons dengan status 401
          return res.status(401).send('Invalid username or password');
      }

      // Jika login berhasil, kirim respons dengan status 200
      return res.status(200).send('Login successful');
  });
}

exports.LoginAdmin = (req, res) => {
    const {username, password} = req.body

    if (!username && !password) {
      res.status(500).send("Username or Password not found")
    }
  
    const sql = `SELECT * FROM admin WHERE username = '${username}' AND password = '${password}'`
    db.query(sql, (err, results) => {
      if (err) {
        res.send(err)
      } 
      if (results.length === 0) {
        return res.status(401).send('Invalid username or password'); // Tidak ada hasil dari query
      }
      res.status(200).send('Login successful')
    })
}

exports.regisSiswa = (req, res) => {
    const {username, password, nm_lengkap, jns_kelamin, alamat, no_hp} = req.body

    const sql = 'INSERT INTO siswa (username, password, nm_lengkap, jns_kelamin, alamat, no_hp) VALUES (?, ?, ?, ?, ?, ?)'
    db.query(sql, [username, password, nm_lengkap, jns_kelamin, alamat, no_hp], (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send('register berhasil')
    })
}
exports.regisAdmin = (req, res) => {
    const {nm_admin, username, password} = req.body

    const sql = 'INSERT INTO admin (nm_admin, username, password) VALUES (?, ?, ?)'
    db.query(sql, [nm_admin, username, password], (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send('register berhasil')
    })
}