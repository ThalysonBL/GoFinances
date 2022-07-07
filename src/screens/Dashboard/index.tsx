import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionsCard, TransactionsCardProps } from '../../components/TransactionsCard';

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
  TransactionList
} from './styles';

export interface DataListProps extends TransactionsCardProps {
  id: string;
};


export function Dashboard(){
  const data: DataListProps[] = [{
    id: '1',
    type: 'positive',
    title:"Desenvolvimento de site",
    amount: "R$12.000,00",
    category:{
    name: "Vendas",
    icon: "dollar-sign"
    },
    date:"05/07/2022"
  },
  {
    id: '2',
    type: 'negative',
    title:"Hamburgueria",
    amount: "R$12,00",
    category:{
    name: "Alimentação",
    icon: "coffee"
    },
    date:"05/07/2022"},
    {
      id: '3',
      type: 'negative',
      title:"Aluguel do apartamento",
      amount: "R$1000,00",
      category:{
      name: "Casa",
      icon: "shopping-bag"
      },
      date:"10/04/2022"}]
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
            <Icon name="power"/>
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

  
