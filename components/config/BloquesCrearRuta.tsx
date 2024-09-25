import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useAppStore } from "@/zustand/useStore";
import { Ruta, Split, TemplateModalRuta } from "@/app/types";
import Toast from "react-native-root-toast";
import { useTemplate } from "@/hooks/useTemplate";
import { isBetween } from "@/app/helpers/helpers";
import { produce } from "immer";

const initialTemp = {val: "", idx: 0}

export const BloquesCrearRuta = ({ selectedRuta }: { selectedRuta: string | undefined }) => {
  const [routeObjectiveInSteps, setrouteObjectiveInSteps] = useState(true)
  const [currentRuta, setCurrentRuta] = useState<Ruta | undefined>(undefined)
  const [currentSplit, setCurrentSplit] = useState<Split>({ nombre: "", km: 0, duracion: 0 })

  const [temporalInput, setTemporalInput] = useState({...initialTemp})
  
  const theme = useTheme();
  const { ruta } = useAppStore();
  const { template } = useTemplate<TemplateModalRuta>("tabs/config/modalRuta")

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
    },
    newSplit: {
      borderBottomWidth: 1, borderBottomColor: theme.colors.border, backgroundColor: theme.colors.newSplitBg
    }
  })

  function handleRouteObjectiveUnits () {
    setrouteObjectiveInSteps(!routeObjectiveInSteps)
  }

  function setRouteObjectives () {

  }

  // SPLIT HANDLERS

  /**
   * Maneja los inputs de nuevo split
   * @param value 
   * @param key 
   */
  function handleChangeNewSplit(value: string, key: keyof typeof currentSplit): void {
    setCurrentSplit({ ...currentSplit, [key]: value })
  }

  /**
   * Valida antes de añadir un nuevo split
   */
  function handleAddNewSplit(): void {
    const validatedSplit = validateCurrentSplit()
  }

  /**
   * Cambia el valor de inputs numéricos.
   * @param key 
   * @param index 
   * @returns 
   */
  function handleChangeNumeric(key: Exclude<keyof typeof currentSplit, "sprites" | "nombre">, index: number) {  
    if (!currentRuta || !currentRuta.splits) return

    setCurrentRuta(
      produce((draft) => {
        if (draft && draft.splits) {
          draft.splits[index][key] = typeof temporalInput.val === "number"
            ? temporalInput.val 
            : (Number(temporalInput.val) || draft.splits[index][key]);
        }
      })
    )
    setTemporalInput(initialTemp);
  }

  /**
   * Cambia el valor del input de nombre.
   * @param index 
   * @returns 
   */
  const handleChangeNombre = (index: number) => {
    if (!currentRuta || !currentRuta.splits) return

    setCurrentRuta(
      produce((draft) => {
        if (draft && draft.splits) {
          draft.splits[index].nombre = temporalInput.val || draft.splits[index].nombre;
        }
      })
    )
    setTemporalInput(initialTemp);
  }

  /**
   * Cambia el valor del input que se esté editando.
   * @param text 
   * @param index 
   */
  function handleChangeTemp(text: string, index: number) {
    setTemporalInput({ val: text, idx: index });
  }

  // VALIDATION

  function validateCurrentSplit() {
    if (!currentSplit) return false
    const failedValidations = []
    const overlappingSplits = findOverlappingSplits(currentRuta?.splits)
    
    const validations = [
      {condition: (!currentSplit.km && currentSplit.km !== 0),                          name: template.validationErrorMessages.noKm}, 
      {condition: (!currentSplit.duracion && currentSplit.duracion !== 0),              name: template.validationErrorMessages.noDuration}, 
      {condition: !currentSplit.nombre,                                                 name: template.validationErrorMessages.noName},
      {condition: currentSplit.km < 0,                                                  name: template.validationErrorMessages.kmBelowZero},
      {condition: currentSplit.duracion <= 0,                                           name: template.validationErrorMessages.durationZeroOrLess},
      {condition: currentSplit.nombre.length === 0,                                     name: template.validationErrorMessages.nameEmpty},
      {condition: existsInCurrentSplits(currentSplit.km.toString(), "km"),              name: template.validationErrorMessages.kmInSplits},
      {condition: existsInCurrentSplits(currentSplit.nombre.toString(), "nombre"),      name: template.validationErrorMessages.nameInSplits},
      {condition: overlappingSplits.length > 0,                                         name: template.validationErrorMessages.overlappingSplits + overlappingSplits.map(s => s.nombre)?.join(", ")},
    ]

    for (const validation of validations) {
      if (validation.condition) failedValidations.push(validation.name)
    }

    if (failedValidations.length > 0) {
      Toast.show(`${template.validationErrorMessages.splitErrorTitle}: ${failedValidations.join("\n\n")}`, {
        position: Toast.positions.CENTER,
        duration: 2000 + (failedValidations.length * 1000),
        backgroundColor: theme.colors.button.danger.disabledColor,
        hideOnPress: true
      })
    }
  }

  function existsInCurrentSplits(value:string, key: Exclude<keyof typeof currentSplit, "sprites">) {
    // Keys string
    if (isNaN(Number(value))) {
      return currentRuta?.splits?.some((s) => (s[key] as string)?.toLowerCase() === value?.toLowerCase())
    } 
    // Keys numericas
    else {
      return currentRuta?.splits?.some((s) => s[key] === Number(value))
    }
  }

  /**
   * Determina si entre los splits hay overlapping causado por incorrectos valores de km y duracion en alguno de ellos.
   * Devuelve los splits con problemas de overlapping.
   * @param key string
   */
  function findOverlappingSplits(allCurrentSplits: Split[] | undefined) {
    if (!allCurrentSplits) return []
    
    const overlappingSplits = (() => {
      let splits = []
      for (let split of allCurrentSplits) {
        splits.push(...splitOverlaps(split, allCurrentSplits))
      }
      return [...new Set(splits)]
    })()
    return overlappingSplits
  }

  function splitOverlaps (split: Split, allCurrentSplits: Split[]) {
    return allCurrentSplits?.filter((s) => {
      return (
        // isBetween(split.km, s.km, s.km + s.duracion, false) 
        // || isBetween(split.km + split.duracion, s.km, s.km + s.duracion, false)
        isBetween(s.km, split.km, split.km + split.duracion, false)
        || isBetween(s.km + s.duracion, split.km, split.km + split.duracion, false)
        && (s !== split)
      )
    })
  }

  return (
    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
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

      <ThemedView style={styles.elementContainer}>
        <ThemedText type="defaultSemiBold">Días para completar la ruta: </ThemedText>
        <TextInput
          keyboardType="numeric"
          placeholder="Nº días"
          placeholderTextColor={theme.colors.border}
          style={[styles.input, themedStyles.inputBorder]}
        />
      </ThemedView>
      <ThemedView style={[styles.elementContainer, styles.justifyCenter]}>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]}>
          <MaterialIcons name="delete-outline" size={24} style={[themedStyles.buttonDefaultText]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonPrimary]}>
          <FontAwesome6 name="add" size={24} style={[themedStyles.buttonPrimaryText]} />
        </TouchableOpacity>
      </ThemedView>

      {/* SPLITS */}
      <ThemedView style={[styles.elementContainer]}>
        <View style={styles.elementBlock}>
          <ThemedText type="defaultSemiBold">Splits:</ThemedText>
        </View>
      </ThemedView>

      {(currentRuta?.splits && currentRuta?.splits?.length > 0) && currentRuta.splits.map((split, index) => (
        <ThemedView key={index + JSON.stringify(split)} style={[styles.split, themedStyles.split, {display: "flex", flexDirection: "column"}]}>
          <ThemedView style={[styles.elementContainer]}>
            <ThemedText>Nombre: </ThemedText>
            <TextInput 
              placeholder="Nombre"
              placeholderTextColor={theme.colors.border}
              style={[styles.input, themedStyles.inputBorder, { flex: 1, color: theme.colors.text }]}
              defaultValue={split.nombre}
              onChangeText={(text) => handleChangeTemp(text, index)}
              onBlur={() => handleChangeNombre(index)}
            />
          </ThemedView>
          <ThemedView style={[styles.elementContainer]}>
            <ThemedText>Comienza en el km: </ThemedText>
            <TextInput 
              placeholder="Km"
              keyboardType="numeric"
              placeholderTextColor={theme.colors.border}
              style={[styles.input, themedStyles.inputBorder, { flex: 1, color: theme.colors.text }]}
              defaultValue={split.km?.toString()}
              onChangeText={(text) => handleChangeTemp(text, index)}
              onBlur={() => handleChangeNumeric("km", index)}
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
      {/* SECCIÓN NUEVO SPLIT */}
      <ThemedView style={[styles.split, themedStyles.newSplit, {display: "flex", flexDirection: "column"}]}>
        <ThemedView style={[styles.elementContainer, styles.themedViewInheritor]}>
          <ThemedText>Nombre: </ThemedText>
          <TextInput 
            placeholder="Nombre"
            placeholderTextColor={theme.colors.border}
            style={[styles.input, themedStyles.inputBorder, { flex: 1, color: theme.colors.text }]}
            value={currentSplit.nombre}
            onChangeText={(ev) => handleChangeNewSplit(ev, "nombre")}
          />
        </ThemedView>
        <ThemedView style={[styles.elementContainer, styles.themedViewInheritor]}>
          <ThemedText>Comienza en el km: </ThemedText>
          <TextInput 
            placeholder="Km"
            keyboardType="numeric"
            placeholderTextColor={theme.colors.border}
            style={[styles.input, themedStyles.inputBorder, { flex: 1, color: theme.colors.text }]}
            value={currentSplit.km?.toString()}
            onChangeText={(ev) => handleChangeNewSplit(ev, "km")}
          />
        </ThemedView>
        <ThemedView style={[styles.elementContainer, styles.themedViewInheritor]}>
          <ThemedText>Duración en kms: </ThemedText>
          <TextInput 
            placeholder="Duración en kms"
            keyboardType="numeric"
            placeholderTextColor={theme.colors.border}
            style={[styles.input, themedStyles.inputBorder, { flex: 1, color: theme.colors.text }]}
            value={currentSplit.duracion?.toString()}
            onChangeText={(ev) => handleChangeNewSplit(ev, "duracion")}
          />
        </ThemedView>
        <ThemedView style={[styles.elementContainer, styles.themedViewInheritor, styles.justifyCenter]}>
          <ThemedText>
            Añadir este split: 
          </ThemedText>
          <TouchableOpacity style={[styles.roundButton, themedStyles.buttonPrimary]} onPress={handleAddNewSplit}>
            <FontAwesome6 name="add" size={24} style={[themedStyles.buttonPrimaryText]} />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScrollView>
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
  justifyCenter: {
    justifyContent: 'center'
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
  themedViewInheritor: {
    backgroundColor: 'inherit',
  }
});