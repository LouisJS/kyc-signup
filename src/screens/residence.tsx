import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import clsx from 'clsx';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as z from 'zod';

import { RootStackParamList } from '../navigation';

import useFetchResidenceData from '~/api/fetchResidenceData';
import Button from '~/components/button';
import ProgressBar from '~/components/progressBar';
import useSignUpStore from '~/state/signUpStore';

const schema = z
  .object({
    residence: z.string().min(1),
    searchResidence: z.string(),
  })
  .required();

type FormData = {
  residence: string;
  searchResidence: string;
};

type ResidenceScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Residence'>;

const ResidenceScreen = () => {
  const navigation = useNavigation<ResidenceScreenNavigationProps>();
  const residence = useSignUpStore((state) => state.signUpForm.residence);
  const setValue = useSignUpStore((state) => state.setValue);

  const defaultSearchResidence = residence;

  // Form with searchResidenceValue and definitive / selected value for residence
  const {
    control,
    watch,
    handleSubmit,
    setValue: setFormValue,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormData>({
    defaultValues: {
      residence,
      searchResidence: defaultSearchResidence,
    },
    resolver: zodResolver(schema),
  });

  // OnSubmit, save residence data and navigate to Summary
  const onSubmit = (data: FormData) => {
    setValue('residence', data.residence);
    navigation.navigate('Summary');
  };

  // When searchResidenceValue is changed, fetch residence data from Data gouv API
  const searchResidenceValue = watch('searchResidence');
  const { data, loading: isFetchResidenceDataLoading } =
    useFetchResidenceData(searchResidenceValue);

  // Save Selected Item Id to defines background color in residence list
  const [selectedItemId, setSelectedItemId] = useState<string>('');

  // on Select a Residence, update both searchResidence value and residence value
  const selectResidence = async (id: string, selectedResidence: string) => {
    setFormValue('searchResidence', selectedResidence);
    setFormValue('residence', selectedResidence);

    setSelectedItemId(id);

    // Manually trigger form validation
    await trigger();
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      style={{ flex: 1 }}>
      <ProgressBar value={5 / 6} initialValue={4 / 6} />
      <LinearGradient colors={['#F4EADF', '#FFFFFF']} className="flex flex-1 px-6">
        <Text className="font-raleway-extrabold text-3xl tracking-tighter">
          Super ! Quelle est votre{' '}
          <Text className="text-primary-default">adresse de résidence</Text> ?
        </Text>
        <View className="flex-1 justify-center">
          {data && (
            <View className="bg-white rounded-sm">
              {data.features.map((item) => (
                <TouchableOpacity
                  key={item.properties.id}
                  onPress={() => selectResidence(item.properties.id, item.properties.label)}>
                  <View
                    className={clsx(
                      'py-4 pl-4',
                      item.properties.id === selectedItemId && 'bg-grey-150'
                    )}>
                    <Text>{item.properties.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-white h-[53px] rounded-lg border-2 border-primary-default p-4"
                placeholder="Residence"
                placeholderTextColor="#7F8590"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                defaultValue={value}
              />
            )}
            name="searchResidence"
          />
          {errors.residence && (
            <Text className="font-inter-medium text-sm text-primary-default mt-1">
              {errors.residence.message}
            </Text>
          )}
          <View className="flex-row justify-between items-center mt-4">
            <View>
              {isFetchResidenceDataLoading && <ActivityIndicator color="#4D50F4" size="large" />}
            </View>
            <Button label="Continuer" onPress={handleSubmit(onSubmit)} disabled={!isValid} />
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default ResidenceScreen;
