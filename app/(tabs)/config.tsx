import { StyleSheet, Image, Platform, TextInput, TouchableOpacity, View, Modal, Alert } from 'react-native';
import { useState } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Toast from 'react-native-root-toast';
// CUSTOM HOOKS
import { useTheme } from '@/hooks/useTheme';
// STORE
import { useAppStore } from '@/zustand/useStore';
// ICONOS
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ModalRuta } from '@/components/config/ModalRuta';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
// HELPERS
import { objectiveConvert } from '../helpers/helpers';
import { useTemplate } from '@/hooks/useTemplate';
import { TemplateConfig } from '../types';

export default function TabThreeScreen() {
  const [measureSteps, setMeasureSteps] = useState(true)

  // Store Zustand
  const { objetivo, setObjetivo, datosUser, setDatosUser } = useAppStore()
  // Info previa a ser subida a la store
  const [prevInfo, setPrevInfo] = useState({
    altura: datosUser.altura,
    objetivo: {
      // Se guarda en ambas unidades para nutrir a los inputs, pero en la store se guardará sólo en pasos
      diario: {
        pasos: objetivo.diario,
        kms: (objetivo.diario && !isNaN(objetivo.diario)) ? objectiveConvert(objetivo.diario, "pasos") : undefined
      },
      // En la store se guarda sólo en kms
      ruta: objetivo.ruta
    }
  })

  const { template } = useTemplate<TemplateConfig>('tabs/config')

  const theme = useTheme()
  const themedStyles = StyleSheet.create({
    buttonPrimary: {
      backgroundColor: theme.colors.button?.primary?.color,
      // color: theme.colors.button?.text
    },
    buttonPrimaryText: {
      color: theme.colors.button?.primary?.text
    },
    buttonDefault: {
      borderColor: theme.colors.border,
      borderWidth: 1,
      fontWeight: "bold"
    },
    buttonDefaultText: {
      color: theme.colors.button?.default?.text
    },
    input: {
      borderColor: theme.colors.border,
      color: theme.colors.text
    },
    showWhenObjectiveInSteps: {
      display: measureSteps ? "flex" : "none"
    },
    hideWhenObjectiveInSteps: {
      display: !measureSteps ? "flex" : "none"
    },
    borderBottom: {
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      paddingBottom: 20
    }
  })

  /**
   * Maneja si se usan pasos o kilómetros
   */
  function handleObjectiveUnits () {
    setMeasureSteps(!measureSteps)
  }

  /**
   * Actualiza la store con los objetivos diarios que haya seteados en el estado
   */
  function setDailyObjectives () {
    setObjetivo({ ...objetivo, diario: prevInfo.objetivo.diario.pasos })
    Toast.show('Objetivo actualizado', {
      position: Toast.positions.BOTTOM
    })
  }

  function setObjectiveInSteps (text: string) {
    let num: number | undefined = parseInt(text);
    let kms = undefined;
    if (!isNaN(num)) {
      kms = objectiveConvert(num, "pasos");
    } else {
      num = undefined
    }
    setPrevInfo({
       ...prevInfo, 
       objetivo: { 
        ...prevInfo.objetivo, 
        diario: {
          pasos: num,
          kms
        } 
      }
    })
  }

  /**
   * Actualiza el objetivo en kilómetros, únicamente en el estado
   * @param text Kilómetros
   */
  function setObjectiveInKilometers (text: string) {
    let pasos = undefined
    let kms: number | undefined = parseInt(text);
    if (!isNaN(kms)) {
      pasos = objectiveConvert(kms, "kms");
    } else {
      kms = undefined
    }
    setPrevInfo({ 
      ...prevInfo, 
      objetivo: { 
        ...prevInfo.objetivo, 
        diario: {
          pasos,
          kms
        } 
      } 
    })
  }

  /**
   * Actualiza la altura del user, únicamente en el estado
   * @param text Altura
   */
  function setHeight (text: string) {
    const altura = parseInt(text)
    setPrevInfo({ ...prevInfo, altura })
  }

  /**
   * Reinicia la altura únicamente en el estado
   */
  function resetHeight () {
    setPrevInfo({ ...prevInfo, altura: datosUser.altura })
  }

  /**
   * Actualiza la altura en la store
   */
  function updateUserInStore () {
    setDatosUser({altura: prevInfo.altura})
    Toast.show('Altura actualizada', {
      position: Toast.positions.BOTTOM
    })
  }

  /**
   * Muestra la información sobre la conversión de pasos a kilómetros y viceversa
   */
  function showUnitConversionInfo () {
    Alert.alert(
      "Sobre la conversión de unidades",
      "Las conversiones entre pasos y kilómetros son aproximadas. Hacer la conversión en un sentido y posteriormente en el otro podría arrojar valores ligeramente diferentes a los esperados.",
      [
        {
          text: "OK",
          style: "default"
        }
      ]
    )
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#e09fd9', dark: '#65235e' }}
      headerImage={<Ionicons size={310} name="settings" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{template.header}</ThemedText>
      </ThemedView>

      <ThemedText>{template.heightDescription}</ThemedText>
      <ThemedView style={[styles.elementContainer]}>
        <ThemedText type="defaultSemiBold">{template.heightText}: </ThemedText>
        <TextInput 
          keyboardType="numeric" 
          placeholder="Centímetros" 
          placeholderTextColor={theme.colors.border} 
          value={prevInfo.altura?.toString() ?? undefined}
          style={[styles.input, themedStyles.input]}
          onChangeText={setHeight}
        />    
      </ThemedView>

      <ThemedView style={[styles.elementContainer, themedStyles.borderBottom, {justifyContent: "center"}]}>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]} onPress={resetHeight}>
          <MaterialIcons name="delete-outline" size={24} style={[ themedStyles.buttonDefaultText ]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonPrimary]} onPress={updateUserInStore}>
          <FontAwesome6 name="check" size={24} style={[ themedStyles.buttonPrimaryText, styles.icon ]} />
        </TouchableOpacity>
      </ThemedView>

      <ThemedText>{template.objectiveDescription}</ThemedText>
      <ThemedView style={[styles.elementContainer]}>
        <ThemedText type="defaultSemiBold">{template.objectiveText}: </ThemedText>
        {measureSteps && (
          <>
            <TextInput 
              keyboardType="numeric" 
              placeholder="Pasos" 
              placeholderTextColor={theme.colors.border}
              value={prevInfo?.objetivo?.diario?.pasos?.toString() ?? undefined}
              onChangeText={setObjectiveInSteps}
              style={[styles.input, themedStyles.input, themedStyles.showWhenObjectiveInSteps]} 
            />
            <ThemedText style={[themedStyles.showWhenObjectiveInSteps]}>
              <Ionicons name="footsteps-outline" size={24} style={themedStyles.buttonDefaultText} />
            </ThemedText>
          </>
        )}
        {!measureSteps && (
          <>
            <TextInput 
              keyboardType="numeric"
              placeholder="Kms"
              placeholderTextColor={theme.colors.border}
              value={prevInfo.objetivo?.diario?.kms?.toString() ?? undefined}
              onChangeText={setObjectiveInKilometers}
              style={[styles.input, themedStyles.input, themedStyles.hideWhenObjectiveInSteps]} 
            />
            <ThemedText style={[themedStyles.hideWhenObjectiveInSteps]}>
              <MaterialCommunityIcons name='speedometer' size={24} style={themedStyles.buttonDefaultText} />
            </ThemedText>
          </>
        )}
      </ThemedView>

      <ThemedView style={[styles.elementContainer, themedStyles.borderBottom, {justifyContent: "center"}]}>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]}>
          <MaterialIcons name="delete-outline" size={24} style={[ themedStyles.buttonDefaultText ]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]} onPress={handleObjectiveUnits}>
          <MaterialIcons name="autorenew" size={24} style={[themedStyles.buttonDefaultText]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonPrimary]} onPress={setDailyObjectives}>
          <FontAwesome6 name="check" size={24} style={[ themedStyles.buttonPrimaryText ]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={showUnitConversionInfo}>
          <MaterialIcons name="info-outline" size={24} style={[ themedStyles.buttonDefaultText ]} />
        </TouchableOpacity>
      </ThemedView>
    
      <ThemedText>{template.pathDescription}</ThemedText>
      <ThemedView style={styles.elementContainer}>
        <ThemedText type="defaultSemiBold">{template.pathText}: </ThemedText>
        <ModalRuta
          animationType="slide"
          transparent
        />
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
    borderWidth: 1,
    flex: 1
  },
  roundButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 8,
    width: 48,
    height: 48,
    borderRadius: 48
  },
  icon: {
    lineHeight: 24
  }
});
