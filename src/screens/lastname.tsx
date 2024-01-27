import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { RootStackParamList } from '../navigation';

import Button from '~/components/button';
import ProgressBar from '~/components/progressBar';

type LastnameScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Lastname'>;

const LastnameScreen = () => {
  const navigation = useNavigation<LastnameScreenNavigationProps>();
  const [text, setText] = useState<string>('');

  return (
    <>
      <ProgressBar value={2 / 6} initialValue={1 / 6} />
      <LinearGradient colors={['#F4EADF', '#FFFFFF']} className="flex flex-1 px-6">
        <Text className="font-raleway-extrabold text-3xl tracking-tighter">
          Merci Jean, quel est votre <Text className="text-primary-default">nom de famille</Text> ?
        </Text>
        <View className="flex-1 justify-center">
          <TextInput
            className="bg-white h-[53px] rounded-lg border-2 border-primary-default p-4"
            placeholder="Nom"
            placeholderTextColor="#7F8590"
            onChangeText={(newText) => setText(newText)}
            defaultValue={text}
            returnKeyType="next"
          />
          <Button
            label="Continuer"
            onPress={() => navigation.navigate('Email')}
            className="self-end mt-4"
          />
        </View>
      </LinearGradient>
    </>
  );
};

export default LastnameScreen;
