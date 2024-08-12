import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import getWeatherByCity from './WeatherService';

const WeatherScreen = () => {
  const [city, setCity] = useState('Visakhapatnam');
  const [forecast, setForecast] = useState([]);

  const fetchWeather = async () => {
    const data = await getWeatherByCity(city);
    setForecast(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather in your city</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={forecast}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>
                Date: {new Date(item.dt * 1000).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Temperature</Text>
              <View style={styles.row}>
                <Text style={styles.cardLabel}>Min</Text>
                <Text style={styles.cardValue}>{item.main.temp_min}°C</Text>
                <Text style={styles.cardLabel}>Max</Text>
                <Text style={styles.cardValue}>{item.main.temp_max}°C</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cardLabel}>Pressure</Text>
                <Text style={styles.cardValue}>{item.main.pressure} hPa</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cardLabel}>Humidity</Text>
                <Text style={styles.cardValue}>{item.main.humidity}%</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#E86A1E', // Orange color
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#E86A1E', // Orange color
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#E86A1E', // Orange color
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  cardHeader: {
    backgroundColor: '#E86A1E', // Orange color
    padding: 10,
  },
  cardHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContent: {
    backgroundColor: '#d3d3d3', // Light gray for content background
    padding: 10,
  },
  cardText: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cardLabel: {
    flex: 1,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  cardValue: {
    flex: 1,
    textAlign: 'right',
  },
});

export default WeatherScreen;
