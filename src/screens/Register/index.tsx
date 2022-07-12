import React, {useState} from 'react';
import {Modal} from 'react-native' //Use Modal para criar um modal
import {useForm} from 'react-hook-form'

import { Input } from '../../components/Form/Input';
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

export function Register(){
  const [category, setCategory] = useState({
    key: 'category',
    name: 'categoria',
  })

  const{
    control,
    handleSubmit
  } = useForm()
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
  function handleRegister(form: FormData){
    const data = {
      name: form.name,
    amount: form.amount,
    transactionType,
    category: category.key
    }
    console.log(data)
  }

  
  return(
    <Container> 
      <Header>
        <Title>Cadastro</Title>
      </Header>
        <Form>
          <Fields>

            <InputForm 
              name={"name"}
              control={control}
              placeholder="Nome"/>
            <InputForm 
              name={"amount"}
              control={control}          
            placeholder="Preço"/>

            <TransactionsTypes>

              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelect('up')}
                isActive={transactionType === 'up'}/>

                <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect('down')}
                isActive={transactionType === 'down'}/>

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
  )
}