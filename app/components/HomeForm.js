import React from 'react';
import { StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

export default class HomeForm extends React.Component {  
  render() {
	return (
	  <View>
		 <Text style={styles.header}>Market Page</Text>
		 <TouchableOpacity 
		  onPress={() => this.props.navigation.navigate('Tutorial')}
		  style={styles.button}>
		  <Text style={styles.btnText}>Go to Tutorial Form</Text>
		</TouchableOpacity>		
	    </View>
	  );
  }
}

const styles = StyleSheet.create({
 header: {
	  marginTop: 140,
	  fontSize: 24,
	  color: '#fff',
	  paddingBottom: 10,
	  marginBottom: 40,
	  borderBottomColor: '#199187',
	  backgroundColor: '#36485f',
	  borderBottomWidth: 1
  },
    button: {
	  alignSelf: 'stretch',
	  alignItems: 'center',
	  padding: 20,
	  backgroundColor: '#59cbbd',
	  marginTop: 30,
  },
  btnText: {
	  color: '#fff',
	  fontWeight: 'bold',
  },
});