//react components
import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
//global
import Color from '../../Global/Color';
import MyText from '../MyText/MyText';
//import : styles
import { styles } from './SearchwithIconStyle';

const SearchWithIcon = ({
    placeholder,
    placeholderTextColor = '#8F93A0',
    value,
    setValue,
    onChangeText,
    // icon = <MyIcon.AntDesign name="search1" color={Colors.WHITE} size={24} />,
    onPress = () => { },
    showDot = () => { },
    style = {},
}) => {
    //UI
    return (
        <View style={{ ...styles.searchContainer, ...style }}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                style={styles.inputStyle}
            />

        </View>
    );
};

export default SearchWithIcon;
{/* <TouchableOpacity onPress={onPress} style={styles.iconView}>
                {icon}
                {showDot() ?
                    <View style={styles.dot} />
                    : null}
            </TouchableOpacity> */}