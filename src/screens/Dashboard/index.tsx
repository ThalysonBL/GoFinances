import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionsCard } from '../../components/TransactionsCard';

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
  Title
} from './styles';


export function Dashboard(){
  const data = [{
    title:"Desenvolvimento de site",
    amount: "R$12.000,00",
    category:{
    name: "Vendas",
    icon: "dollar-sign"
    },
    date:"05/07/2022"
  }]
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

          <TransactionsCard 
            data={data}/>
        </Transactions>
    </Container>
  )
}

  
