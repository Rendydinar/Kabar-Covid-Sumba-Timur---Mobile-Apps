import { IKecamatan, IKelurahan } from 'interfaces';
import { DATA_COVID_PER_KECATAMATAN_COLLECTION } from '../firestore/collection';


const processKelurahan = async (kecamatan: any, lastUpdatedData:string):Promise<IKelurahan[]> => {
  const dataKelurahan:IKelurahan[] = []
  const RESPONSE_GET_DATA_KELURAHAN = await DATA_COVID_PER_KECATAMATAN_COLLECTION.doc('data').collection(`${lastUpdatedData}`).doc(`${kecamatan.data().name}`).collection('kelurahan').get()
  RESPONSE_GET_DATA_KELURAHAN.forEach((kelurahan) => {
    dataKelurahan.push({
      name: kelurahan.data().name,
      total: kelurahan.data().total,
      isShow: kelurahan.data().isShow??false,
      isDesa: kelurahan.data().isDesa??false,      
    });
  });

  return dataKelurahan;
}

const processDataKecamatan = (data:any, lastUpdatedData:string) => new Promise(async(resolve) => {
  const dataKecamatan:IKecamatan[] = [];
  for(let index = 0; index < data.docs.length; index++) {
    const kelurahan  = await processKelurahan(data.docs[index],lastUpdatedData)     
    dataKecamatan.push({
      name:  data.docs[index].data().name,
      kelurahan: kelurahan,
      isShow: data.docs[index].data().isShow??false
    });
  }
  resolve(dataKecamatan)
});

export const getCovidDataPerkecamatan = () => new Promise(async(resolve, reject) => {

  try {
    const lastUpdate = await DATA_COVID_PER_KECATAMATAN_COLLECTION.doc('data').get();
    const lastUpdatedData = lastUpdate?.data()?.last_update??""
    const RESPONSE_GET_DATA_PERKECAMATAN = await DATA_COVID_PER_KECATAMATAN_COLLECTION.doc('data').collection(`${lastUpdatedData}`).get();
    const dataKecamatanProcessed = await processDataKecamatan(RESPONSE_GET_DATA_PERKECAMATAN, lastUpdatedData)
    resolve({
      date: lastUpdatedData,
      data: dataKecamatanProcessed
    })
  } catch (err) {
    reject(err) 
  }
});

