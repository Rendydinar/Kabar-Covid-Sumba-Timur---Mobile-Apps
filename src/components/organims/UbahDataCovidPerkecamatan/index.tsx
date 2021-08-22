import Button from 'components/atoms/Button';
import Gap from 'components/atoms/Gap';
import Input from 'components/atoms/Input';
import {getCovidDataPerkecamatan} from 'config/firebase/fetchData/getCovidDataPerkecamatan';
import {updateCovidDataPerkecamatan} from 'config/firebase/fetchData/updateCovidDataPerkecamatan';
import {IKecamatan, IKelurahan} from 'interfaces';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {fonts, formatDate} from 'utils';
import {colors} from 'utils/colors';
import {showError, showSuccess} from 'utils/showMessage';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {DAFTAR_KECAMATAN} from 'contants';
import LoadingIndicator from 'components/atoms/LoadingIndicator';

interface IProps {}
interface IDataToClient {
  date: string;
  kecamatan: IKecamatan[];
}

const UbahDataCovidPerkecamatan: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const pickerJenisVaksinRef: any = useRef();
  const [date, setDate] = useState(new Date());
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);
  const [dataToClient, setDataToClient] = useState<IDataToClient>();
  const [selectedKecamatanName, setSelectedKecamatanName] =
    useState<string>('');
  const [selectedKecamatan, setSelectedKecamatan] = useState<IKecamatan[]>([]);

  const handleSubmit = async () => {
    if (dataToClient) {
      dispatch({
        type: 'SET_LOADING',
        value: true,
      });
      try {
        // update
        await updateCovidDataPerkecamatan({
          date: formatDate(date),
          data: dataToClient.kecamatan,
        });
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        showSuccess('Berhasil Update Data');
        await getDataCovidPerkecamatan();
      } catch (err) {
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        showError(err.message);
      }
    }
  };

  const handleOnChange = (
    indexKecamatan: number,
    indexKelurahan: number,
    value: string
  ) => {
    if (dataToClient) {
      const kelurahanUpdated: any = [
        ...dataToClient.kecamatan[indexKecamatan].kelurahan.slice(
          0,
          indexKelurahan
        ),
        {
          ...dataToClient.kecamatan[indexKecamatan].kelurahan[indexKelurahan],
          total: Number(value),
        },
        ...dataToClient.kecamatan[indexKecamatan].kelurahan.slice(
          indexKelurahan + 1,
          dataToClient.kecamatan[indexKecamatan].kelurahan.length
        ),
      ];

      const kecamatanUpdated: any = [
        ...dataToClient.kecamatan.slice(0, indexKecamatan),
        {
          ...dataToClient.kecamatan[indexKecamatan],
          kelurahan: kelurahanUpdated,
        },
        ...dataToClient.kecamatan.slice(
          indexKecamatan + 1,
          dataToClient.kecamatan.length
        ),
      ];
      const tempDataResult: any = {
        ...dataToClient,
        kecamatan: kecamatanUpdated,
      };
      setDataToClient(tempDataResult);
    }
  };

  const handleChangeShowKecamatan = (
    isShow: boolean,
    indexKecamatan: number
  ) => {
    if (dataToClient) {
      const kecamatanUpdated: any = [
        ...dataToClient.kecamatan.slice(0, indexKecamatan),
        {
          ...dataToClient.kecamatan[indexKecamatan],
          isShow: !isShow,
        },
        ...dataToClient.kecamatan.slice(
          indexKecamatan + 1,
          dataToClient.kecamatan.length
        ),
      ];
      const tempDataResult: any = {
        ...dataToClient,
        kecamatan: kecamatanUpdated,
      };
      setDataToClient(tempDataResult);
    }
  };

  const handleChangeShowKelurahan = (
    isShow: boolean,
    indexKecamatan: number,
    indexKelurahan: number
  ) => {
    if (dataToClient) {
      const kelurahanUpdated: any = [
        ...dataToClient.kecamatan[indexKecamatan].kelurahan.slice(
          0,
          indexKelurahan
        ),
        {
          ...dataToClient.kecamatan[indexKecamatan].kelurahan[indexKelurahan],
          isShow: !isShow,
        },
        ...dataToClient.kecamatan[indexKecamatan].kelurahan.slice(
          indexKelurahan + 1,
          dataToClient.kecamatan[indexKecamatan].kelurahan.length
        ),
      ];

      const kecamatanUpdated: any = [
        ...dataToClient.kecamatan.slice(0, indexKecamatan),
        {
          ...dataToClient.kecamatan[indexKecamatan],
          kelurahan: kelurahanUpdated,
        },
        ...dataToClient.kecamatan.slice(
          indexKecamatan + 1,
          dataToClient.kecamatan.length
        ),
      ];
      const tempDataResult: any = {
        ...dataToClient,
        kecamatan: kecamatanUpdated,
      };
      setDataToClient(tempDataResult);
    }
  };

  const getDataCovidPerkecamatan = async () => {
    setLoadingFetch(true);
    try {
      const responseGetCovidDataPerkecamatan: any =
        await getCovidDataPerkecamatan();
      setDataToClient({
        date: responseGetCovidDataPerkecamatan.date,
        kecamatan: responseGetCovidDataPerkecamatan.data,
      });
      setSelectedKecamatan(responseGetCovidDataPerkecamatan.data);
    } catch (err) {
      showError(err.message);
    }
    setLoadingFetch(false);
  };

  const handleOnChangeJenisVaksin = (kecamatan_name: string) => {
    if (kecamatan_name === 'all') {
      setSelectedKecamatan(dataToClient?.kecamatan ?? []);
    } else {
      setSelectedKecamatanName(kecamatan_name);
      const resultFilterKecamatan =
        dataToClient?.kecamatan.filter(
          (kecamatan: IKecamatan) => kecamatan.name === kecamatan_name
        ) ?? [];
      setSelectedKecamatan(resultFilterKecamatan);
    }
  };

  useEffect(() => {
    async function funcAsynDefault() {
      await getDataCovidPerkecamatan();
    }
    funcAsynDefault();
    // Preventing going back see more: https://reactnavigation.org/docs/preventing-going-back
    navigation.addListener('beforeRemove', e => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(
        'Peringatan',
        'Apakah kamu yakin meninggalkan halaman ini ?',
        [
          {text: 'Tidak', style: 'cancel', onPress: () => {}},
          {
            text: 'Iya',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });

    return () => setLoadingFetch(false);
  }, [navigation]);

  return loadingFetch ? (
    <View>
      <LoadingIndicator size="large" color="primary" />
    </View>
  ) : (
    <View style={styles.root}>
      {dataToClient && selectedKecamatan && (
        <>
          <Text style={styles.terkahirUpdate}>
            Terakhir Update: {dataToClient.date}
          </Text>
          <Text style={styles.waktuUpdate}>Waktu Update:</Text>
          <DatePicker date={date} onDateChange={setDate} mode="date" />
          <View style={styles.containerPickerDaftarKecamatan}>
            <Picker
              style={styles.pickerKecamatan}
              ref={pickerJenisVaksinRef}
              selectedValue={selectedKecamatanName}
              onValueChange={(itemValue, itemIndex) =>
                handleOnChangeJenisVaksin(itemValue)
              }>
              {DAFTAR_KECAMATAN.map((kecamatanName: string, index: number) => (
                <Picker.Item
                  label={kecamatanName}
                  value={kecamatanName}
                  key={index}
                />
              ))}
            </Picker>
          </View>

          {selectedKecamatan.map(
            (kecamatan: IKecamatan, indexKecamatan: number) => (
              <View style={styles.containerItemForm} key={indexKecamatan}>
                <View style={styles.containerHeaderItemForm}>
                  <Text style={styles.titleContainerItemForm}>
                    {kecamatan.name}
                  </Text>
                  <Gap width={10} />
                  <Button
                    type="icon-only"
                    icon={kecamatan.isShow ? 'unvisible-eyes' : 'visible-eyes'}
                    onPress={() =>
                      handleChangeShowKecamatan(
                        kecamatan.isShow ?? false,
                        indexKecamatan
                      )
                    }
                  />
                </View>
                {kecamatan.kelurahan.map(
                  (kelurahan: IKelurahan, indexKelurahan: number) => (
                    <View
                      style={styles.containerHeaderItemForm}
                      key={indexKelurahan}>
                      <Input
                        label={kelurahan.name}
                        value={String(kelurahan.total)}
                        onChangeText={value =>
                          handleOnChange(indexKecamatan, indexKelurahan, value)
                        }
                        type="numeric"
                        endIcon={
                          <Button
                            type="icon-only"
                            icon={
                              kelurahan.isShow
                                ? 'unvisible-eyes'
                                : 'visible-eyes'
                            }
                            onPress={() =>
                              handleChangeShowKelurahan(
                                kelurahan.isShow ?? false,
                                indexKecamatan,
                                indexKelurahan
                              )
                            }
                          />
                        }
                      />
                    </View>
                  )
                )}
                <Gap height={10} />
              </View>
            )
          )}
        </>
      )}
      <Gap height={40} />
      <Button isShowPrompt={true} title="Kirim" onPress={handleSubmit} />
      <Gap height={20} />
    </View>
  );
};

export default UbahDataCovidPerkecamatan;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerItemForm: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  titleContainerItemForm: {
    fontSize: 20,
    fontFamily: fonts.primary[700],
    color: colors.primary,
  },
  waktuUpdate: {
    fontSize: 14,
    fontFamily: fonts.primary[800],
  },
  terkahirUpdate: {
    fontSize: 16,
    fontFamily: fonts.primary[800],
    textDecorationLine: 'underline',
    marginBottom: 10,
    color: colors.red2,
  },
  containerHeaderItemForm: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerIconAction: {
    marginRight: 20,
  },
  containerPickerDaftarKecamatan: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
  },
  pickerKecamatan: {
    fontSize: 16,
  },
});
