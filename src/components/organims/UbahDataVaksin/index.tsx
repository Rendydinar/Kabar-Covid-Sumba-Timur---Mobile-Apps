import {Picker} from '@react-native-picker/picker';
import {ICCircleDown, ICCircleUp} from 'assets';
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
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
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
interface IProps {}
const UbahDataVaksin: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const pickerJenisVaksinRef: any = useRef();
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILVaksinNull);
  const [dateVaksin, setDateVaksin] = useState(new Date());
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [data, setData] = useState<IVaksin[]>([]);
  const [form, setForm] = useState<IFormTambahDataVaksin>({
    keterangan: '',
    sumber: '',
    img_uri: '',
    jenis_vaksin: '',
    date: '',
    image_name: '',
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
  const handleToogle = () => {
    if (open && data) {
    }
    setOpen(!open);
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
        timestamp: dateVaksin.getTime(),
        date: formatDate(dateVaksin),
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

  const handleChangeDateVaksin = (date: Date) => {
    setDateVaksin(date);
  };

  useEffect(() => {
    async function funcAsynDefault() {
      await handleGetDataVaksin();
    }
    funcAsynDefault();
  }, []);

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
    <View></View>
  ) : (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={handleToogle}
        style={styles.btnToogle}
        activeOpacity={1}>
        <Text style={styles.titleBtnToogle}>Ubah Data Vaksin</Text>
        {open ? <ICCircleDown /> : <ICCircleUp />}
      </TouchableOpacity>
      <Collapsible collapsed={open} style={styles.collapseWrapper}>
        {data.map((vaksin: IVaksin, index: number) => (
          <View style={styles.containerCardVaksin}>
            <Text style={styles.indexVaksinCard}>{index + 1}</Text>
            {vaksin.img_url ? (
              <Image source={{uri: vaksin.img_url}} style={styles.imgVaksin} />
            ) : (
              <Text style={styles.waktuVaksin}>Gambar: Tidak ada gambar</Text>
            )}
            <Text style={styles.waktuVaksin}>
              Jenis vaksin: {vaksin.jenis_vaksin}
            </Text>
            <Text style={styles.waktuVaksin}>Waktu: {vaksin.date}</Text>
            <Text style={styles.waktuVaksin}>
              Keterangan: {vaksin.keterangan}
            </Text>
            <Text style={styles.waktuVaksin}>Sumber: {vaksin.sumber}</Text>
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
                  <Picker.Item label={vaksin} value={vaksin} />
                ))}
              </Picker>
            </View>
            <Input
              label="Keterangan"
              value={String(form.keterangan)}
              onChangeText={value => handleOnChange('keterangan', value)}
            />
            <Input
              label="Sumber"
              value={String(form.sumber)}
              onChangeText={value => handleOnChange('sumber', value)}
            />
            <Text style={styles.waktuVaksin}>Waktu vaksin</Text>
            <DatePicker
              date={dateVaksin}
              onDateChange={date => handleChangeDateVaksin(date)}
              mode="datetime"
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

export default UbahDataVaksin;

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
  avatar: {
    width: '100%',
    height: 350,
    // borderRadius: 110 / 2,
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
    // borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconAddPhoto: {
    // position: 'absolute',
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
    // height: 45,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    // padding: 12,
  },
  // itemJenisVaksin: {
  //   fontSize: 16,
  // },
  containerCardVaksin: {
    marginVertical: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
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
});
