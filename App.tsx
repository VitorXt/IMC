import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [altura, setAltura] = useState<string>('');
  const [peso, setPeso] = useState<string>('');
  const [resultadoIMC, setResultadoIMC] = useState<string>('');

  function VerificarIMC(){
    if (altura.trim() === '' || peso.trim() === '') {
      alert('Por favor, preencha sua altura e peso.');
      return;
    }

    const alturaValue = parseFloat(altura);
    const pesoValue = parseFloat(peso);

    if (isNaN(alturaValue) || isNaN(pesoValue) || alturaValue <= 0 || pesoValue <= 0) {
      alert('Por favor, insira valores válidos para altura e peso.');
      return;
    }

    const alturaMetros = alturaValue / 100;
    const imc = pesoValue / (alturaMetros * alturaMetros);
    let categoria = '';
    if (imc < 18.5) {
      categoria = 'Magreza';
    } else if (imc < 24.9) {
      categoria = 'Normal';
    } else if (imc < 29.9) {
      categoria = 'Sobrepeso';
    } else if (imc < 34.9) {
      categoria = 'Obesidade Grau 1';
    } else if (imc < 39.9) {
      categoria = 'Obesidade Grau 2';
    } else {
      categoria = 'Obesidade Grau 3';
    }
    setResultadoIMC(`Seu IMC é ${imc.toFixed(2)} (${categoria})`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Calcular IMC</Text>
      <TextInput
        style={styles.input}
        placeholder='Digite sua altura (cm): '
        onChangeText={setAltura}
        keyboardType='numeric'
        value={altura}
      />

      <TextInput
        style={styles.input}
        placeholder='Digite seu peso (kg): '
        onChangeText={setPeso}
        keyboardType='numeric'
        value={peso}
      />

      <TouchableOpacity style={styles.button} onPress={VerificarIMC}>
        <Text style={styles.textButton}>Calcular IMC</Text>
      </TouchableOpacity>
      
      {resultadoIMC ? <Text style={styles.resultado}>{resultadoIMC}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    width: 200,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
  },
});
