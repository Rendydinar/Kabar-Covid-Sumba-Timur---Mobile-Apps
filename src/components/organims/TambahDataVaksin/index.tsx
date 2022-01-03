import {Picker} from '@react-native-picker/picker';
import {ICAddPhoto, ICCloseOutline, ICRemovePhoto} from 'assets/icon';
import {ILVaksinNull} from 'assets/illustration';
import Button from 'components/atoms/Button';
import Gap from 'components/atoms/Gap';
import Input from 'components/atoms/Input';
import {addDataVaksin} from 'config/firebase/fetchData/addDataVaksin';
import {DAFTAR_VAKSIN_COVID} from 'contants';
import {IFormTambahDataVaksin} from 'interfaces';
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
const TambahDataVaksin: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const pickerJenisVaksinRef: any = useRef();
  const pickerVerfikasiVaksinRef: any = useRef();
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILVaksinNull);
  const [dateMulaiVaksin, setDateMulaiVaksin] = useState(new Date());
  const [dateBerakhirVaksin, setDateBerakhirVaksin] = useState(new Date());
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);
  const [isOpenInputKewajiban, setIsOpenInputKewajiban] =
    useState<boolean>(true);
  const [kewajibanValue, setKewajibanValue] = useState<string>('');
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
    is_verified: false,
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

  const handleOnChangeJenisVaksin = (vaksin: string) => {
    setForm({
      ...form,
      jenis_vaksin: vaksin,
    });
  };

  const handleOnChangeVerifikasiVaksin = (statusVerifikasi: boolean) => {
    setForm({
      ...form,
      is_verified: statusVerifikasi,
    });
  };

  const handleChangeDateMulaiVaksin = (date: Date) => {
    setDateMulaiVaksin(date);
  };

  const handleChangeDateBerakhirVaksin = (date: Date) => {
    setDateBerakhirVaksin(date);
  };

  useEffect(() => {
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

  const handleSubmitInputKewajiban = (): void => {
    setForm({
      ...form,
      kewajiban: [...(form?.kewajiban ?? []), kewajibanValue],
    });
    handleCancelInputKewajiban();
  };

  const handleCancelInputKewajiban = () => {
    setKewajibanValue('');
    setIsOpenInputKewajiban(false);
  };

  const handleOpenInputKewajiban = (): void => {
    setIsOpenInputKewajiban(true);
  };

  const handleChangeKewajibanValue = (value: string) => {
    setKewajibanValue(value);
  };

  const handleRemoveKewajibanItem = (index: number) => {
    setForm({
      ...form,
      kewajiban: [
        ...form.kewajiban.slice(0, index),
        ...form.kewajiban.slice(index + 1, form.kewajiban.length),
      ],
    });
  };

  return loadingFetch ? (
    <View>
      <LoadingIndicator size="large" color="primary" />
    </View>
  ) : (
    <View style={styles.root}>
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
          <Text style={styles.waktuVaksin}>Apakah terverifikasi</Text>
          <View style={styles.containerPickerJenisVaksin}>
            <Picker
              style={styles.pickerJenisVaksin}
              ref={pickerVerfikasiVaksinRef}
              selectedValue={form.is_verified}
              onValueChange={(itemValue, itemIndex) =>
                handleOnChangeVerifikasiVaksin(itemValue)
              }>
              <Picker.Item label={'Sudah'} value={true} />
              <Picker.Item label={'Belum'} value={false} />
            </Picker>
          </View>
          <Text
            style={{
              marginBottom: 10,
            }}>
            Kewjiban:{' '}
          </Text>
          {form.kewajiban.map((kewajiban: string, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <Text style={styles.kewajibanVaksin} key={index}>
                {' - '} {kewajiban}
              </Text>
              <TouchableOpacity
                onPress={() => handleRemoveKewajibanItem(index)}>
                <ICCloseOutline />
              </TouchableOpacity>
            </View>
          ))}
          {isOpenInputKewajiban && (
            <View>
              <Input
                label={`Kewajiban-${form.kewajiban.length + 1}`}
                value={kewajibanValue}
                onChangeText={handleChangeKewajibanValue}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={handleSubmitInputKewajiban}
                  disabled={kewajibanValue.length === 0}>
                  <ICAddPhoto style={styles.iconAddPhoto} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancelInputKewajiban}>
                  <ICRemovePhoto style={styles.iconAddPhoto} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <TouchableOpacity onPress={handleOpenInputKewajiban}>
            <ICAddPhoto style={styles.iconAddPhoto} />
          </TouchableOpacity>
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

export default TambahDataVaksin;

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
  avatar: {
    width: '100%',
    height: 350,
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
  kewajibanVaksin: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    marginBottom: 6,
    marginLeft: 5,
  },
});
