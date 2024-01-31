import { create } from 'zustand';

interface SignUpFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  residence: string;
}

type SignUpFormKeys = keyof SignUpFormState;

interface SignUpStore {
  signUpForm: SignUpFormState;
  setValue: (id: SignUpFormKeys, value: string) => void;
}

const useSignUpStore = create<SignUpStore>((set) => ({
  signUpForm: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    residence: '',
  },
  setValue: (id, value) =>
    set((state) => ({
      signUpForm: { ...state.signUpForm, [id]: value },
    })),
}));

export default useSignUpStore;
