import { IUbahDataIsolasi } from "interfaces";
import { DATA_ISOLASI_COLLECTION } from "../firestore/collection";


export const updateIsolasiData =  (data: IUbahDataIsolasi) => new Promise(async(resolve, reject) => {
  try {
    await DATA_ISOLASI_COLLECTION.doc('data').set({
      last_update: data.date
    });
    await DATA_ISOLASI_COLLECTION.doc('data').collection(data.date).doc('rawat_rsud').set({
      menunggu_hasil_pcr: data.data.rawat_rsud.menunggu_hasil_pcr,
      nama_tempat: data.data.rawat_rsud.nama_tempat,
      place_map: data.data.rawat_rsud.place_map,
      terkonfirmasi: data.data.rawat_rsud.terkonfirmasi
    });
    await DATA_ISOLASI_COLLECTION.doc('data').collection(data.date).doc('isolasi_terpusat').set({
      data: data.data.isolasi_terpusat.data
    });
    await DATA_ISOLASI_COLLECTION.doc('data').collection(data.date).doc('isolasi_mandiri').set({
      kasus_terkonfirmasi: data.data.isolasi_mandiri.kasus_terkonfirmasi,
      nama_tempat: data.data.isolasi_mandiri.nama_tempat,
      place_map: data.data.isolasi_mandiri.place_map,
    });

    resolve({
      success: true,
      data: 'Berhasil ubah data'
    })
  } catch (err) {
    reject(err) 
  }
});
