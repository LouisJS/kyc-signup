import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import * as z from 'zod';

import { RootStackParamList } from '../navigation';

import Button from '~/components/button';
import ProgressBar from '~/components/progressBar';
import useSignUpStore from '~/state/signUpStore';

const schema = z.object({
  lastName: z.string().min(2, { message: 'Lastname must be at least 2 characters' }),
});

type FormData = {
  lastName: string;
};

type LastnameScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Lastname'>;

const LastnameScreen = () => {
  const navigation = useNavigation<LastnameScreenNavigationProps>();
  const lastName = useSignUpStore((state) => state.signUpForm.lastName);
  const setValue = useSignUpStore((state) => state.setValue);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      lastName,
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    setValue('lastName', data.lastName);
    navigation.navigate('Email');
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      style={{ flex: 1 }}>
      <ProgressBar value={2 / 6} initialValue={1 / 6} />
      <LinearGradient colors={['#F4EADF', '#FFFFFF']} className="flex flex-1 px-6">
        <Text className="font-raleway-extrabold text-3xl tracking-tighter">
          Merci Jean, quel est votre <Text className="text-primary-default">nom de famille</Text> ?
        </Text>
        <View className="flex-1 justify-center">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-white h-[53px] rounded-lg border-2 border-primary-default p-4"
                placeholder="Lastname"
                placeholderTextColor="#7F8590"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                defaultValue={value}
              />
            )}
            name="lastName"
          />
          {errors.lastName && (
            <Text className="font-inter-medium text-sm text-primary-default mt-1">
              {errors.lastName.message}
            </Text>
          )}
          <Button label="Continuer" onPress={handleSubmit(onSubmit)} className="self-end mt-4" />
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default LastnameScreen;
