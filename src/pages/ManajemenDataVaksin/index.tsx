import Button from 'components/atoms/Button';
import TambahDataVaksin from 'components/organims/TambahDataVaksin';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from 'utils/colors';
import {fonts} from 'utils/fonts';

interface IProps {
  navigation: any;
}

const ManajemenDataVaksin: React.FC<IProps> = props => {
  const gotoPage = (pageName: string) => {
    props.navigation.navigate(pageName);
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        {/* <TouchableOpacity
          style={styles.root}
          onPress={() => gotoPage('DaftarDataVaksin')}>
          <Text>Lihat Data Vaksin</Text>
        </TouchableOpacity> */}
        <Button
          title="Lihat Data Vaksin"
          onPress={() => gotoPage('DaftarDataVaksin')}
        />
        <View style={styles.content}>
          <TambahDataVaksin />
        </View>
      </View>
    </ScrollView>
  );
};

export default ManajemenDataVaksin;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  content: {
    paddingTop: 14,
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
