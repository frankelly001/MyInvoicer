import {zodResolver} from '@hookform/resolvers/zod';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Control, useForm} from 'react-hook-form';
import {BackHandler, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ZodType} from 'zod';
import {
  AppButton,
  AppHeader,
  AppLoading,
  AppNumberTab,
  AppScreen,
} from '../../../../../components';
import {SCREEN_WIDTH} from '../../../../../config/const';
import {AllInputFields} from '../../../../../types/Fields';
import {toCamelCase} from '../../../../../utils/helpers/toCamelCase';
import {FormType} from '../type';
import AddItemsForm from './add-Items';
import BillInfoForm from './bill-info';
import OtherInfoForm from './other-info';
import {GeneralBillFormSchemaType, generalBillFormSchema} from './schema';
import {createInvoicestyles} from './styles';
import {BillType} from '../../../../../types/Billing';
import {FormValidationShemaType} from '../../../../../types/Form';

type BillFormFormProps<T extends ZodType<any, any, any>> = {
  billType: BillType;
  formType: FormType;
  validationShema: T;
  inputFields: {
    billInfo: AllInputFields<FormValidationShemaType<T>>;
    otherInfo: AllInputFields<FormValidationShemaType<T>>;
  };
  defaultValues?: FormValidationShemaType<T> & GeneralBillFormSchemaType;
  onSubmit: (props: {
    values: FormValidationShemaType<T> & GeneralBillFormSchemaType;
    reset: () => void;
  }) => void;
  isLoading?: boolean;
  disabledFields?: (keyof (FormValidationShemaType<T> &
    GeneralBillFormSchemaType))[];
  disableImportFrom?: boolean;
};

const getTabErrorIndex = ({
  allErrors,
  fields,
}: {
  fields: {
    billInfo: string[];
    addItems: string[];
    otherInfo: string[];
  };
  allErrors: string[];
}) => [
  ...(fields.billInfo.some(el => allErrors.includes(el.toString())) ? [0] : []),
  ...(fields.addItems.some(el => allErrors.includes(el)) ? [1] : []),
  ...(fields.otherInfo.some(el => allErrors.includes(el.toString()))
    ? [2]
    : []),
];

const BillFormScreen = <T extends ZodType<any, any, any>>({
  inputFields: {billInfo, otherInfo},
  billType,
  validationShema,
  defaultValues,
  onSubmit = () => null,
  isLoading,
  formType,
  disabledFields,
  disableImportFrom,
}: BillFormFormProps<T>) => {
  const scrollRef = useRef<ScrollView>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const schema = generalBillFormSchema.and(validationShema);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  console.log(errors?.items);

  const styles = createInvoicestyles();
  const billInfoFieldNames = [
    ...billInfo.map(el => el.name),
    'billFrom',
    'fullname',
    'email',
    'phone',
    'address',
  ] as string[];
  const otherInfoFieldNames = otherInfo.map(el => el.name) as string[];

  const allErrors = Object.keys(errors);

  const navigation = useNavigation();

  const createFields = [
    {name: `${toCamelCase(billType)} info`},
    {name: 'Add items'},
    {name: 'Other info '},
  ];

  const Form1 = (
    <BillInfoForm
      key={1}
      billType={billType}
      control={control}
      disabledFields={disabledFields}
      disableImportFrom={disableImportFrom}
      fields={billInfo as any}
    />
  );
  const Form2 = (
    <AddItemsForm
      key={2}
      billType={billType}
      control={control as Control<any>}
    />
  );
  const Form3 = (
    <OtherInfoForm
      key={3}
      billType={billType}
      control={control}
      fields={otherInfo as any}
    />
  );

  useEffect(() => {
    scrollRef?.current?.scrollTo({
      animated: true,
      y: 0,
      x: SCREEN_WIDTH * selectedIndex,
    });
  }, [selectedIndex]);

  const handleBackPress = () => {
    !selectedIndex ? navigation.goBack() : setSelectedIndex(index => index - 1);
  };

  useFocusEffect(
    useCallback(() => {
      const onBackHandler = () => {
        handleBackPress();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackHandler);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackHandler);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIndex]),
  );

  return (
    <AppScreen isScrollable={false}>
      <AppLoading visible={isLoading} />
      <AppHeader
        leftTitle={!selectedIndex ? 'Cancel' : 'Back'}
        middleTitle={`${formType} ${billType}`}
        rightTitle={selectedIndex !== 2 ? 'Next' : ''}
        onPressRight={() =>
          setSelectedIndex(selectedIndex > 1 ? 0 : selectedIndex + 1)
        }
        onPressLeft={handleBackPress}
      />
      <AppNumberTab
        tabs={createFields}
        selectedIndex={selectedIndex}
        onChangeTab={index => setSelectedIndex(index)}
        tabErrorIndex={getTabErrorIndex({
          allErrors,
          fields: {
            billInfo: billInfoFieldNames,
            addItems: ['items'],
            otherInfo: otherInfoFieldNames,
          },
        })}
      />

      <ScrollView
        ref={scrollRef}
        scrollEnabled={false}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {[Form1, Form2, Form3]}
      </ScrollView>

      {selectedIndex === 2 && (
        <View style={styles.previewBtn}>
          <AppButton
            text="Preview"
            borderWidth={1.5}
            onPress={handleSubmit(data => onSubmit({values: data, reset}))}
            borderColor="highlight_5"
            style={styles.btn}
          />
        </View>
      )}
    </AppScreen>
  );
};

export default BillFormScreen;
