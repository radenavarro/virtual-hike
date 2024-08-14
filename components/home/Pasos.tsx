
import { useState, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { Pedometer } from 'expo-sensors';

export const Pasos = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));
    console.log('Pedometer available:', isAvailable);

    if (isAvailable) {
      console.log('Watching step count');
      return Pedometer.watchStepCount(result => {
        console.log('Current step count:', result.steps);
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Pedometer.isAvailableAsync(): {isPedometerAvailable}</ThemedText>
      <ThemedText>Steps taken in the last 24 hours: {pastStepCount}</ThemedText>
      <ThemedText>Walk! And watch this go up: {currentStepCount}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
