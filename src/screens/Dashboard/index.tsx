import React, {useState, useEffect} from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionsCard, TransactionsCardProps } from '../../components/TransactionsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 
{ Text
} from 'react-native'

import { 
  Container, 
  Header,
  HightlightCards,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  Transactions,
  Title,
  TransactionList,
  LogoutButton
} from './styles';

export interface DataListProps extends TransactionsCardProps {
  id: string;
};


export function Dashboard(){
    const [data, setData] = useState<DataListProps[]>([]);

    
    async function loadTransactions(){
      const dataKey = "@gofinances:transactions" //nome da aplicação
      const response = await AsyncStorage.getItem(dataKey) // pegando todas as transações do dataKey
      const transactions = response ? JSON.parse(response) : []; //se transactions receber algum dado transforma em JSON, se não, deixa vázio.
   
      const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) =>{
        const amount = Number(item.amount)
        .toLocaleString('pt-BR', { //transforma o amount em Number //toLocaleString transforma em moeda BRASILEIRA
          style: 'currency',
          currency: 'BRL',

        }) 
  
        const dateFormatted = Intl.DateTimeFormat('pt-BR', { //Configuração da DATA
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));
        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        }
      
      
      
      }) //map percorre pelo JSON //cada item é um DataListProps

      
      setData(transactionsFormatted)

    }
    useEffect(() =>{
      AsyncStorage.removeItem("@goFinances:transactions")
      loadTransactions();
    }, []) //O array fica vazio para ser executado apenas uma vez
  return(
    <Container>
      
        <Header>
          <UserWrapper>

            <UserInfo>
              <Photo source={{ uri:'https://avatars.githubusercontent.com/u/91555797?v=4'}}>

              </Photo>
              <User>
                <UserGreeting>
                  Olá
                </UserGreeting>
                <UserName>
                  Thalyson
                </UserName>
              </User>
            </UserInfo>

            <LogoutButton onPress={() => {}}>

              <Icon name="power"/>
            </LogoutButton>
          </UserWrapper>
        </Header>
        <HightlightCards>

          <HighlightCard
            type="up"  
            title="Entradas" 
            amount="R$17.400,00" 
            lastTransaction="Última transaferência"
          />
          <HighlightCard 
            type="down"
            title="Saídas" 
            amount="R$1.259,00" 
            lastTransaction="Última transaferência"
          />
          <HighlightCard 
            type="total"
            title="Total" 
            amount="R$16141,00" 
            lastTransaction="01 à 16 de abril"/>

        </HightlightCards>

        <Transactions>
          <Title>
            Listagem
          </Title>
          
          <TransactionList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => <TransactionsCard data={item}/>}/>
          

          
        </Transactions>
    </Container>
  )
}

  
