import React from 'react';
import { categories} from '../../utils/categories'
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';



export interface TransactionsCardProps {
  type: 'positive' | 'negative';
  title: string;
    amount: string;
    category: string;
    date: string
}

interface Props {
  data: TransactionsCardProps;
};

export function TransactionsCard({data} : Props){
  const [category] = categories.filter( //o filter retorna uma coleção
    item => item.key === data.category
  ); 
  return(
    <Container>
      <Title>
        
        {data.name}
      </Title>

      <Amount type={data.type}>

      {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon}/>
          <CategoryName>
            {category.name}
          </CategoryName>
        </Category>
        <Date>
          {data.date}
        </Date>
      </Footer>

    </Container>
  )
}