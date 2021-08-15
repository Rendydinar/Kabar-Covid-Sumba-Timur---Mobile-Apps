import {ICCircleDown, ICCircleUp} from 'assets';
import Button from 'components/atoms/Button';
import Gap from 'components/atoms/Gap';
import Input from 'components/atoms/Input';
import {getCovidData} from 'config/firebase/fetchData/getCovidData';
import {updateCovidData} from 'config/firebase/fetchData/updateCovidData';
import {IFormUbahDataCovid} from 'interfaces';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import {fonts, formatDate} from 'utils';
import {showError, showSuccess} from 'utils/showMessage';
import {colors} from '../../../utils/colors';

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
  const [date, setDate] = useState(new Date());
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
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

  const handleToogle = () => {
    if (open && data) {
      setForm({
        harian_antigen: data.harian.antigen,
        harian_pcr_tcm: data.harian.pcr_tcm,
        total_dirawat: data.harian.total_dirawat,
        total_meninggal: data.harian.total_meninggal,
        total_positif: data.harian.total_positif,
        total_sembuh: data.harian.total_sembuh,
        rapid_antigen_negatif: data.rapid_antigen.negatif,
        rapid_antigen_positif: data.rapid_antigen.positif,
        tcm_prc_negatif: data.tcm_pcr.negatif,
        tcm_prc_positif: data.tcm_pcr.positif,
      });
    }
    setOpen(!open);
  };

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
  }, []);

  return loadingFetch ? (
    <View></View>
  ) : (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={handleToogle}
        style={styles.btnToogle}
        activeOpacity={1}>
        <Text style={styles.titleBtnToogle}>Ubah Data Covid</Text>
        {open ? <ICCircleDown /> : <ICCircleUp />}
      </TouchableOpacity>
      <Collapsible collapsed={open} style={styles.collapseWrapper}>
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
        <Button title="Kirim" onPress={handleSubmit} />
        <Gap height={20} />
      </Collapsible>
    </View>
  );
};

export default UbahDataCovid;

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
