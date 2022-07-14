import React, {useState, useEffect} from 'react';
import {
  Modal, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native' //Use Modal para criar um modal
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import {CategorySelect} from '../CategorySelect'
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles'

interface FormData {
  name: string;
  amount: string;
}
const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup
  .number()
  .typeError('Informe um valor número')
  .positive('O valor não pode ser negativo')
  .required('O valor é obrigatório')
});

export function Register(){



  const [category, setCategory] = useState({
    key: 'category',
    name: 'categoria',
  });

  const navigation = useNavigation()

  const{
    control,
    handleSubmit,
    reset, //reseta
    formState: {errors}
  } = useForm({
    resolver: yupResolver(schema) 
  })
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [transactionType, setTransactionType] = useState();

  function handleTransactionTypeSelect(type: 'up' | 'dow'){
    setTransactionType(type);
  };
  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false)
  }
  function handleOpenSelectCategory(){
    setCategoryModalOpen(true)
  }
  async function handleRegister(form: FormData){
    if(!transactionType)// ! é se não tem nada dentro de trasanctionType
    return Alert.alert('Selecione o tipo da transação')

    if(category.key === 'category')
    return Alert.alert('Selecione a categoria')

    const newTransaction = {
      id: String(uuid.v4()), //Já transaforma em string o uuid //v4 retorna um hash
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: new Date()
    }
    try {
      const dataKey = "@gofinances:transactions" //nome da aplicação

      const data = await AsyncStorage.getItem(dataKey) //recupera todos os dados do AsyncStorage
      const currentData = data ? JSON.parse(data) : []; //Se tiver alguma coisa no storage converte em OBJ
      const dataFormatted = [
        ...currentData,
        newTransaction
      
      ]

      await AsyncStorage.setItem( dataKey, JSON.stringify(dataFormatted));
      reset()//resetar obj
       setTransactionType('')
       setCategory({
        key: 'category',
        name: 'Categoria'
       });
       navigation.navigate('Listagem')

    } catch (error) {
      console.log(error)
      Alert.alert("Não foi possivel salvar")
      
    }
  }
 

  
  return(
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
      <Container> 
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>

            <InputForm 
              name={"name"}
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}/>
            <InputForm 
              name={"amount"}
              control={control}          
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.name && errors.amount.message}
            />
              <TransactionsTypes>

              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelect('up')}
                isActive={transactionType === 'up'}
              />

                <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect('down')}
                isActive={transactionType === 'down'}
              />

              </TransactionsTypes>
              <CategorySelectButton 
              title={category.name}
              onPress={handleOpenSelectCategory} />
            
            </Fields>
            < Button title="Enviar"
              onPress={handleSubmit(handleRegister)}/>
            <Modal visible={categoryModalOpen}>
              <CategorySelect
                category={category}
                setCategory={setCategory}
                closeCategory={handleCloseSelectCategoryModal}
                />
            </Modal>

        </Form>
      </Container>
    </TouchableWithoutFeedback>
  )
}