import React, {useEffect, useState, useCallback} from 'react';
import { ActivityIndicator } from 'react-native'
import {useFocusEffect} from '@react-navigation/native'
import {HistoryCard} from '../../components/HistoryCard'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RFValue} from 'react-native-responsive-fontsize'
import {VictoryPie} from 'victory-native'
import {ptBR} from 'date-fns/locale' 
import {addMonths, subMonths, format} from 'date-fns'
import {useTheme} from 'styled-components'
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,
} from './styles'
import {useAuth} from '../../hooks/auth'
import {categories} from '../../utils/categories'

interface TransactionData{
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: string;
  date: string
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume(){
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [totalByCategories, setTotalByCategories] = useState<CategoryData>([]);
  function handleDateChange(action: 'next' | 'prev'){
    if(action === 'next'){
      setSelectedDate(addMonths(selectedDate, 1)) //adiciono no selectedDate mais 1
    }else{
      setSelectedDate(subMonths(selectedDate, 1)) //adiciono no selectedDate mais 1
    }

  }

  const theme = useTheme()
  const {user} = useAuth();


  async function loadData(){ 
    setIsLoading(true);

    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
    .filter((expensive: TransactionData) => expensive.type === 'negative' &&  //o expensive nos que definimos o nome(é onde é armazenado os dados)
    new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
    new Date(expensive.date).getFullYear() === selectedDate.getFullYear())

    const expensivesTotal = expensives
    .reduce((acculator: number, expensive: TransactionData) => {
      return acculator + (expensive.amount);
    }, 0)//retorna o total da saída (expensives)
    
    const totalByCategory: CategoryData[] = [];


    categories.forEach(category => { //O forEach percorre o objeto mas não retorna o objeto

      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) =>  {
        if(expensive.category === category.key){
          categorySum += Number(expensive.amount);
        }
      });
      if(categorySum > 0){//se categorySum for maior que zero vai executar
      const totalFormatted = categorySum
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })

      const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%` //pegando o percentual, o fixed vai mostrar apenas 1 casa decimal se
      
        totalByCategory.push({//vai adicionar no array um novo objeto
        key: category.key,
          name: category.name,
        color: category.color,
        total: categorySum,
        totalFormatted,
        percent,
      })}
      

      });

      setTotalByCategories(totalByCategory)
      setIsLoading(false)

  }
  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedDate]))


  //useEffect(() => {
  //  loadData()
  //}, [selectedDate])//Carregando o loadData
    //Toda vez que o selectedDate mudar, vai disparar uma atualização no resumo

  return(
    <Container>
      
        <Header>
          <Title>
            Resumo por categoria
          </Title>
        </Header>
        {
        isLoading ?
        <LoadContainer>
          <ActivityIndicator 
          color={theme.colors.primary}
          size="large"
        />
        </LoadContainer> :

      
        <>

        <Content
        showVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
        > 
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange('prev')}>
            <MonthSelectIcon name="chevron-left"/>
          </MonthSelectButton>

          <Month>
            {format(selectedDate, 'MMMM, yyyy', {locale:ptBR}) //armazena a data
            }
          </Month>


          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <MonthSelectIcon name="chevron-right"/>
          </MonthSelectButton>



        </MonthSelect>
          <ChartContainer>

            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)} // cor da escala. Dentro da totalByCategories tô fazendo um map no category e pego a cor
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontHeight: 'bold',
                  fill: theme.colors.shape,
                }
              }}
              labelRadius={50} //O texto ficará 50 afastado do centro
              x="percent"
              y="total"
            />
          </ChartContainer>

          {
          totalByCategories.map(item => (
            
            <HistoryCard 
            key={item.key}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}/>
            ))
          }
        </Content>
      </>
      }
    </Container>
  )
}