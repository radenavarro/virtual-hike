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
import { getAllOverlappingsInSplits } from "@/app/helpers/helpers";
import { produce } from "immer";

const initialTemp = {val: "", idx: 0}
const initialSplit = { nombre: "", km: 0, duracion: 0 }

export const BloquesCrearRuta = ({ selectedRuta, itemHasBeenPressed }: { selectedRuta: string | undefined; itemHasBeenPressed: boolean }) => {
  const [routeObjectiveInSteps, setrouteObjectiveInSteps] = useState(true)
  const [currentRuta, setCurrentRuta] = useState<Ruta | undefined>(undefined)
  const [currentSplit, setCurrentSplit] = useState<Split>(initialSplit)

  const [temporalInput, setTemporalInput] = useState({...initialTemp})
  
  const theme = useTheme();
  const { ruta, addRuta, updateRuta } = useAppStore();
  const { template } = useTemplate<TemplateModalRuta>("tabs/config/modalRuta")

  useEffect(() => {
    setCurrentRuta(ruta?.find((r) => r.uuid === selectedRuta))
  }, [selectedRuta, !!itemHasBeenPressed])

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
    separator: {
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

  // RUTA HANDLERS

  /**
   * Handler de input de nombre
   * 
   * @param value - Nombre de la ruta
   */
  function handleChangeNombreRuta (value: string) {
    setCurrentRuta(
      produce((draft) => ({...draft, nombre: value}))
    )
  }

  /**
   * Handler de input de días
   * 
   * @param value - Número de días
   */
  function handleChangeNumDias (value: string) {
    setCurrentRuta(
      produce((draft) => ({...draft, dias: parseInt(value)}))
    )
  }

  /**
   * Vacía los campos de ruta sin deseleccionar la misma
   * 
   * @returns void
   */
  function emptyRutaFields () {
    if (!currentRuta) return
    const { uuid } = currentRuta
    const emptyRutaExceptUUID = { uuid, nombre: undefined, dias: undefined, splits: [] }
    setCurrentRuta(emptyRutaExceptUUID)
  }

  /**
   * Crea una nueva ruta en la store y muestra un toast de confirmación
   */
  function createRuta () {
    if (currentRuta) {
      addRuta(currentRuta)
      Toast.show(template.validationMessages.rutaAdded, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        backgroundColor: theme.colors.button?.success?.disabledColor,
      })
    }
  }

  /**
   * Actualiza la ruta en la store y muestra un toast de confirmación
   * 
   * @returns void
   */
  function editRuta () {
    if (!currentRuta) return
    updateRuta(currentRuta)
    Toast.show(template.validationMessages.rutaEdited, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      backgroundColor: theme.colors.button?.success?.disabledColor,
    })
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
    const splitIsValid = validateCurrentSplit()
    if (splitIsValid && currentRuta && currentSplit) {
      const parsedCurrentSplit = {...currentSplit, km: Number(currentSplit.km), duracion: Number(currentSplit.duracion)}
      const modifiedRuta = {
        ...currentRuta,
        splits: [...currentRuta?.splits || [], parsedCurrentSplit]
      }
      updateRuta(modifiedRuta)
      setCurrentRuta(modifiedRuta)
      setCurrentSplit(initialSplit)
      Toast.show(template.validationMessages.splitAdded, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        backgroundColor: theme.colors.button?.success?.color,
        hideOnPress: true
      })
    }
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

  /**
   * Función validadora de splits
   * 
   * @returns true si la ruta es válida, false si no
   */
  function validateCurrentSplit() {
    if (!currentSplit) return false
    const parsedCurrentSplit = {...currentSplit, km: Number(currentSplit.km), duracion: Number(currentSplit.duracion)}
    const failedValidations = []
    const overlappingSplits = findOverlappingSplits([...currentRuta?.splits || [], parsedCurrentSplit])
    
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
    } else return true
  }

  /**
   * Determina si un valor ya existe en los splits
   * 
   * @param value 
   * @param key 
   * @returns 
   */
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
    let splits = getAllOverlappingsInSplits(allCurrentSplits) || []
    return splits
  }

  return (
    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
      <ThemedView style={[styles.elementContainer, {justifyContent: "space-between"}]}>
        <View style={styles.elementBlock}>
          <ThemedText style={themedStyles.showWhenRouteObjectiveInSteps}>Nombre de la ruta: </ThemedText>
          <TextInput
            placeholder="Nombre"
            placeholderTextColor={theme.colors.border}
            style={[styles.input, themedStyles.inputBorder, { flex: 1, color: theme.colors.text }]}
            value={currentRuta?.nombre ?? undefined}
            onChangeText={handleChangeNombreRuta}
          />
        </View>
      </ThemedView>

      <ThemedView style={styles.elementContainer}>
        <ThemedText type="defaultSemiBold">Días para completar la ruta: </ThemedText>
        <TextInput
          keyboardType="numeric"
          placeholder="Nº días"
          placeholderTextColor={theme.colors.border}
          style={[styles.input, themedStyles.inputBorder, {color: theme.colors.text}]}
          value={currentRuta?.dias?.toString() ?? undefined}
          onChangeText={handleChangeNumDias}
        />
      </ThemedView>
      <ThemedView style={[styles.elementContainer, styles.justifyCenter, themedStyles.separator, {paddingBottom: 20}]}>
        <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]} onPress={emptyRutaFields}>
          <MaterialIcons name="delete-outline" size={24} style={[themedStyles.buttonDefaultText]} />
        </TouchableOpacity>
        {currentRuta?.uuid && (
          <TouchableOpacity style={[styles.roundButton, themedStyles.buttonPrimary]} onPress={editRuta}>
            <FontAwesome6 name="save" size={24} style={[themedStyles.buttonPrimaryText]} />
          </TouchableOpacity>
        )}
        {!currentRuta?.uuid && (
          <TouchableOpacity style={[styles.roundButton, themedStyles.buttonPrimary]} onPress={createRuta}>
            <FontAwesome6 name="add" size={24} style={[themedStyles.buttonPrimaryText]} />
          </TouchableOpacity>
        )}
      </ThemedView>

      {currentRuta?.uuid && (
        <>
          {/* SPLITS */}
          <ThemedView style={[styles.elementContainer]}>
            <View style={styles.elementBlock}>
              <ThemedText type="defaultSemiBold">Splits:</ThemedText>
            </View>
          </ThemedView>

          {(currentRuta?.splits && currentRuta?.splits?.length > 0) && currentRuta.splits.map((split, index) => (
            <ThemedView key={index + JSON.stringify(split)} style={[styles.split, themedStyles.separator, {display: "flex", flexDirection: "column"}]}>
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
        </>
      )}
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
    minWidth: 120,
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
  },
  split: {
    padding: 20,
  },
  themedViewInheritor: {
    backgroundColor: 'inherit',
  }
});