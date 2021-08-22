import {Picker} from '@react-native-picker/picker';
import {ICAddPhoto, ICRemovePhoto} from 'assets/icon';
import {ILVaksinNull} from 'assets/illustration';
import Button from 'components/atoms/Button';
import Gap from 'components/atoms/Gap';
import Input from 'components/atoms/Input';
import {addDataVaksin} from 'config/firebase/fetchData/addDataVaksin';
import {getDataVaksin} from 'config/firebase/fetchData/getDataVaksin';
import {DAFTAR_VAKSIN_COVID} from 'contants';
import {IFormTambahDataVaksin, IVaksin} from 'interfaces';
import sortBy from 'lodash/sortBy';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {showMessage} from 'react-native-flash-message';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {fonts, formatDate} from 'utils';
import {colors} from 'utils/colors';
import {showError, showSuccess} from 'utils/showMessage';
import {useNavigation} from '@react-navigation/native';
import LoadingIndicator from 'components/atoms/LoadingIndicator';

interface IProps {}
const UbahDataVaksin: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const pickerJenisVaksinRef: any = useRef();
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILVaksinNull);
  const [dateMulaiVaksin, setDateMulaiVaksin] = useState(new Date());
  const [dateBerakhirVaksin, setDateBerakhirVaksin] = useState(new Date());
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);
  const [data, setData] = useState<IVaksin[]>([]);
  const [form, setForm] = useState<IFormTambahDataVaksin>({
    keterangan: '',
    sumber: '',
    img_uri: '',
    jenis_vaksin: '',
    date: '',
    image_name: '',
    place_map: '',
    kewajiban: [],
    kouta: 0,
    waktu_berakhir_timestamp: 0,
  });

  const getImageFromGallery = () => {
    let options: any = {
      title: 'You can choose one image',
      includeBase64: true,
      quality: 1,
      storageOptions: {
        skipBackup: true,
      },
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        showMessage({
          message: 'Oops, kamu batal upload foto',
          type: 'default',
          backgroundColor: colors.green3,
          color: colors.white,
        });
      } else {
        if (response.assets) {
          setForm({
            ...form,
            image_name: response.assets[0].fileName ?? '',
            img_uri: response.assets[0].uri ?? '',
          });
          setPhoto({
            uri: response.assets[0].uri,
          });
          setHasPhoto(true);
        }
      }
    });
  };

  const handleSubmit = async () => {
    dispatch({
      type: 'SET_LOADING',
      value: true,
    });
    try {
      // update data here
      await addDataVaksin({
        ...form,
        timestamp: dateMulaiVaksin.getTime(),
        date: formatDate(dateMulaiVaksin),
        waktu_berakhir_timestamp: new Date(dateBerakhirVaksin).getTime(),
      });
      dispatch({
        type: 'SET_LOADING',
        value: false,
      });
      showSuccess('Berhasil Update Data');
      await handleGetDataVaksin();
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

  const handleGetDataVaksin = async () => {
    setLoadingFetch(true);
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

  const handleOnChangeJenisVaksin = (vaksin: string) => {
    setForm({
      ...form,
      jenis_vaksin: vaksin,
    });
  };

  const handleChangeDateMulaiVaksin = (date: Date) => {
    setDateMulaiVaksin(date);
  };

  const handleChangeDateBerakhirVaksin = (date: Date) => {
    setDateBerakhirVaksin(date);
  };

  useEffect(() => {
    async function funcAsynDefault() {
      await handleGetDataVaksin();
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

  const handleRemovePhotoVaksin = (): void => {
    setForm({
      ...form,
      image_name: '',
      img_uri: '',
    });
    setPhoto(ILVaksinNull);
    setHasPhoto(false);
  };

  return loadingFetch ? (
    <View>
      <LoadingIndicator size="large" color="primary" />
    </View>
  ) : (
    <View style={styles.root}>
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
              {vaksin.kewajiban.map((kewajibanItem: string, index: number) => (
                <Text style={styles.kewajibanVaksin} key={index}>
                  {' - '} {kewajibanItem}
                </Text>
              ))}
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
            <Text style={styles.waktuVaksin}>Kouta vaksin: {vaksin.kouta}</Text>
          ) : (
            <></>
          )}
        </View>
      ))}
      <View style={styles.containerItemForm}>
        <View>
          <View style={styles.avatarWrapper}>
            <Image source={photo} style={styles.avatar} />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {hasPhoto ? (
              <TouchableOpacity onPress={handleRemovePhotoVaksin}>
                <ICRemovePhoto style={styles.iconAddPhoto} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={getImageFromGallery}>
                <ICAddPhoto style={styles.iconAddPhoto} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.waktuVaksin}>Jenis vaksin</Text>
          <View style={styles.containerPickerJenisVaksin}>
            <Picker
              style={styles.pickerJenisVaksin}
              ref={pickerJenisVaksinRef}
              selectedValue={form.jenis_vaksin}
              onValueChange={(itemValue, itemIndex) =>
                handleOnChangeJenisVaksin(itemValue)
              }>
              {DAFTAR_VAKSIN_COVID.map((vaksin: string, index: number) => (
                <Picker.Item label={vaksin} value={vaksin} key={index} />
              ))}
            </Picker>
          </View>
          <Input
            label="Kouta"
            value={String(form.kouta)}
            onChangeText={value => handleOnChange('kouta', value)}
          />
          <Input
            label="Sumber"
            value={String(form.sumber)}
            onChangeText={value => handleOnChange('sumber', value)}
          />
          <Input
            label="Keterangan"
            value={String(form.keterangan)}
            onChangeText={value => handleOnChange('keterangan', value)}
          />
          <Input
            multiline
            label="Lokasi vaksin"
            value={String(form.place_map)}
            onChangeText={value => handleOnChange('place_map', value)}
          />
          <Text style={styles.waktuVaksin}>Waktu mulai vaksin</Text>
          <DatePicker
            date={dateMulaiVaksin}
            onDateChange={date => handleChangeDateMulaiVaksin(date)}
            mode="datetime"
          />
          <Text style={styles.waktuVaksin}>Waktu berakhir vaksin</Text>
          <DatePicker
            date={dateBerakhirVaksin}
            onDateChange={date => handleChangeDateBerakhirVaksin(date)}
            mode="datetime"
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

export default UbahDataVaksin;

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
  avatar: {
    width: '100%',
    height: 350,
  },
  imgVaksin: {
    width: '100%',
    height: 500,
    resizeMode: 'contain',
  },
  avatarWrapper: {
    width: '100%',
    height: 350,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconAddPhoto: {
    bottom: 8,
    right: 6,
  },
  waktuVaksin: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    marginBottom: 6,
  },
  pickerJenisVaksin: {
    fontSize: 16,
  },
  containerPickerJenisVaksin: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
  },
  containerCardVaksin: {
    marginVertical: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
  },
  indexVaksinCard: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 40 / 2,
    textAlign: 'center',
    fontFamily: fonts.primary[800],
    fontSize: 20,
  },
  kewajibanVaksin: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    marginBottom: 6,
    marginLeft: 5,
  },
});
