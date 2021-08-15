import { IFormUbahDataCovid } from "interfaces";
import { DATA_COVID_COLLECTION } from "../firestore/collection";

interface IData extends IFormUbahDataCovid{
  date: string;
}

export const updateCovidData =  (data: IData) => new Promise(async(resolve, reject) => {
  try {
    await DATA_COVID_COLLECTION.doc('data').set({
      last_update: data.date
    });
    await DATA_COVID_COLLECTION.doc('data').collection(data.date).doc('positif_covid').collection('data').doc('data_total').set({
      total_dirawat: data.total_dirawat,
      total_meninggal: data.total_meninggal,
      total_positif: data.total_positif,
      total_sembuh: data.total_sembuh
    });
    await DATA_COVID_COLLECTION.doc('data').collection(data.date).doc('positif_covid').collection('data').doc('penambahan_kasus_harian').set({
      antigen: data.harian_antigen,
      pcr_tcm: data.harian_pcr_tcm
    });
    await DATA_COVID_COLLECTION.doc('data').collection(data.date).doc('rapid_antigen').set({
      negatif: data.rapid_antigen_negatif,
      positif: data.rapid_antigen_positif
    });
    await DATA_COVID_COLLECTION.doc('data').collection(data.date).doc('tcm_pcr').set({
      negatif: data.tcm_prc_negatif,
      positif: data.tcm_prc_positif,
    })

    resolve({
      success: true,
      data: 'Berhasil ubah data'
    })
  } catch (err) {
    reject(err) 
  }
});
