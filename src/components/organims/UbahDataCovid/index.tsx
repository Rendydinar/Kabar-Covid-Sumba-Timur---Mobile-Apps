import Button from 'components/atoms/Button';
import Gap from 'components/atoms/Gap';
import Input from 'components/atoms/Input';
import {getCovidData} from 'config/firebase/fetchData/getCovidData';
import {updateCovidData} from 'config/firebase/fetchData/updateCovidData';
import {IFormUbahDataCovid} from 'interfaces';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {colors, fonts, formatDate} from 'utils';
import {showError, showSuccess} from 'utils/showMessage';
import {useNavigation} from '@react-navigation/native';
import LoadingIndicator from 'components/atoms/LoadingIndicator';

interface IProps {}
interface IData {
  date: string;
  harian: {
    antigen: number;
    pcr_tcm: number;
    total_dirawat: number;
    total_meninggal: number;
    total_positif: number;
    total_sembuh: number;
  };
  rapid_antigen: {
    negatif: number;
    positif: number;
  };
  tcm_pcr: {
    negatif: number;
    positif: number;
  };
}

const UbahDataCovid: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);
  const [data, setData] = useState<IData>();
  const [form, setForm] = useState<IFormUbahDataCovid>({
    harian_antigen: 0,
    harian_pcr_tcm: 0,
    total_dirawat: 0,
    total_meninggal: 0,
    total_positif: 0,
    total_sembuh: 0,
    rapid_antigen_negatif: 0,
    rapid_antigen_positif: 0,
    tcm_prc_negatif: 0,
    tcm_prc_positif: 0,
  });

  const handleSubmit = async () => {
    dispatch({
      type: 'SET_LOADING',
      value: true,
    });
    try {
      await updateCovidData({
        date: formatDate(date),
        harian_antigen: Number(form.harian_antigen),
        harian_pcr_tcm: Number(form.harian_pcr_tcm),
        total_dirawat: Number(form.total_dirawat),
        total_meninggal: Number(form.total_meninggal),
        total_positif: Number(form.total_positif),
        total_sembuh: Number(form.total_sembuh),
        rapid_antigen_negatif: Number(form.rapid_antigen_negatif),
        rapid_antigen_positif: Number(form.rapid_antigen_positif),
        tcm_prc_negatif: Number(form.tcm_prc_negatif),
        tcm_prc_positif: Number(form.tcm_prc_positif),
      });
      dispatch({
        type: 'SET_LOADING',
        value: false,
      });
      showSuccess('Berhasil Update Data');
      await getDataCovid();
    } catch (err) {
      dispatch({
        type: 'SET_LOADING',
        value: false,
      });
      showError(err.message);
    }
  };

  const handleOnChange = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const getDataCovid = async () => {
    setLoadingFetch(true);
    try {
      const responseGetCovidData: any = await getCovidData();
      const tempData = {
        date: responseGetCovidData.date,
        harian: {
          antigen:
            responseGetCovidData.data.positif_covid.penambahan_kasus_harian
              .antigen,
          pcr_tcm:
            responseGetCovidData.data.positif_covid.penambahan_kasus_harian
              .pcr_tcm,
          total_dirawat: responseGetCovidData.data.positif_covid.total_dirawat,
          total_meninggal:
            responseGetCovidData.data.positif_covid.total_meninggal,
          total_positif: responseGetCovidData.data.positif_covid.total_positif,
          total_sembuh: responseGetCovidData.data.positif_covid.total_sembuh,
        },
        rapid_antigen: {
          negatif: responseGetCovidData.data.rapid_antigen.negatif,
          positif: responseGetCovidData.data.rapid_antigen.positif,
        },
        tcm_pcr: {
          negatif: responseGetCovidData.data.tcm_pcr.negatif,
          positif: responseGetCovidData.data.tcm_pcr.positif,
        },
      };
      setForm({
        harian_antigen: tempData.harian.antigen,
        harian_pcr_tcm: tempData.harian.pcr_tcm,
        total_dirawat: tempData.harian.total_dirawat,
        total_meninggal: tempData.harian.total_meninggal,
        total_positif: tempData.harian.total_positif,
        total_sembuh: tempData.harian.total_sembuh,
        rapid_antigen_negatif: tempData.rapid_antigen.negatif,
        rapid_antigen_positif: tempData.rapid_antigen.positif,
        tcm_prc_negatif: tempData.tcm_pcr.negatif,
        tcm_prc_positif: tempData.tcm_pcr.positif,
      });
      setData(tempData);
    } catch (err) {
      showError(err.message);
    }
    setLoadingFetch(false);
  };

  useEffect(() => {
    async function funcAsynDefault() {
      await getDataCovid();
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
      <Text style={styles.terkahirUpdate}>Terakhir Update: {data?.date}</Text>
      <Text style={styles.waktuUpdate}>Waktu Update:</Text>
      <DatePicker date={date} onDateChange={setDate} mode="date" />
      <View style={styles.containerItemForm}>
        <Text style={styles.titleContainerItemForm}>
          Sampel Dikirim/Diperiksa
        </Text>
        <View>
          <Input
            label="TCM / PCR (Positif)"
            value={String(form.tcm_prc_positif)}
            onChangeText={value => handleOnChange('tcm_prc_positif', value)}
            type="numeric"
          />
          <Input
            label="TCM / PCR (Negatif)"
            value={String(form.tcm_prc_negatif)}
            onChangeText={value => handleOnChange('tcm_prc_negatif', value)}
            type="numeric"
          />
          <Input
            label="Rapid antigen (Positif)"
            value={String(form.rapid_antigen_positif)}
            onChangeText={value =>
              handleOnChange('rapid_antigen_positif', value)
            }
            type="numeric"
          />
          <Input
            label="Rapid antigen (Negatif)"
            value={String(form.rapid_antigen_negatif)}
            onChangeText={value =>
              handleOnChange('rapid_antigen_negatif', value)
            }
            type="numeric"
          />
        </View>
        <Gap height={10} />
      </View>
      <View style={styles.containerItemForm}>
        <Text style={styles.titleContainerItemForm}>Positif Covid</Text>
        <View>
          <Input
            label="Penambahan Kasus Harian Antigen"
            value={String(form.harian_antigen)}
            onChangeText={value => handleOnChange('harian_antigen', value)}
            type="numeric"
          />
          <Input
            label="Penambahan Kasus Harian  TCR/PCR"
            value={String(form.harian_pcr_tcm)}
            onChangeText={value => handleOnChange('harian_pcr_tcm', value)}
            type="numeric"
          />
          <Input
            label="Total positif"
            value={String(form.total_positif)}
            onChangeText={value => handleOnChange('total_positif', value)}
            type="numeric"
          />
          <Input
            label="Total dirawat"
            value={String(form.total_dirawat)}
            onChangeText={value => handleOnChange('total_dirawat', value)}
            type="numeric"
          />
          <Input
            label="Total sembuh"
            value={String(form.total_sembuh)}
            onChangeText={value => handleOnChange('total_sembuh', value)}
            type="numeric"
          />
          <Input
            label="Total meninggal"
            value={String(form.total_meninggal)}
            onChangeText={value => handleOnChange('total_meninggal', value)}
            type="numeric"
          />
        </View>
        <Gap height={10} />
      </View>
      <Gap height={40} />
      <Button title="Kirim" isShowPrompt={true} onPress={handleSubmit} />
      <Gap height={20} />
    </View>
  );
};

export default UbahDataCovid;

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
});
