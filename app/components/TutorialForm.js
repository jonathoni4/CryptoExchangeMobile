import React from 'react';
import { StyleSheet, Text, View, ImageBackground, KeyboardAvoidingView,  } from 'react-native';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

export default class TutorialForm extends React.Component {  

static navigationOptions = { title: 'Tutorial', };

  render() {
	return (
	  <View>
		 <Text style={styles.header}>Tutorial Page</Text>
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
});