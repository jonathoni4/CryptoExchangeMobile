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

export default class HomeForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(this._retrieveDataAsync());
	//console.log(authToken);
  }
  //_fetchDataAsync = async () => { const userToken = await AsyncStorage.getItem('access_token'); console.log(userToken); };
  _retrieveDataAsync = async () => {
  try {
    const value = await AsyncStorage.getItem('access_token');
    if (value !== null) {
      // We have data!!
	  console.log(value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};
  
  Logout = async (authToken) => {
    fetch('https://cointrics.trade/auth/user/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
		'Accept': 'application/json, text/plain, */*',
		'Authorization': authToken
      }
    })
	.then((response) => response.json())
    .then((res) => {
      console.log(res);
	  
	  if(res.code == 200)
	  {
		Alert.alert("Success!", "Logged out");
	//	this.props.navigation.navigate({ routeName: 'Home'});
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
		<TouchableOpacity 
		  onPress={this.Logout.bind(this)}
		  style={styles.button}>
		  <Text style={styles.btnText}>Logout</Text>
		</TouchableOpacity>		
	  </View>
	);
  }
}

const styles = StyleSheet.create({
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