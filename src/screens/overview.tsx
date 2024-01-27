import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../navigation';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>;

export default function Overview() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  return (
    <View className={styles.container}>
      <View className={styles.main}>
        <View>
          <Text className={styles.title}>Hello World</Text>
          <Text className={styles.subtitle}>This is the first page of your app.</Text>
        </View>
        <TouchableOpacity
          className={styles.button}
          onPress={() => navigation.navigate('Details', { name: 'Dan' })}>
          <Text className={styles.buttonText}>Show Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  button: 'items-center bg-indigo-500 rounded-[28px] shadow-md p-4',
  buttonText: 'text-white text-lg font-semibold text-center',
  container: 'flex-1 p-6',
  main: 'flex-1 max-w-[960] justify-between',
  title: 'text-[64px] font-bold',
  subtitle: 'text-4xl text-gray-700',
};
