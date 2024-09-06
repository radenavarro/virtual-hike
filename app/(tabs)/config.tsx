import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, TextInput, TouchableOpacity } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/hooks/useTheme';
import { useState } from 'react';
import { useAppStore } from '@/zustand/useStore';

export default function TabThreeScreen() {
  const [objectiveInSteps, setObjectiveInSteps] = useState(true)
  const [routeObjectiveInSteps, setrouteObjectiveInSteps] = useState(true)

  //Store Zustand
  const { objetivo, setObjetivo, datosUser, setDatosUser } = useAppStore()

  const [prevInfo, setPrevInfo] = useState({
    altura: datosUser.altura,
    objetivo: {
      diario: objetivo.diario,
      largoPlazo: objetivo.largoPlazo
    }
  })

  const theme = useTheme()
  const themedStyles = StyleSheet.create({
    buttonPrimary: {
      backgroundColor: theme.colors.button?.primary,
      color: theme.colors.button?.text
    },
    buttonDefault: {
      borderColor: theme.colors.border,
      borderWidth: 1,
      fontWeight: "bold"
    },
    buttonFont: {
      fontWeight: "bold",
      fontSize: 24
    },
    inputBorder: {
      borderColor: theme.colors.border
    },
    showWhenObjectiveInSteps: {
      display: objectiveInSteps ? "flex" : "none"
    },
    hideWhenObjectiveInSteps: {
      display: !objectiveInSteps ? "flex" : "none"
    },
    showWhenRouteObjectiveInSteps: {
      display: routeObjectiveInSteps ? "flex" : "none"
    },
    hideWhenRouteObjectiveInSteps: {
      display: !routeObjectiveInSteps ? "flex" : "none"
    }
  })

  function handleObjectiveUnits () {
    setObjectiveInSteps(!objectiveInSteps)
  }

  function handleRouteObjectiveUnits () {
    setrouteObjectiveInSteps(!routeObjectiveInSteps)
  }

  function setObjectives () {
    
  }

  function setRouteObjectives () {

  }

  function setPrevObjetivo () {

  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#e09fd9', dark: '#65235e' }}
      headerImage={<Ionicons size={310} name="settings" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Configuración</ThemedText>
      </ThemedView>

      <ThemedText>La altura se utiliza para el cálculo de la distancia recorrida en kilómetros.</ThemedText>
      <ThemedView style={styles.elementContainer}>
        <ThemedText type="defaultSemiBold">Altura: </ThemedText>
        <TextInput keyboardType="numeric" placeholder="Centímetros" placeholderTextColor={theme.colors.border} style={[styles.input, themedStyles.inputBorder]} />
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]}>
          <ThemedText style={[ themedStyles.buttonFont ]}>×</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonPrimary]}>
          <ThemedText style={[ themedStyles.buttonFont ]}>+</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedText>Añade la cantidad objetivo de pasos que quieres hacer al día. O la cantidad de kilómetros; la decisión es tuya.</ThemedText>
      <ThemedView style={styles.elementContainer}>
        <ThemedText type="defaultSemiBold">Objetivo: </ThemedText>
        <TextInput 
          keyboardType="numeric" 
          placeholder="Pasos" 
          placeholderTextColor={theme.colors.border}
          value={objetivo.diario?.toString()}
          onChangeText={setPrevObjetivo}
          style={[styles.input, themedStyles.inputBorder, themedStyles.showWhenObjectiveInSteps]} 
        />
        <ThemedText style={[themedStyles.showWhenObjectiveInSteps]}>Pasos</ThemedText>
        <TextInput 
          keyboardType="numeric" 
          placeholder="Kilómetros" 
          placeholderTextColor={theme.colors.border} 
          style={[styles.input, themedStyles.inputBorder, themedStyles.hideWhenObjectiveInSteps]} 
        />
        <ThemedText style={[themedStyles.hideWhenObjectiveInSteps]}>Kms</ThemedText>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]}>
          <ThemedText style={[ themedStyles.buttonFont ]}>×</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]} onPress={handleObjectiveUnits}>
          <ThemedText style={[ themedStyles.buttonFont ]}>⇌</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonPrimary]} onPress={setObjectives}>
          <ThemedText style={[ themedStyles.buttonFont ]}>+</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    
      <ThemedText>¿Quieres establecer una ruta?. Puedes añadirla a mano, si quieres.</ThemedText>
      <ThemedView style={styles.elementContainer}>
        <ThemedText type="defaultSemiBold">Objetivo de ruta: </ThemedText>
        <TextInput keyboardType="numeric" placeholder="Pasos" placeholderTextColor={theme.colors.border} style={[styles.input, themedStyles.inputBorder, themedStyles.showWhenRouteObjectiveInSteps]} />
        <ThemedText style={[themedStyles.showWhenRouteObjectiveInSteps]}>Pasos</ThemedText>
        <TextInput keyboardType="numeric" placeholder="Kilómetros" placeholderTextColor={theme.colors.border} style={[styles.input, themedStyles.inputBorder, themedStyles.hideWhenRouteObjectiveInSteps]} />
        <ThemedText style={[themedStyles.hideWhenRouteObjectiveInSteps]}>Kms</ThemedText>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]}>
          <ThemedText style={[ themedStyles.buttonFont ]}>×</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]} onPress={handleRouteObjectiveUnits}>
          <ThemedText style={[ themedStyles.buttonFont ]}>⇌</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonPrimary]} onPress={setRouteObjectives}>
          <ThemedText style={[ themedStyles.buttonFont ]}>+</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.elementContainer}>
        <ThemedText type="defaultSemiBold">Días para completar la ruta: </ThemedText>
        <TextInput keyboardType="numeric" placeholder="Nº días" placeholderTextColor={theme.colors.border} style={[styles.input, themedStyles.inputBorder]} />
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]}>
          <ThemedText style={[ themedStyles.buttonFont ]}>×</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonPrimary]}>
          <ThemedText style={[ themedStyles.buttonFont ]}>+</ThemedText>
        </TouchableOpacity>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#bc41b0',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  elementContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center'
  },
  input: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1
  },
  roundButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 8,
    width: 48,
    height: 48,
    borderRadius: 48
  }
});
