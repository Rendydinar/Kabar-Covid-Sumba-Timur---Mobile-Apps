import {ICCircleDown, ICCircleUp} from 'assets';
import Button from 'components/atoms/Button';
import Gap from 'components/atoms/Gap';
import Input from 'components/atoms/Input';
import {getCovidDataPerkecamatan} from 'config/firebase/fetchData/getCovidDataPerkecamatan';
import {updateCovidDataPerkecamatan} from 'config/firebase/fetchData/updateCovidDataPerkecamatan';
import {IKecamatan, IKelurahan} from 'interfaces';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {fonts, formatDate} from 'utils';
import {showError, showSuccess} from 'utils/showMessage';
import {colors} from '../../../utils/colors';

interface IProps {}
interface IDataToClient {
  date: string;
  kecamatan: IKecamatan[];
}

const UbahDataCovidPerkecamatan: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [dataToClient, setDataToClient] = useState<IDataToClient>();
  const [staticDataToClient, setStaticDataToClient] = useState<IDataToClient>();

  const handleToogle = () => {
    if (open && staticDataToClient) {
      setDataToClient(staticDataToClient);
    }
    setOpen(!open);
  };

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
    kecamatanName: string,
    indexKecamatan: number,
    kelurahanName: string,
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
          name: kelurahanName,
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
          name: kecamatanName,
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
      setStaticDataToClient({
        date: responseGetCovidDataPerkecamatan.date,
        kecamatan: responseGetCovidDataPerkecamatan.data,
      });
    } catch (err) {
      showError(err.message);
    }
    setLoadingFetch(false);
  };

  useEffect(() => {
    async function funcAsynDefault() {
      await getDataCovidPerkecamatan();
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
        <Text style={styles.titleBtnToogle}>Ubah Data Covid Perkecamatan</Text>
        {open ? <ICCircleDown /> : <ICCircleUp />}
      </TouchableOpacity>
      <Collapsible collapsed={open} style={styles.collapseWrapper}>
        {dataToClient && (
          <>
            <Text style={styles.terkahirUpdate}>
              Terakhir Update: {dataToClient.date}
            </Text>
            <Text style={styles.waktuUpdate}>Waktu Update:</Text>
            <DatePicker date={date} onDateChange={setDate} mode="date" />
            {dataToClient.kecamatan.map(
              (kecamatan: IKecamatan, indexKecamatan: number) => (
                <View style={styles.containerItemForm} key={indexKecamatan}>
                  <Text style={styles.titleContainerItemForm}>
                    {kecamatan.name}
                  </Text>
                  {kecamatan.kelurahan.map(
                    (kelurahan: IKelurahan, indexKelurahan: number) => (
                      <Input
                        key={indexKelurahan}
                        label={kelurahan.name}
                        value={String(kelurahan.total)}
                        onChangeText={value =>
                          handleOnChange(
                            kecamatan.name,
                            indexKecamatan,
                            kelurahan.name,
                            indexKelurahan,
                            value
                          )
                        }
                        type="numeric"
                      />
                    )
                  )}
                  <Gap height={10} />
                </View>
              )
            )}
          </>
        )}
        <Gap height={40} />
        <Button title="Kirim" onPress={handleSubmit} />
        <Gap height={20} />
      </Collapsible>
    </View>
  );
};

export default UbahDataCovidPerkecamatan;

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
});
