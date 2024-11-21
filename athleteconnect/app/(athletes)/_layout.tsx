// app/(agent)/_layout.tsx

import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function AthleteTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'blue', 
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Athlete Home',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🏠</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📋</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="legal"
        options={{
          title: 'Legal',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>⚖️</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🏛️</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📅</Text>
          ),
        }}
      />
    </Tabs>
  );
}
