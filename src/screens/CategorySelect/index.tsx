import React from 'react';

import {Button} from '../../components/Form/Button'


import { 
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
  } from './styles';

import { FlatList } from 'react-native';
import { categories } from '../../utils/categories';



interface Category {
key: string;
name: string;
}
interface Props {
  category: string;
  setCategory: (category :Category) => void;
  closeCategory: () => void;
}

export function CategorySelect({
  category, setCategory, closeCategory
}: Props){

  function HandleCategorySelect(category: Category){
    setCategory(category)
  }
  return(
    <Container>
        <Header>
          <Title>
            Categoria
          </Title>
        </Header>
        <FlatList
          data={categories}
          styles={{flex: 1, width: '100%',}}
          keyExtractor={(item) => item.key}
          renderItem= {({item}) => (
            <Category
              onPress={() => HandleCategorySelect(item)} //toda vez que clicar a informação do item selecinado será guardada
              isActive={category.key === item.key}
              > 
              <Icon name={item.icon}/>
              <Name>{item.name}</Name>
            </Category>
          )}
          ItemSeparatorComponent={() => <Separator/>}//separa todos os components
          />
          <Footer>
          <Button title="Selecionar"
          onPress={closeCategory}/>
          </Footer>

    </Container>
  )
}