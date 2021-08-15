import {ICCircleDown, ICCircleUp} from 'assets';
import Button from 'components/atoms/Button';
import Gap from 'components/atoms/Gap';
import Input from 'components/atoms/Input';
import {getIsolasiData} from 'config/firebase/fetchData/getIsolasiData';
import {updateIsolasiData} from 'config/firebase/fetchData/updateIsolasiData';
import {IIsolasi, IUbahDataIsolasi} from 'interfaces';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {fonts, formatDate} from 'utils';
import {showError, showSuccess} from 'utils/showMessage';
import {colors} from '../../../utils/colors';
interface IProps {}

const UbahDataIsolasi: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const [staticData, setStaticData] = useState<IUbahDataIsolasi>();

  const handleToogle = () => {
    if (open && staticData) {
      setData(staticData);
    }
    setOpen(!open);
  };

  const handleSubmit = async () => {
    dispatch({
      type: 'SET_LOADING',
      value: true,
    });
    try {
      // update data
      await updateIsolasiData({
        date: formatDate(date),
        data: data.data,
      });
      dispatch({
        type: 'SET_LOADING',
        value: false,
      });
      showSuccess('Berhasil Update Data');
      await getDataIsolasi();
    } catch (err) {
      dispatch({
        type: 'SET_LOADING',
        value: false,
      });
      showError(err.message);
    }
  };

  const handleOnChange = (
    typeIsolasi: string,
    field: string,
    value: string,
    index?: number
  ) => {
    if (data) {
      if (index !== undefined) {
        // update data isolasi_terpusat
        const tempDataResult = {
          ...data,
          data: {
            ...data.data,
            [typeIsolasi]: {
              data: [
                ...data.data[typeIsolasi].data.slice(0, index),
                {
                  ...data.data[typeIsolasi].data[index],
                  [field]: Number(value),
                },
                ...data.data[typeIsolasi].data.slice(
                  index + 1,
                  data.data[typeIsolasi].data.length
                ),
              ],
            },
          },
        };
        setData(tempDataResult);
      } else {
        const tempDataResult = {
          ...data,
          data: {
            ...data.data,
            [typeIsolasi]: {
              ...data.data[typeIsolasi],
              [field]: Number(value),
            },
          },
        };
        setData(tempDataResult);
      }
    }
  };

  const getDataIsolasi = async () => {
    setLoadingFetch(true);
    try {
      const responseGetDataIsolasi: any = await getIsolasiData();
      setData(responseGetDataIsolasi);
      setStaticData(responseGetDataIsolasi);
    } catch (err) {
      showError(err.message);
    }
    setLoadingFetch(false);
  };

  useEffect(() => {
    async function funcAsynDefault() {
      await getDataIsolasi();
    }
    funcAsynDefault();
  }, []);

  return loadingFetch ? (
    <View></View>
  ) : (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={handleToogle}
        style={styles.btnToogle}
        activeOpacity={1}>
        <Text style={styles.titleBtnToogle}>Ubah Data Isolasi</Text>
        {open ? <ICCircleDown /> : <ICCircleUp />}
      </TouchableOpacity>
      <Collapsible collapsed={open} style={styles.collapseWrapper}>
        {data && (
          <>
            <Text style={styles.terkahirUpdate}>
              Terakhir Update: {data?.date}
            </Text>
            <Text style={styles.waktuUpdate}>Waktu Update:</Text>
            <DatePicker date={date} onDateChange={setDate} mode="date" />
            <View style={styles.containerItemForm}>
              <Text style={styles.titleContainerItemForm}>Isolasi Mandiri</Text>
              <View>
                <Input
                  label="Kasus terkonfirmasi"
                  value={String(data.data.isolasi_mandiri.kasus_terkonfirmasi)}
                  onChangeText={value =>
                    handleOnChange(
                      'isolasi_mandiri',
                      'kasus_terkonfirmasi',
                      value
                    )
                  }
                  type="numeric"
                />
                <Input
                  label="Place Map"
                  value={String(data.data.isolasi_mandiri.place_map)}
                  onChangeText={value =>
                    handleOnChange('isolasi_mandiri', 'place_map', value)
                  }
                  disable
                />
              </View>
              <Gap height={10} />
            </View>

            <View style={styles.containerItemForm}>
              <Text style={styles.titleContainerItemForm}>
                Isolasi Terpusat
              </Text>
              <View>
                {data.data.isolasi_terpusat.data.map(
                  (isolasiTerpusat: IIsolasi, index: number) => (
                    <View key={index}>
                      <Text style={styles.namaTempatIsolasi}>
                        {isolasiTerpusat.nama_tempat}
                      </Text>
                      <Input
                        label="Kasus terkonfirmasi"
                        value={String(isolasiTerpusat.kasus_terkonfirmasi)}
                        onChangeText={value =>
                          handleOnChange(
                            'isolasi_terpusat',
                            'kasus_terkonfirmasi',
                            value,
                            index
                          )
                        }
                        type="numeric"
                      />
                      <Input
                        label="Place Map"
                        value={isolasiTerpusat.place_map}
                        onChangeText={value =>
                          handleOnChange('isolasi_mandiri', 'place_map', value)
                        }
                        disable
                      />
                    </View>
                  )
                )}
              </View>
              <Gap height={10} />
            </View>

            <View style={styles.containerItemForm}>
              <Text style={styles.titleContainerItemForm}>Rawat RSUD</Text>
              <View>
                <Input
                  label="Terkonfirmasi"
                  value={String(data.data.rawat_rsud.terkonfirmasi)}
                  onChangeText={value =>
                    handleOnChange('rawat_rsud', 'terkonfirmasi', value)
                  }
                  type="numeric"
                />
                <Input
                  label="Menunggu hasil PCR"
                  value={String(data.data.rawat_rsud.menunggu_hasil_pcr)}
                  onChangeText={value =>
                    handleOnChange('rawat_rsud', 'menunggu_hasil_pcr', value)
                  }
                  type="numeric"
                />

                <Input
                  label="Place Map"
                  value={String(data.data.rawat_rsud.place_map)}
                  onChangeText={value =>
                    handleOnChange('rawat_rsud', 'place_map', value)
                  }
                  disable
                />
              </View>
              <Gap height={10} />
            </View>
            <Gap height={40} />
            <Button title="Kirim" onPress={handleSubmit} />
            <Gap height={20} />
          </>
        )}
      </Collapsible>
    </View>
  );
};

export default UbahDataIsolasi;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  btnToogle: {
    height: 40,
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  titleBtnToogle: {
    color: colors.white,
    fontFamily: fonts.primary[700],
    fontSize: 20,
    textAlign: 'center',
  },
  collapseWrapper: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 10,
    paddingTop: 20,
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
  namaTempatIsolasi: {
    fontSize: 16,
    fontFamily: fonts.primary[800],
    color: colors.secondary,
  },
});
