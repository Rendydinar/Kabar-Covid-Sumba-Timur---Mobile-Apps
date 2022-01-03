import storage from '@react-native-firebase/storage';
import {IFormTambahDataVaksin} from 'interfaces';
import {
  DATA_JADWAL_VAKSIN_MESSAGE,
  DATA_VAKSIN_COLLECTION,
} from '../firestore/collection';

export const addDataVaksin = (data: IFormTambahDataVaksin) =>
  new Promise(async (resolve, reject) => {
    try {
      let url = '';
      if (data.img_uri) {
        const reference = storage().ref(`data-vaksin/${data.image_name}`);
        await reference.putFile(data.img_uri);
        url = await storage()
          .ref(`data-vaksin/${data.image_name}`)
          .getDownloadURL();
      }
      const responseAddVaksin = await DATA_VAKSIN_COLLECTION.add({
        keterangan: data.keterangan,
        sumber: data.sumber,
        img_url: url,
        jenis_vaksin: data.jenis_vaksin,
        date: data.date,
        isShow: true,
        isVerified: data.is_verified,
        timestamp: data.timestamp,
        place_map: data.place_map,
        kewajiban: data.kewajiban,
        kouta: data.kouta,
        waktu_berakhir_timestamp: data.waktu_berakhir_timestamp,
      });
      await DATA_JADWAL_VAKSIN_MESSAGE.add({
        vaksin_id: responseAddVaksin.id,
        created_at: new Date(),
        sent_at: null,
        isSent: false,
      });

      resolve({
        success: true,
        data: 'Berhasil tambah data',
      });
    } catch (err) {
      reject(err);
    }
  });
