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
	AsyncStorage
} from 'react-native';

export default class SettingsForm extends React.Component {
  constructor() {
	super();
	
	this.state = {
      authToken: "",
	  firstName: "",
	  lastName: "",
	  email: "",
    }
	
    store.get('token').then((res) => {
	  this.setState({authToken: res });
      console.log(this.state.authToken);
    });
	
	
  }
  
  GetUserInfo = async () => {
    fetch('https://cointrics.trade/auth/user/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
		'Accept': 'application/json, text/plain, */*',
		'Authorization': this.state.authToken
      }
    })
	.then((response) => response.json())
    .then((res) => {
      console.log(res);
	  
	  if(res.id)
	  {
		this.setState({
          firstName: res.first_name,
          lastName: res.last_name,
		  email: res.email,
        })
		console.log("State value:", this.state);
      }
      
	  else 
	  {
		Alert.alert("Error", res.message);
      }
    })
	.catch((error) => {
      console.error(error);
    });
  }
  
  
  Logout = async () => {
    fetch('https://cointrics.trade/auth/user/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
		'Accept': 'application/json, text/plain, */*',
		'Authorization': this.state.authToken
      }
    })
	.then((response) => response.json())
    .then((res) => {
      console.log(res);
	  
	  if(res.code == 200)
	  {
		Alert.alert("Success!", "Logged out");
		this.props.navigation.navigate({ routeName: 'Login'});
      }
      
	  else 
	  {
		Alert.alert("Error", res.message);
      }
    })
	.catch((error) => {
      console.error(error);
    });
  }
  
  render() {
    return (
	  <View style = {styles.container}>
	  <Text style={styles.btnHeader}>First Name: {this.state.firstName} </Text>
	  <Text style={styles.btnHeader}>Last Name: {this.state.lastName} </Text>
	  <Text style={styles.btnHeader}>Email: {this.state.email} {'\n'}</Text>
	  <Text style={styles.btnText}>Change Password</Text>
	  <Text style={styles.btnText}>Add Funds</Text>
	  <Text style={styles.btnText}>Reset Funds</Text>
		<TouchableOpacity 
		  onPress={this.Logout.bind(this)}
		  style={styles.button}>
		  <Text style={styles.btnText}>Logout</Text>
		</TouchableOpacity>		
		<TouchableOpacity 
		  onPress={this.GetUserInfo.bind(this)}
		  style={styles.button}>
		  <Text style={styles.btnText}>Get User Info</Text>
		</TouchableOpacity>		  
        
	  </View>
	);
  }
}

const styles = StyleSheet.create({
  btnHeader: {
	  color: '#fff',
	  fontWeight: 'bold',
	  fontSize: 18
  },
  container: {
    flex: 1,
	justifyContent: 'center',
	backgroundColor: '#36485f',
	paddingLeft: 60,
	paddingRight: 60
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