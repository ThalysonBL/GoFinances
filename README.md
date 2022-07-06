É possivel criar paletas de cores GLOBAL
utilizando objeto.


## Exemplo de como ficou
export default {
  colors: {
    primary: '#ffff',
  }
}

No App.tsx =>
import {ThemeProvider} from 'styled-components' //Provider para ser usado nas variaveis
import theme from './src/global/styles/theme' // theme é o nome da pasta

No return coloque o provider
# ThemeProvider theme={theme}
    Em volta do conteúdo
    e adicione a propriedade theme com o parametro theme


_________________________________
Depois de criar as variaveis globais 
Entre no style do background
E defina um background usando as variaveis, da seguinte forma:

 background: ${({theme} => colors.primary)}

 # theme 
  É o nome da pasta 
 # colors
  É o nome do objeto
# primary
  É a variavel da cor


Crie o arquivo 
  #  styled.ts 
        dentro de global/styles
        E adicione
  # 
    import 'styled-components'
    import theme from './theme'

declare module 'styled-components' {
  type ThemeType = typeof theme;

  export interface defaultTheme extends ThemeType
}
 _____o tipo ThemeType vai ter todos os tipos e propriedades de theme___
 _____Exportando interface Default e extendendo para ThemeType {}


Para instalar qualquer FONTE do google, utilize:
# TERMINAL:
 expo install expo-font @expo-google-fonts/poppins

    Depois da Barra / coloque o nome da fonte que deseja baixar

No arquivo App.tsx

  import {
    useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  poppins_700Bold
  
  } from '@expo-google-fonts/poppins'


  Vamos usar um evento de carregamento de tela, enquanto a fonte nã carregar será exibido um carregamento.

  # TERMINAL
  expo install expo-app-loading

import AddLoading from 'expo-app-loading'


const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
  })

  if(!fontsLoaded){
    return <AppLoading />
  }


  # TERMINAL

  yarn add react-native-responsive-fontsize
  //lida com responsividade das fontes em REM

# importe no styles.ts da dashboard
import {RFPercentage} from 'react-native-responsive-fontsize';

# no height:
  ${RFPercentage(42)}px;

  ## Obs.: 
  imagens utilize RFValue()px;
  Para outros RFPercentage()px;



  ## Icones na biblioteca reactNative 

  import { MaterialIcons, Feather} from '@expo/vector-icons';
  //Existem várias lib para icons
  //A lib pode ser importado no styles ou no index

  ## Importamos no styles

  No styles
    export const Icon = styled(Feather)``


No Dashboard import o Icon

E coloque no corpo xml:
    <Icon/ name="power">
    //None do icon é power


## Nova Tag
  <scrollView horizontal></scrollView>
    <scrollView horizontal="false"></scrollView>

  //Como o nome já diz, tem um scroll Horizontal ou vertical

## Escondendo barra de rolagem
  utilizea propriedade no
  # <scrollView
      showHorizontalScrollIndicator={false}>

      //A barra de rolagem ficará oculta

Para criar um espaçamento interno em uma TAG, utilize a propriedae:

  contentContainerStyle={{paddingLeft: 24}}
  contentContainerStyle={{paddingHorizontal: 24}} //aplica ambos os lados o padding


É possivel pegar as propriedades de estilos do TSX e colocar no style

Recorte as propriedades de estilo
  no style
    dentro da:
      export const hightlightCards = styled.ScrollView.attrs({
        
        COLE_AQUI_AS_PROPRIEDADES_DE_ESTILO
        OBS.: Ao inves de ser = será :

      })``;
  #      será .attrs                   #
                Para colocar os atributos

Como alguns celulares tem a barra superior atrapalhando a tela,
utilizamos a lib:
  # TERMINAL
    yarn add react-native-iphone-x-helper

    E importe no arquivo style

    import {getStutusBarHeight} from 'react-native-iphone-x-helper


    no estilo coloque para dar espaço:
      
      margin-top: ${getStatusBarHeight() + RFValue(28)}px;
      //para dar espaço a barra superior

