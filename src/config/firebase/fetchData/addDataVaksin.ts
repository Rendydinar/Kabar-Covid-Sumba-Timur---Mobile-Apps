import storage from '@react-native-firebase/storage';
import { IFormTambahDataVaksin } from "interfaces";
import { DATA_VAKSIN_COLLECTION } from "../firestore/collection";

export const addDataVaksin =  (data: IFormTambahDataVaksin) => new Promise(async(resolve, reject) => {
  try {
    let url = '';
    if(data.img_uri) {
      const reference = storage().ref(`data-vaksin/${data.image_name}`);
      await reference.putFile(data.img_uri);
      url = await storage().ref(`data-vaksin/${data.image_name}`).getDownloadURL();
    }
    await DATA_VAKSIN_COLLECTION.add({
      keterangan: data.keterangan,
      sumber:data.sumber,
      img_url: url,
      jenis_vaksin: data.jenis_vaksin,
      date: data.date,
      timestamp: data.timestamp,
    })
    resolve({
      success: true,
      data: 'Berhasil tambah data'
    })

  } catch (err) {
    reject(err) 
  }
});

