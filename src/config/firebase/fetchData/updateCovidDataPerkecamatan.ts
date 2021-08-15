import { IKecamatan, IKelurahan } from "interfaces";
import { DATA_COVID_PER_KECATAMATAN_COLLECTION } from "../firestore/collection";

interface IData{
  date: string;
  data: IKecamatan[];
}

export const updateCovidDataPerkecamatan =  (dataUpdated: IData) => new Promise(async(resolve, reject) => {
  try {
    // Update Data
    await DATA_COVID_PER_KECATAMATAN_COLLECTION.doc('data').set({
      last_update: dataUpdated.date
    });
    dataUpdated.data.map( async (kecamatan: IKecamatan) => {
      await DATA_COVID_PER_KECATAMATAN_COLLECTION.doc('data').collection(dataUpdated.date).doc(kecamatan.name.toLocaleLowerCase()).set({
        name: kecamatan.name,        
      });
      kecamatan.kelurahan.map(async(kelurahan: IKelurahan) => {
        await DATA_COVID_PER_KECATAMATAN_COLLECTION.doc('data').collection(dataUpdated.date).doc(kecamatan.name.toLocaleLowerCase()).collection('kelurahan').doc(kelurahan.name.toLocaleLowerCase()).set({
          name: kelurahan.name,
          total: kelurahan.total
        })
      })
    })
    resolve({
      success: true,
      data: 'Berhasil ubah data'
    })
  } catch (err) {
    reject(err) 
  }
});
