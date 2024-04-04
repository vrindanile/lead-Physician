import React from 'react' 
import { View, Text, TouchableOpacity, Image, TextInput, Keyboard, StyleSheet } from 'react-native' 
import Color from '../global/Color'
 
 
const CustomSearch = (props) => { 
  return ( 
 
    <View style={{ 
      width: '90%', height: 55, backgroundColor: '#fff', alignSelf: 'center', flexDirection: 'row', 
    //   shadowColor: '#000', 
    //   shadowOffset: { 
    //     width: 0, 
    //     height: 3 
    //   }, 
    //   shadowRadius: 1, 
    //   shadowOpacity: 0.3, 
      // justifyContent: 'center', 
      alignItems: 'center', 
      elevation: 5, 
      borderRadius: 5, 
      
      alignSelf: 'center', marginTop: props.marginTop ? props.marginTop : 'auto' ,
      borderWidth:1,
      borderColor:'#999999'
    }}> 
      <View style={{ width: '100%', height: 45, backgroundColor: Color.BG_COLOR, borderRadius: 8 }}> 
 
        <View style={{ 
          width: '100%', height: 45, borderRadius: 8, backgroundColor: Color.LogininputBox, alignSelf: 'center', 
          //  shadowColor: '#000', 
          //  shadowOffset: { 
          //    width: 0, 
          //    height: 3 
          //  }, 
          //  shadowRadius: 1, 
          //  shadowOpacity: 0.3, 
          //  justifyContent: 'center', 
          //  elevation: 5, 
        }}> 
          <TextInput 
            style={[styles.input, { paddingLeft: props.paddingLeft ? props.paddingLeft : 5 }]} 
            // maxLength={ props.multiline ? 1000 : 40} 
            value={props.serchValue} 
            autoCapitalize={props.autoCapitalize} 
            numberOfLines={1} 
            //   onFocus={() =>  props.onFocus ?  props.onFocus() :  setState({isFocus:true})} 
            //   onBlur={() =>  props.onBlur ?  props.onBlur() :  setState({isFocus:false})} 
            ref={props.inputRef} 
            secureTextEntry={props.passwordType ? props.passwordType : false} 
            blurOnSubmit={props.blurOnSubmit} 
            keyboardType={props.keyboardType} 
            returnKeyType={props.returnKeyType} 
            placeholder={props.placeholder} 
            textContentType={props.textContentType} 
            onSubmitEditing={props.multiline ? null : Keyboard.dismiss} 
            placeholderTextColor={'#8F93A0'} 
            onChangeText={props.onChangeText ? (text) => props.onChangeText({ text }) : () => { }} 
            editable={props.editable} 
            multiline={props.multiline} 
          /> 
          <View style={{ width: '14%', height: 45, backgroundColor: 'transparent', borderRadius: 8, right: 5, position: 'absolute' }}> 
            <TouchableOpacity style={{ width: 45, height: 45, justifyContent: 'center', backgroundColor: Color.LogininputBox, borderRadius: 8 }} 
              onPress={props.presssearch}> 
              <Image source={props.searchIcon ? props.searchIcon : require('../assest/Images/SearchH.png')} style={{ width: 22, height: 22, alignSelf: 'center',  }}></Image> 
            </TouchableOpacity> 
          </View> 
 
        </View> 
      </View> 
      {/* <View style={{width:'14%',height:45,backgroundColor:'transparent',borderRadius:8,left:5,}}> 
    <TouchableOpacity style={{width:45,height:45,justifyContent:'center',backgroundColor:Mycolors.LogininputBox,borderRadius:8}} 
    onPress={props.press}> 
    <Image source={require('../assets/images/shape_32.png')} style={{ width: 18, height: 18, alignSelf: 'center'}}></Image> 
    </TouchableOpacity> 
 
</View> */} 
    </View> 
 
  ) 
} 
 
const styles = StyleSheet.create({ 
 
  container: { 
    flex: 1, 
    backgroundColor: Color.BG_COLOR 
  }, 
  input: { 
    paddingRight: 10, 
    height: 45, 
    width: '90%', 
    fontSize: 13, 
    // borderColor: Mycolors.GrayColor, 
    // borderWidth:1, 
    backgroundColor: Color.LogininputBox, 
    borderRadius: 15, 
    color: Color.TEXT_COLOR, 
   
    //   textAlignVertical: 'top', 
  }, 
}); 
export default CustomSearch;
