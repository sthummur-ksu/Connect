import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const role = await AsyncStorage.getItem('userRole');

      if (accessToken && role) {
        if (role === 'agent') {
          router.replace('/(agents)');
        } else if (role === 'athlete') {
          router.replace('/(athletes)');
        }
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/onboardingimage.png')} style={styles.image} />
      <Text style={styles.title}>Welcome to AthleteConnect</Text>
      <Text style={styles.subtitle}>The Future of Sports Networking</Text>

      <TouchableOpacity style={styles.buttonSignUp} onPress={() => router.push('/signup')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonLogin} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },

  buttonSignUp: {
    backgroundColor: '#FFD700', 
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 12,
  },

  buttonLogin: {
    backgroundColor: '#32CD32', 
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
