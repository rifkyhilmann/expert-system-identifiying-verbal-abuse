const express = require('express');
const { getAllSiswa, getAllAdmin, adminCount, getAdminById, getSiswaById } = require('./GET/getAllUser');
const { getAllGejala, getAllBasisKasus, getAllKonsultasi, getAllPenyakit, getPenyakitByKode, getGejalaById, getKonsultasiByUserId, getTotalKonsultasi } = require('./GET/getAllPenyakit');
const { LoginSiswa, LoginAdmin, regisSiswa, regisAdmin } = require('./POST/authUser');
const { addPenyakit, addGejala, addBasisKasus } = require('./POST/addPenyakit');
const { deletePenyakit, deleteGejala, deleteBasisKasus, deleteKonsultasi } = require('./DELETE/deletePenyakit');
const { updatePenyakit, updateGejala } = require('./PUT/updatePenyakit');
const { deleteAdmin, deleteSiswa } = require('./DELETE/deleteUser');
const { upadateAdmin, updateSiswa } = require('./PUT/updateUser');
const { siswaCount } = require('./GET/getCount');
const { hitungFuzzyMamdani } = require('./POST/konsultasi');
const router = express.Router()

router.get('/siswa', getAllSiswa)
router.get('/siswa/:id_user', getSiswaById)
router.get('/siswa-count', siswaCount)
router.get('/admin/count', adminCount)
router.get('/admin', getAllAdmin)
router.get('/admin/:id_admin', getAdminById)
router.get('/penyakit', getAllPenyakit)
router.get('/penyakit/:kd_penyakit', getPenyakitByKode)
router.get('/gejala', getAllGejala)
router.get('/gejala/:id_gejala', getGejalaById)
router.get('/basisKasus', getAllBasisKasus)
router.get('/konsultasi', getAllKonsultasi)
router.get('/konsultasi/:id_user', getKonsultasiByUserId)
router.get('/total-konsultasi', getTotalKonsultasi)

router.post('/siswa', LoginSiswa)
router.post('/regis/siswa', regisSiswa)
router.post('/admin', LoginAdmin)
router.post('/regis/admin', regisAdmin)
router.post('/penyakit', addPenyakit)
router.post('/gejala', addGejala)
router.post('/basisKasus', addBasisKasus)
router.post('/konsultasi/:id_konsultasi', hitungFuzzyMamdani)

router.put('/penyakit/:kd_penyakit', updatePenyakit)
router.put('/gejala/:id_gejala', updateGejala)
router.put('/admin/:id_admin', upadateAdmin)
router.put('/siswa/:id_user', updateSiswa)

router.delete('/penyakit/:kd_penyakit', deletePenyakit)
router.delete('/gejala/:id_gejala', deleteGejala)
router.delete('/admin/:id_admin', deleteAdmin)
router.delete('/siswa/:id_user', deleteSiswa)
router.delete('/basisKasus/:kd_penyakit', deleteBasisKasus)
router.delete('/konsultasi/:id_konsultasi', deleteKonsultasi)

module.exports = router;