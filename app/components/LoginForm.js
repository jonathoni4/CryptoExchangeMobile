import store from 'react-native-simple-store';
import React from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	TextInput ,
	TouchableOpacity,
	Alert,
	TouchableHighlight,
	AsyncStorage,
	
} from 'react-native';

export default class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
  }

  Login = async () => {
    fetch('https://cointrics.trade/auth/user/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
		'Accept': 'application/json, text/plain, */*'
      },
      body: JSON.stringify({
	    "email": this.state.email,
        "password": this.state.password
      })
    })
	.then((response) => response.json())
    .then((res) => {
      console.log(res);
	  
	  //_storeData = async () => { try { await AsyncStorage.setItem('access_token', 'Bearer ' + res.access_token); } 
	  //  catch (error) {	/* Error saving data */	}};
	  
	  if(res.access_token)
	  {
		//_storeData();
		Alert.alert("Success!", "You have successfully logged in!");
		store.save('token', ('Bearer ' + res.access_token));
		this.props.navigation.navigate('Home');
      }
      
	  else if (res.message)
	  {
		var errorMsg = "";
	    if (res.errors.email)
		{
		  errorMsg = errorMsg + "• " +  res.errors.email[0] + "\n";
		}		  
		
		if (res.errors.password)
		{
		  errorMsg = errorMsg + "• " +  res.errors.password[0] + "\n";	 
		}
		Alert.alert("Login Error", errorMsg);
      }
    })
	.catch((error) => {
      console.error(error);
    });
  }
	
  render() {
    return (
      <View style={styles.logform}>
	  
	  
	    <Text style={styles.header}>Login</Text>
		
		<TextInput 
		  style ={styles.textInput} 
		  placeholder = 'Email address'
		  onChangeText={ TextInputValue =>
          this.setState({email : TextInputValue }) }
		  underlineColorAndroid={'transparent'} />
		
		<TextInput 
		  style ={styles.textInput} 
		  placeholder = 'Password'
		  onChangeText={ TextInputValue =>
          this.setState({password: TextInputValue }) }
		  secureTextEntry = {true} underlineColorAndroid={'transparent'} />
		
		<TouchableOpacity 
		  onPress={this.Login.bind(this)}
		  style={styles.button}>
		  <Text style={styles.btnText}>Log in</Text>
		</TouchableOpacity>		
		
		<TouchableHighlight
          onPress={() => this.props.navigation.navigate('Register')}>
		  <Text style={styles.footer}>Don't have an account? Register here</Text>
		</TouchableHighlight>     
	  </View>
    );
  }
}


const styles = StyleSheet.create({
  logform: {
	flex: 1,
	alignItems: 'center',
    alignSelf: 'stretch',
	backgroundColor: '#36485f',
  },
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
  footer: {
	  fontSize: 12,
	  color: 'white',
	  paddingBottom: 10,
	  marginTop: 10,
	  marginBottom: 40,
  },
  textInput: {
	  alignSelf: 'stretch',
	  height: 40,
	  marginBottom: 30,
	  color: '#fff',
	  borderBottomColor: '#f8f8f8',
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
  }
});

//<View style={styles.logform}>