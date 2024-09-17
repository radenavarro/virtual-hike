import { Alert, FlatList, Modal, ModalProps, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useAppStore } from "@/zustand/useStore";
import { Ruta } from "@/app/types";

export const BloquesCrearRuta = ({ selectedRuta }: { selectedRuta: string | undefined }) => {
  const [routeObjectiveInSteps, setrouteObjectiveInSteps] = useState(true)
  const [currentRuta, setCurrentRuta] = useState<Ruta | undefined>(undefined)
  
  const theme = useTheme();
  const { ruta } = useAppStore();

  useEffect(() => {
    setCurrentRuta(ruta?.find((r) => r.uuid === selectedRuta))
  }, [selectedRuta])
  
  
  const themedStyles = StyleSheet.create({
    modalWrapper: {
      minWidth: "100%",
      minHeight: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modal: {
      minHeight: "100%",
      width: "100%",
      marginHorizontal: "auto",
    },
    modalSuperiorBar: {
      backgroundColor: theme.colors.border,
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "center",
      color: theme.colors.text,
      padding: 10
    },
    modalBody: {
      backgroundColor: theme.colors.background,
      padding: 10
    },
    buttonPrimary: {
      backgroundColor: theme.colors.button?.primary?.color,
    },
    buttonPrimaryText: {
      color: theme.colors.button?.primary?.text
    },
    buttonDanger: {
      backgroundColor: selectedRuta ? theme.colors.button?.danger?.color : theme.colors.button?.danger?.disabledColor,
    },
    buttonDangerText: {
      color: selectedRuta ? theme.colors.button?.danger?.text : theme.colors.button?.danger?.disabledText
    },
    buttonDefault: {
      borderColor: theme.colors.border,
      borderWidth: 1,
      fontWeight: "bold",
      backgroundColor: selectedRuta ? theme.colors.button?.default?.color : theme.colors.button?.default?.disabledColor
    },
    buttonDefaultText: {
      color: theme.colors.button?.default?.text
    },
    inputBorder: {
      borderColor: theme.colors.border
    },
    showWhenRouteObjectiveInSteps: {
      display: routeObjectiveInSteps ? "flex" : "none"
    },
    hideWhenRouteObjectiveInSteps: {
      display: !routeObjectiveInSteps ? "flex" : "none"
    },
    closeButton: { 
      width: 48, height: 48, backgroundColor: theme.colors.background,
      display: "flex", flexDirection: "row", flexWrap: "nowrap", justifyContent: "center", alignItems: "center"
    },
    rutaItem: {
      borderColor: theme.colors.border, borderWidth: 1, padding: 10, borderRadius: 8
    },
    split: {
      borderBottomWidth: 1, borderBottomColor: theme.colors.border
    }
  })

  function handleRouteObjectiveUnits () {
    setrouteObjectiveInSteps(!routeObjectiveInSteps)
  }

  function setRouteObjectives () {

  }

  return (
    <>
      <ThemedView style={[styles.elementContainer, {justifyContent: "space-between"}]}>
        <View style={styles.elementBlock}>
          <ThemedText style={themedStyles.showWhenRouteObjectiveInSteps}>Nombre de la ruta: </ThemedText>
          <TextInput
            placeholder="Nombre"
            placeholderTextColor={theme.colors.border}
            style={[styles.input, themedStyles.inputBorder, { flex: 1 }]}
          />
        </View>
      </ThemedView>
      <ThemedView style={[styles.elementContainer, {justifyContent: "space-between"}]}>
        <View style={styles.elementBlock}>
          <ThemedText type="defaultSemiBold">Splits:</ThemedText>
        </View>
      </ThemedView>

      <ScrollView
        indicatorStyle={theme.dark ? "white" : "black"}
        style={[{height: 300}]}
        
      >
        {currentRuta?.splits?.map((split, i) => (
          <ThemedView key={i} style={[styles.split, themedStyles.split, {display: "flex", flexDirection: "column"}]}>
            <ThemedView style={[styles.elementContainer]}>
              <ThemedText>Nombre: </ThemedText>
              <TextInput 
                placeholder="Nombre"
                placeholderTextColor={theme.colors.border}
                style={[styles.input, themedStyles.inputBorder, { flex: 1, color: theme.colors.text }]}
                value={split.nombre}
              />
            </ThemedView>
            <ThemedView style={[styles.elementContainer]}>
              <ThemedText>Comienza en el km: </ThemedText>
              <TextInput 
                placeholder="Kms"
                keyboardType="numeric"
                placeholderTextColor={theme.colors.border}
                style={[styles.input, themedStyles.inputBorder, { flex: 1, color: theme.colors.text }]}
                value={split.km?.toString()}
              />
            </ThemedView>
            <ThemedView style={[styles.elementContainer]}>
              <ThemedText>Duración en kms: </ThemedText>
              <TextInput 
                placeholder="Duración en kms"
                keyboardType="numeric"
                placeholderTextColor={theme.colors.border}
                style={[styles.input, themedStyles.inputBorder, { flex: 1, color: theme.colors.text }]}
                value={split.duracion?.toString()}
              />
            </ThemedView>
            <ThemedView style={[styles.elementContainer]}>
              <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]}>
                <MaterialIcons name="edit" size={24} style={themedStyles.buttonDefaultText} />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        
        ))}

      </ScrollView>
      
      {/* <ThemedView style={[styles.elementContainer, {justifyContent: "space-between"}]}>
        <View style={styles.elementBlock}>
          <TextInput
            keyboardType="numeric"
            placeholder="Pasos"
            placeholderTextColor={theme.colors.border}
            style={[styles.input, themedStyles.inputBorder, themedStyles.showWhenRouteObjectiveInSteps]}
          />
          <ThemedText style={[themedStyles.showWhenRouteObjectiveInSteps]}>Pasos</ThemedText>
          <TextInput
            keyboardType="numeric"
            placeholder="Kilómetros"
            placeholderTextColor={theme.colors.border}
            style={[styles.input, themedStyles.inputBorder, themedStyles.hideWhenRouteObjectiveInSteps]}
          />
          <ThemedText style={[themedStyles.hideWhenRouteObjectiveInSteps]}>Kms</ThemedText>
        </View>
        <View style={styles.elementBlock}>
          <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]}>
            <MaterialIcons name="delete-outline" size={24} style={[themedStyles.buttonDefaultText]} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]} onPress={handleRouteObjectiveUnits}>
            <MaterialIcons name="autorenew" size={24} style={[themedStyles.buttonDefaultText]} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.roundButton, themedStyles.buttonPrimary]} onPress={setRouteObjectives}>
            <FontAwesome6 name="add" size={24} style={[themedStyles.buttonPrimaryText]} />
          </TouchableOpacity>
        </View>
      </ThemedView>

      <ThemedView style={styles.elementContainer}>
        <ThemedText type="defaultSemiBold">Días para completar la ruta: </ThemedText>
        <TextInput
          keyboardType="numeric"
          placeholder="Nº días"
          placeholderTextColor={theme.colors.border}
          style={[styles.input, themedStyles.inputBorder]}
        />
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]}>
          <MaterialIcons name="delete-outline" size={24} style={[themedStyles.buttonDefaultText]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonPrimary]}>
          <FontAwesome6 name="add" size={24} style={[themedStyles.buttonPrimaryText]} />
        </TouchableOpacity>
      </ThemedView> */}
    </>
  )
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
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center'
  },
  elementBlock: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 8,
    alignItems: 'center'
  },
  input: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 120
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
  },
  split: {
    padding: 20,
  },
});