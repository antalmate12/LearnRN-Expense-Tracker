import { StyleSheet, View, Text, Alert } from 'react-native';
import Input from './Input';
import { useState } from 'react';
import CustomButton from '../Button';
import { GlobalStyles } from '../../constants/styles';

export default function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount.toString() ?? '',
      isValid: true,
    },
    date: {
      value: defaultValues?.date.toISOString().slice(0, 10) ?? '2023-10-10',
      isValid: true,
    },
    description: { value: defaultValues?.description ?? '', isValid: true },
  });

  function inputChangedHandler(inputKey, text) {
    setInputs((prevInputValues) => {
      return {
        ...prevInputValues,
        [inputKey]: { value: text, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert(
      //   'Invalid input',
      //   'Please make sure you entered a valid amount, date and description!',
      //   [{ text: 'Okay', style: 'cancel' }]
      // );

      setInputs((curInputs) => {
        return {
          amount: { ...curInputs.amount, isValid: amountIsValid },
          date: { ...curInputs.date, isValid: dateIsValid },
          description: { ...curInputs.description, isValid: descriptionIsValid },
        };
      });

      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <>
      <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>

        <View style={styles.inputsRow}>
          <Input
            invalid={!inputs.amount.isValid}
            style={{ flex: 1 }}
            label={'Amount'}
            textInputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: inputChangedHandler.bind(this, 'amount'),
              value: inputs.amount.value,
            }}
          />

          <Input
            invalid={!inputs.date.isValid}
            style={{ flex: 1 }}
            label={'Date'}
            textInputConfig={{
              placeholder: 'YYYY-MM-DD',
              maxLength: 10,
              onChangeText: inputChangedHandler.bind(this, 'date'),
              value: inputs.date.value,
            }}
          />
        </View>

        <Input
          invalid={!inputs.description.isValid}
          label={'Description'}
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangedHandler.bind(this, 'description'),
            value: inputs.description.value,
          }}
        />
      </View>

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Please make sure you entered a valid amount, date and description!
        </Text>
      )}

      <View style={styles.buttons}>
        <CustomButton style={{ flex: 1 }} mode={'flat'} onPress={onCancel}>
          Cancel
        </CustomButton>

        <CustomButton style={{ flex: 1 }} onPress={submitHandler}>
          {submitButtonLabel}
        </CustomButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  form: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: 'center',
    margin: 8,
  },
});
