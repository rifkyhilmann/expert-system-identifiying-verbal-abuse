const db = require('../../config/db')
const getTotalBobots = require('../../models/bobot')
const konsultasiModel = require('../../models/konsultasi')

exports.hitungFuzzyMamdani = async (req, res) => {
    try {
        const { id_konsultasi } = req.params;

        // Ambil total bobot
        const totalBobots = await getTotalBobots();
        console.log('Total Bobot:', totalBobots);
        
        const total_bobot_p1 = totalBobots.b1;
        const total_bobot_p2 = totalBobots.b2;

        // Ambil hasil konsultasi
        const penyakit1 = await konsultasiModel.getHasilKonsultasi(id_konsultasi, 'P01%');
        const penyakit2 = await konsultasiModel.getHasilKonsultasi(id_konsultasi, 'P02%');

        console.log('Penyakit 1:', penyakit1);
        console.log('Penyakit 2:', penyakit2);

        // Hitung similarity
        const proses1 = penyakit1.j1 / total_bobot_p1;
        const proses2 = penyakit2.j1 / total_bobot_p2;

        console.log('Proses 1:', proses1);
        console.log('Proses 2:', proses2);

        // Membandingkan hasil
        const MAX = Math.max(proses1, proses2);
        console.log('MAX:', MAX);

        // Menentukan hasil berdasarkan nilai tertinggi
        let hasilAkhir;
        if (MAX === proses1) {
            hasilAkhir = 'Penyakit 1';
        } else {
            hasilAkhir = 'Penyakit 2';
        }

        res.json({
            similarity1: proses1,
            similarity2: proses2,
            hasil: hasilAkhir
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}