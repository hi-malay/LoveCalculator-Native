import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { TextInput, Appbar, Button, } from 'react-native-paper';
import axios from 'axios'
export default function App() {
  const [first, setFirst] = useState([]);
  const [second, setSecond] = useState([]);
  const [result, setResult] = useState([]);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 40, margin: 30, borderRadius: 24 };
  const submit = () => {
    axios.get(`https://love-calculator.p.rapidapi.com/getPercentage?fname=${first}&sname=${second}`, {
      "headers": {
        "x-rapidapi-key": "bee82e16a8mshfa9e8b0f6eefc58p1922bajsn4eae4a13ac6a",
        "x-rapidapi-host": "love-calculator.p.rapidapi.com"
      }
    }).then(data => {
      setResult(data.data.percentage)
      showModal();
    })
      .catch(err => {
        console.error(err);
      });
  }
  return (
    <Provider>
      <View style={styles.container}>
        <Appbar style={styles.bottom}>
          <Text style={styles.textHeader}>LOVE % CALCULATOR</Text>
        </Appbar>
        <Text style={styles.text}>Hey Ashiques </Text>
        <Text style={styles.text2}>Do your crush surprisingly love you! find out </Text>
        <TextInput
          style={styles.input}
          label="First Name"
          value={first}
          onChangeText={first => setFirst(first)}
        />
        <TextInput
          style={styles.input}
          label="Second Name"
          value={second}
          onChangeText={second => setSecond(second)}
        />
        <Button icon="" style={styles.btn} mode="contained" onPress={() => submit()}>
          Press to get %
        </Button>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text style={styles.inputModal}> {result <= 25 && result > 0 ? "Tumse Na ho Paega" : result > 25 && result <= 40 ? "Better luck next time" : result > 40 && result <= 80 ? "You should give a try at least:" : result > 80 ? "Hooray! Your crush loves you" : result == 0 ? "Shunya" : (null)}  </Text>
            <Text style={{ color: '#00B464', fontSize: 21, textAlign: "center" }}>{result} %</Text>
          </Modal>
        </Portal>
        <Text style={styles.top}>Malay Mishra </Text>
      </View>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 100,
    paddingLeft: 10,
    paddingRight: 10
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 30,
    backgroundColor: '#014077'
  },
  top: {
    fontSize: 16,
    marginTop: 100,
    color: '#00B464',
    textAlign: "center"
  },
  textHeader: {
    color: '#fff',
    paddingLeft: 10,
    fontSize: 20
  },
  text: {
    color: '#00B464',
    fontSize: 20,
    paddingBottom: 10,
    textAlign: "center",
    paddingTop: 20
  },
  text2: {
    color: '#637381',
    fontSize: 12,
    paddingBottom: 10,
    textAlign: "center"
  },
  inputModal: {
    color: '#637381',
    fontSize: 15,
    textAlign: "center"
  },
  btn: {
    backgroundColor: '#00B464',
    marginTop: 20,
    textAlign: "center",
    borderRadius: 12
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 12
  },
});