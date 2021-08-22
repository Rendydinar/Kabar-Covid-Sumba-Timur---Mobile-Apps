import UbahDataCovid from 'components/organims/UbahDataCovid';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from 'utils/colors';

interface IProps {
  navigation: any;
}

const ManajemenDataCovid: React.FC<IProps> = props => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <View style={styles.content}>
          <UbahDataCovid />
        </View>
      </View>
    </ScrollView>
  );
};

export default ManajemenDataCovid;

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
