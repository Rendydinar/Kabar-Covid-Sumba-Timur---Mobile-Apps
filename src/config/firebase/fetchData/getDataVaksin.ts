import { DATA_VAKSIN_COLLECTION } from "../firestore/collection"

export const getDataVaksin  = () => new Promise(async(resolve, reject) => {
  try {
    const response = await DATA_VAKSIN_COLLECTION.get()
    resolve(response.docs)
  } catch (err) {
    reject(err) 
  }
})
