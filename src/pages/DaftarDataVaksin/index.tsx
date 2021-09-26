import LoadingIndicator from 'components/atoms/LoadingIndicator';
import {getDataVaksin} from 'config/firebase/fetchData/getDataVaksin';
import {IVaksin} from 'interfaces';
import sortBy from 'lodash/sortBy';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {showError} from 'utils/showMessage';
import styles from './styles';

interface IProps {}

const DaftarDataVaksin: React.FC<IProps> = () => {
  const [data, setData] = useState<IVaksin[]>([]);
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);

  const handleGetDataVaksin = async (): Promise<void> => {
    setLoadingFetch(false);
    try {
      let tempDataVaksin: IVaksin[] = [];
      const responseGetDataVaksin: any = await getDataVaksin();
      responseGetDataVaksin.map((vaksin: any) => {
        tempDataVaksin.push({
          ...vaksin.data(),
        });
      });
      tempDataVaksin = sortBy(tempDataVaksin, 'timestamp').reverse();
      setData(tempDataVaksin);
    } catch (err) {
      showError(err.message);
    }
    setLoadingFetch(false);
  };

  useEffect(() => {
    async function funcAsynDefault() {
      await handleGetDataVaksin();
    }
    funcAsynDefault();
  }, []);

  return loadingFetch ? (
    <View>
      <LoadingIndicator size="large" color="primary" />
    </View>
  ) : (
    <View style={styles.root}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        {data.map((vaksin: IVaksin, index: number) => (
          <View style={styles.containerCardVaksin} key={index}>
            <Text style={styles.indexVaksinCard}>{index + 1}</Text>
            {vaksin.img_url ? (
              <Image source={{uri: vaksin.img_url}} style={styles.imgVaksin} />
            ) : (
              <Text style={styles.waktuVaksin}>Gambar: Tidak ada gambar</Text>
            )}
            <Text style={styles.waktuVaksin}>
              Jenis vaksin: {vaksin.jenis_vaksin}
            </Text>
            <Text style={styles.waktuVaksin}>Waktu Mulai: {vaksin.date}</Text>
            {vaksin.waktu_berakhir_timestamp ? (
              <Text style={styles.waktuVaksin}>
                Waktu berakhir: {vaksin.waktu_berakhir_timestamp}
              </Text>
            ) : (
              <></>
            )}
            <Text style={styles.waktuVaksin}>
              Keterangan: {vaksin.keterangan}
            </Text>
            <Text style={styles.waktuVaksin}>Sumber: {vaksin.sumber}</Text>
            {vaksin.kewajiban ? (
              <>
                <Text style={styles.waktuVaksin}>Kewajiban: </Text>
                {vaksin.kewajiban.map(
                  (kewajibanItem: string, index: number) => (
                    <Text style={styles.kewajibanVaksin} key={index}>
                      {' - '} {kewajibanItem}
                    </Text>
                  )
                )}
              </>
            ) : (
              <></>
            )}
            {vaksin.place_map ? (
              <Text style={styles.waktuVaksin}>
                Place map: {vaksin.place_map}
              </Text>
            ) : (
              <></>
            )}
            {vaksin.kouta ? (
              <Text style={styles.waktuVaksin}>
                Kouta vaksin: {vaksin.kouta}
              </Text>
            ) : (
              <></>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DaftarDataVaksin;
