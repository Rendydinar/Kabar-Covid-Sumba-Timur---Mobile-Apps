import { DATA_ISOLASI_COLLECTION } from "../firestore/collection";

export const getIsolasiData =  () => new Promise(async(resolve, reject) => {
  try {
    const lastUpdate = await DATA_ISOLASI_COLLECTION.doc('data').get();
    const lastUpdatedData = lastUpdate?.data()?.last_update??""
    const responseGetDataIsolasiRawatRSUD = await DATA_ISOLASI_COLLECTION.doc('data').collection(`${lastUpdatedData}`).doc('rawat_rsud').get();
    const responseGetDataIsolasiTerpusat = await DATA_ISOLASI_COLLECTION.doc('data').collection(`${lastUpdatedData}`).doc('isolasi_terpusat').get();
    const responseGetDataIsolasiMandiri = await DATA_ISOLASI_COLLECTION.doc('data').collection(`${lastUpdatedData}`).doc('isolasi_mandiri').get();
    resolve({
      date: lastUpdatedData,
      data: {
        rawat_rsud: responseGetDataIsolasiRawatRSUD.data(),
        isolasi_terpusat: responseGetDataIsolasiTerpusat.data(),
        isolasi_mandiri: responseGetDataIsolasiMandiri.data(),
      }
    })
  } catch (err) {
    reject(err) 
  }
});
