// import { Firestore } from "../index";
import firestore from '@react-native-firebase/firestore';
export const DATA_COVID_COLLECTION = firestore().collection('/data-covid');
export const DATA_COVID_PER_KECATAMATAN_COLLECTION = firestore().collection('/data-covid-perkecamatan');
export const DATA_VAKSIN_COLLECTION = firestore().collection('/data-vaksin');
export const DATA_ISOLASI_COLLECTION = firestore().collection('/data-isolasi')
