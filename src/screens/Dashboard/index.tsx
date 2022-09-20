import React, {useCallback, useState, useEffect} from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionsCard, TransactionsCardProps } from '../../components/TransactionsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native'; //vai mostrar carregando a tela antes de aparecer os dados
import {useFocusEffect} from '@react-navigation/native'
import{useTheme} from 'styled-components'
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
  LogoutButton,
  LoadContainer
} from './styles';
import {useAuth} from '../../hooks/auth'
export interface DataListProps extends TransactionsCardProps {
  id: string;
  
};

interface HightlightProps {
  amount: string; 
  lastTransaction: string;
}
interface HightlightData {
  entries: HightlightProps;
  expensives: HightlightProps;
  total: HightlightProps;
}

export function Dashboard(){
    const [transactions, setTransactions] = useState<DataListProps[]>([]);

    const [isLoading, setIsLoading] = useState('')
  
  const [hightlightData, setHightlightData] = useState<HightlightData[]>({} as HightlightData)



  function getLastTransactionDate(
    collection: DataListProps[], 
    type: 'positive' | 'negative'){

      const collectionFilttered =  collection
      .filter(
        transaction => transaction.type === type) //Conferir se a última transação é positiva
        
        if(collectionFilttered.length === 0){}
       return 0;

     //última transação
     const lastTransaction = 
     new Date(
     Math.max.apply(Math, 
      collectionFilttered.map(transaction => new Date(transaction.date).getTime())) //percorre o transaction e pega apenas a data do transaction
       )
       

       return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month: 'long'})}`
       Intl.DateTimeFormat('pt-BR', { //Configuração da DATA
         day: '2-digit',
         month: '2-digit',
         year: '2-digit'

       }
       )
       .format(new Date(lastTransactionEntriesFormatted));

       console.log(new Date(lastTransactionEntries)) //transformou em data com new Date
         
  }
  const theme = useTheme()
  const{signOut, user} = useAuth();

    
    async function loadTransactions(){
      const dataKey = `@gofinances:transactions_user:${user.id}` //nome da aplicação
      const response = await AsyncStorage.getItem(dataKey) // pegando todas as transações do dataKey
      const transactions = response ? JSON.parse(response) : []; //se transactions receber algum dado transforma em JSON, se não, deixa vázio.
      
      let entriesTotal = 0;
      let expensiveTotal = 0;

      
      
      const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) =>{
        if(item.type === 'positive'){
          entriesTotal += Number(item.amount)
        }else{
          expensiveTotal += Number(item.amount)
        }

        
        const amount = Number(item.amount).toLocaleString('pt-BR', { //transforma o amount em Number //toLocaleString transforma em moeda BRASILEIRA
          style: 'currency',
          currency: 'BRL',

        }) 
        const date = Intl.DateTimeFormat('pt-BR', { //Configuração da DATA
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

      
      setTransactions(transactionsFormatted)
      const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')
      const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative')
      const totalInterval = lastTransactionExpensives === 0 ? 'Não há movimentações' : `01 a ${lastTransactionExpensives}`

      const total = entriesTotal - expensiveTotal
      setHightlightData({
        entries: {
          amount: entriesTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          lastTransaction: lastTransactionEntries === 0 ? 'Não há transações' : `Última entrada dia ${lastTransactionEntries}`

        },
        expensives: {
          amount: expensiveTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }),
        lastTransaction: lastTransactionExpensives ? 'Não há transações' : `Última entrada dia ${lastTransactionExpensives}`,

      },
        total: {amount: total.toLocaleString('pt-BR', {
          style: 'currency', 
          currency: 'BRL',
          

        }),
        lastTransaction: totalInterval
        
      },

    })
    setIsLoading(false)


    }
    useEffect(() =>{
      loadTransactions();
      //const dataKey = "@gofinances:transactions" //limpa a lista
       //const response = AsyncStorage.removeItem(dataKey) // pegando todas as transações do dataKey
    }, []) //O array fica vazio para ser executado apenas uma vez

    useFocusEffect(useCallback(() => {//retorna o obj em tempo real
      
      loadTransactions();

    }, []));

  return(
    
    <Container>
        
       {
        isLoading ? 
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary}
          size="large"/>
          </LoadContainer> :
             
            <>
              <Header>
                <UserWrapper>

                  <UserInfo>
                    <Photo source={{ uri: user.photo}}>

                    </Photo>
                    <User>
                      <UserGreeting>
                        Olá
                      </UserGreeting>
                      <UserName>
                        {user.name}
                      </UserName>
                    </User>
                  </UserInfo>

                  <LogoutButton onPress={signOut}>

                    <Icon name="power"/>
                  </LogoutButton>
                </UserWrapper>
              </Header>
              <HightlightCards>

                <HighlightCard
                  type="up"  
                  title="Entradas" 
                  amount={hightlightData?.entries?.amount} 
                  lastTransaction={hightlightData.entries?.lastTransaction}
                />
                <HighlightCard 
                  type="down"
                  title="Saídas" 
                  amount={hightlightData?.expensives?.amount}  
                  lastTransaction={hightlightData?.expensives?.lastTransaction}
                />
                
                <HighlightCard 
                  type="total"
                  title="Total" 
                  amount={hightlightData?.total?.amount} 
                  lastTransaction={hightlightData?.total?.lastTransaction}/>

              </HightlightCards>

              <Transactions>
                <Title>
                  Listagem
                </Title>
                
                <TransactionList
                  data={transactions}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => <TransactionsCard data={item}/>}/>
                

                
              </Transactions>
          </>
        }
    </Container>
  )
}

  
