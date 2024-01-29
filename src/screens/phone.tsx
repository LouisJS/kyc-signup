import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import * as z from 'zod';

import { RootStackParamList } from '../navigation';

import Button from '~/components/button';
import ProgressBar from '~/components/progressBar';
import useSignUpStore from '~/state/signUpStore';

// French phone number regex
const phoneRegex = new RegExp(/^((\+)33|0|0033)[1-9](\d{2}){4}$/g);

const schema = z
  .object({
    phone: z.string().regex(phoneRegex, 'Invalid Phone number'),
  })
  .required();

type FormData = {
  phone: string;
};

type PhoneScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Phone'>;

const PhoneScreen = () => {
  const navigation = useNavigation<PhoneScreenNavigationProps>();
  const phone = useSignUpStore((state) => state.signUpForm.phone);
  const setValue = useSignUpStore((state) => state.setValue);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      phone,
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    setValue('phone', data.phone);
    navigation.navigate('Residence');
  };

  return (
    <>
      <ProgressBar value={4 / 6} initialValue={3 / 6} />
      <LinearGradient colors={['#F4EADF', '#FFFFFF']} className="flex flex-1 px-6">
        <Text className="font-raleway-extrabold text-3xl tracking-tighter">
          Quelle est votre <Text className="text-primary-default">numéro de téléphone</Text> ?
        </Text>
        <View className="flex-1 justify-center">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-white h-[53px] rounded-lg border-2 border-primary-default p-4"
                placeholder="Phone"
                placeholderTextColor="#7F8590"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                dataDetectorTypes="phoneNumber"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
              />
            )}
            name="phone"
          />
          {errors.phone && (
            <Text className="font-inter-medium text-sm text-primary-default mt-1">
              {errors.phone.message}
            </Text>
          )}
          <Button label="Continuer" onPress={handleSubmit(onSubmit)} className="self-end mt-4" />
        </View>
      </LinearGradient>
    </>
  );
};

export default PhoneScreen;
