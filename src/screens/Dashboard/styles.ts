import styled from 'styled-components/native';
import {FlatList} from 'react-native'
import {Feather} from '@expo/vector-icons';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper'
import { BorderlessButton} from 'react-native-gesture-handler';

import {DataListProps} from '.'

export const Container = styled.View`
    flex: 1; 
    background: ${({theme}) => theme.colors.background};
`;
/*
export const Title = styled.Text`
font-family: ${({theme}) => theme.fonts.bold};
    font-size: 24px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.title}
`;*/

export const Header = styled.View`
width: 100%;
height: ${RFPercentage(42)}px;
align-items: flex-start;
justify-content: center;
flex-direction: row;

background-color: ${({theme}) => theme.colors.primary};
`

export const UserWrapper = styled.View`
        width: 100%;
        padding: 0 24px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: ${getStatusBarHeight() + RFValue(28)}px;

`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;
export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`;
export const User = styled.View`
        margin-left: 17px;

`;
export const UserGreeting = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family:  ${({theme}) => theme.fonts.regular};

    font-size:  ${RFValue(18)}px;
`;
export const UserName = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-size:  ${RFValue(18)}px;
    font-family:  ${({theme}) => theme.fonts.bold};
`;

export const LogoutButton = styled(BorderlessButton)``;


export const Icon = styled(Feather)`

color: ${({theme}) => theme.colors.secondary};
font-size: ${RFValue(24)}px;

`

export const HightlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showHorizontalScrollIndicator: false,
    contentContainerStyle:{paddingHorizontal: 24}
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`
;

export const Transactions = styled.View`
    flex: 1%;
    padding: 0 24px;

    margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular}

    margin-bottom: 16px;

`;

export const TransactionList = styled(
    FlatList as new () => FlatList<DataListProps>//A FlatList será uma nova FlatList tipada por DataListProps
    ).attrs({
    showVerticalScrollIndicator: false,
            contentContainerStyle:{
              paddingBottom: getBottomSpace()
            }
})`
`; 

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;