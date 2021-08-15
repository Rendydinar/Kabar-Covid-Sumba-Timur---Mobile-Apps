import { DATA_COVID_COLLECTION } from "../firestore/collection";

export const getCovidData =  () => new Promise(async(resolve, reject) => {
  try {
    const lastUpdate = await DATA_COVID_COLLECTION.doc('data').get();
    const lastUpdatedData = lastUpdate?.data()?.last_update??""
    const dataTotalCovid = await DATA_COVID_COLLECTION.doc('data').collection(`${lastUpdatedData}`).doc('positif_covid').collection('data').doc('data_total').get();  
    const penambahanKasusHarian = await DATA_COVID_COLLECTION.doc('data').collection(`${lastUpdatedData}`).doc('positif_covid').collection('data').doc('penambahan_kasus_harian').get();
    const rapidAntigen = await DATA_COVID_COLLECTION.doc('data').collection(`${lastUpdatedData}`).doc('rapid_antigen').get();
    const tcmPcr = await DATA_COVID_COLLECTION.doc('data').collection(`${lastUpdatedData}`).doc('tcm_pcr').get();

    resolve({
      date: lastUpdatedData,
      data: {
        rapid_antigen: rapidAntigen.data(),
        tcm_pcr: tcmPcr.data(),
        positif_covid: {
          ...dataTotalCovid.data(),
          penambahan_kasus_harian: penambahanKasusHarian.data(),
        }
      }
    })
  } catch (err) {
    reject(err) 
  }
});
