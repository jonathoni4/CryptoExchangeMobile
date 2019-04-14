import React from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	TextInput ,
	TouchableOpacity,
	TouchableHighlight,
	Alert,
	KeyboardAvoidingView
} from 'react-native';

export default class RegisterForm extends React.Component {
  state = {
	first_name: '',
    last_name: '',
    email: '',
    password: '',
    pw_confirm: ''
  }
  
  Register = async () => {
    fetch('https://cointrics.trade/auth/user/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
		'Accept': 'application/json, text/plain, */*'
      },
      body: JSON.stringify({
		"first_name": this.state.first_name,
        "last_name":  this.state.last_name,
        "email":      this.state.email,
        "password":   this.state.password,
        "password_confirmation": this.state.pw_confirm
      })
    })
	.then((response) => response.json())
	.then((res) => {
	  console.log(res);
	  	  
	  if (!(res.errors))
	  {
		  Alert.alert("Success!", res.message);
		  this.props.navigation.navigate('Login');
	  }
	  
	  else
	  {
		var errorMsg = "";
		
		if (res.errors.first_name)
		{
		  //Alert.alert("Error", res.errors.first_name[0]);	  
		  errorMsg = errorMsg + "• " +  res.errors.first_name[0] + "\n";
		}
		
		if (res.errors.last_name)
		{
		  //Alert.alert("Error", res.errors.last_name[0]);	  
		  errorMsg = errorMsg + "• " + res.errors.last_name[0] + "\n";
		}
		
		if (res.errors.password)
		{
		  //Alert.alert("Error", res.errors.password[0]);	  
		  errorMsg = errorMsg + "• " + res.errors.password[0] + "\n";
		}
		
	    if (res.errors.email)
		{
		  //Alert.alert("Error", res.errors.email[0]);	  
		  errorMsg = errorMsg + "• " + res.errors.email[0] + "\n";
		}	
		
		Alert.alert("Registration Error", errorMsg);	  
	  }
	  
    })
	.catch((error) => {
    console.error(error);
    });
  }
  
  render() {
    return (
      <KeyboardAvoidingView 
	  style={styles.regform}
	  behavior= "position">
	    <TouchableHighlight 
		  style={styles.backbutton}
          onPress={() => this.props.navigation.navigate('Login')}>
		  <Text style={styles.backbuttonTxt}>Go back to login page</Text>
		</TouchableHighlight>
	    
	    <Text style={styles.header}>Register</Text>
		
		<TextInput 
		  style ={styles.textInput} 
		  placeholder = 'First Name'
		  onChangeText={ TextInputValue =>
          this.setState({first_name : TextInputValue }) }
		  underlineColorAndroid={'transparent'} />
		
		<TextInput 
		  style ={styles.textInput} 
		  placeholder = 'Last Name'
		  onChangeText={ TextInputValue =>
          this.setState({last_name : TextInputValue }) }
		  underlineColorAndroid={'transparent'} />
		
		<TextInput 
		  style ={styles.textInput} 
		  placeholder = 'Email Address'
		  onChangeText={ TextInputValue =>
          this.setState({email : TextInputValue }) }
		  underlineColorAndroid={'transparent'} />
		
		<TextInput 
		  style ={styles.textInput} 
		  placeholder = 'Password'
		  onChangeText={ TextInputValue =>
          this.setState({password: TextInputValue }) }
		  secureTextEntry = {true} underlineColorAndroid={'transparent'} />
		  
		<TextInput 
		  style ={styles.textInput} 
		  placeholder = 'Confirm Password'
		  onChangeText={ TextInputValue =>
          this.setState({pw_confirm: TextInputValue }) }
		  secureTextEntry = {true} underlineColorAndroid={'transparent'} />
		
		<TouchableOpacity 
		  onPress={this.Register.bind(this)}
		  style={styles.button}>
		  <Text style={styles.btnText}>Create account</Text>
		</TouchableOpacity>		
		
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  regform: {
	flex: 1,
	alignItems: 'center',
    alignSelf: 'stretch',
	backgroundColor: '#36485f'
  },
  backbutton: {
	  marginTop: 50,
	  alignSelf: 'stretch',
  },
  backbuttonTxt: {
	  fontSize: 13,
	  color: 'white',  
  },
  header: {
	  marginTop: 50,
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
	  color: '#fff',
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
