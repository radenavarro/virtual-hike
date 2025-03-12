import { ImageSourcePropType, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useAppStore } from "@/zustand/useStore";
import { Ruta, Split, SpriteType, TemplateModalRuta } from "@/app/types";
import Toast from "react-native-root-toast";
import { useTemplate } from "@/hooks/useTemplate";
import { getAllOverlappingsInSplits, GRAPHICS } from "@/app/helpers/helpers";
import { produce } from "immer";
import { SelectGraphic } from "./SelectGraphic";

const initialTemp = {val: "", idx: 0}
const initialSplit = { nombre: "", km: 0, duracion: 0 }

export const BloquesCrearRuta = ({ selectedRuta, itemHasBeenPressed }: { selectedRuta: string | undefined; itemHasBeenPressed: boolean }) => {
  const [routeObjectiveInSteps, setrouteObjectiveInSteps] = useState(true)
  const [currentRuta, setCurrentRuta] = useState<Ruta | undefined>(undefined)
  const [currentSplit, setCurrentSplit] = useState<Split>(initialSplit)

  const [temporalInput, setTemporalInput] = useState({...initialTemp})
  
  const theme = useTheme();
  const { ruta, addRuta, updateRuta } = useAppStore();
  const templateModalRuta = useTemplate<TemplateModalRuta>("tabs/config/modalRuta").template

  useEffect(() => {
    setCurrentRuta(ruta?.find((r) => r.uuid === selectedRuta))
  }, [selectedRuta, !!itemHasBeenPressed])
  
  const graphics = GRAPHICS.getFrom(["cave", "forest", "grass", "lake", "marsh", "town", "wasteland"])

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
    },
    dangerBorder: {
      borderColor: theme.colors.button.danger.color
    },
    dangerText: {
      color: theme.colors.button.danger.color
    }
  })

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
    const diasValue = isNaN(parseInt(value)) ? undefined : parseInt(value)
    setCurrentRuta(
      produce((draft) => ({...draft, dias: diasValue}))
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
      Toast.show(templateModalRuta.validationMessages.rutaAdded, {
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
    Toast.show(templateModalRuta.validationMessages.rutaEdited, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      backgroundColor: theme.colors.button?.success?.disabledColor,
    })
  }

  // ==================== SPLIT HANDLERS ===========================

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
      Toast.show(templateModalRuta.validationMessages.splitAdded, {
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
            ? temporalInput.val : (Number(temporalInput.val) || 0);
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
   * Cambia los sprites del split, concretamente un tipo de gráfico (skybox, ground, overlay). NO GUARDA EN LA STORE, ESO SE HACE CON EL BOTÓN GUARDAR
   * @param type 
   * @param source 
   * @param index 
   * @returns 
   */
  const handleChangeSprite = (type: keyof SpriteType, source: ImageSourcePropType, index: number) => {
    if (!currentRuta || !currentRuta.splits) return
    setCurrentRuta(
      produce((draft) => {
        if (draft?.splits?.[index] && !draft?.splits?.[index]?.sprites) {
          draft.splits[index].sprites = {
            [type]: source
          };
        } else if (draft?.splits?.[index] && draft?.splits?.[index]?.sprites) {
          draft.splits[index].sprites[type] = source
        }
      })
    )
    Toast.show(templateModalRuta.validationMessages.spriteChanged, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      backgroundColor: theme.colors.button?.success?.color
    })
  }

  /**
   * Cambia el valor del input que se esté editando.
   * @param text 
   * @param index 
   */
  function handleChangeTemp(text: string, index: number) {
    setTemporalInput({ val: text, idx: index });
  }

  function removeSplit(idx: number) {
    setCurrentRuta(
      produce((draft) => {
        if (draft && draft.splits) {
          draft.splits.splice(idx, 1);
        }
      })
    )
    return Toast.show(templateModalRuta.validationMessages.splitRemoved, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      backgroundColor: theme.colors.button?.success?.color
    })
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
      {condition: (!currentSplit.km && currentSplit.km !== 0),                          name: templateModalRuta.validationErrorMessages.noKm}, 
      {condition: (!currentSplit.duracion && currentSplit.duracion !== 0),              name: templateModalRuta.validationErrorMessages.noDuration}, 
      {condition: !currentSplit.nombre,                                                 name: templateModalRuta.validationErrorMessages.noName},
      {condition: currentSplit.km < 0,                                                  name: templateModalRuta.validationErrorMessages.kmBelowZero},
      {condition: currentSplit.duracion <= 0,                                           name: templateModalRuta.validationErrorMessages.durationZeroOrLess},
      {condition: currentSplit.nombre.length === 0,                                     name: templateModalRuta.validationErrorMessages.nameEmpty},
      {condition: existsInCurrentSplits(currentSplit.km.toString(), "km"),              name: templateModalRuta.validationErrorMessages.kmInSplits},
      // {condition: existsInCurrentSplits(currentSplit.nombre.toString(), "nombre"),      name: templateModalRuta.validationErrorMessages.nameInSplits},
      {condition: overlappingSplits.length > 0,                                         name: templateModalRuta.validationErrorMessages.overlappingSplits + overlappingSplits.map(s => s.nombre)?.join(", ")},
    ]

    for (const validation of validations) {
      if (validation.condition) failedValidations.push(validation.name)
    }

    if (failedValidations.length > 0) {
      Toast.show(`${templateModalRuta.validationErrorMessages.splitErrorTitle}: ${failedValidations.join("\n\n")}`, {
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
          <ThemedText style={themedStyles.showWhenRouteObjectiveInSteps}>{templateModalRuta.pathNameText}: </ThemedText>
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
        <ThemedText type="default">{templateModalRuta.daysToCompleteText}: </ThemedText>
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
              <ThemedText type="defaultSemiBold">{templateModalRuta.split?.splitsText}:</ThemedText>
            </View>
          </ThemedView>

          {(currentRuta?.splits && currentRuta?.splits?.length > 0) && currentRuta.splits.map((split, index) => (
            <ThemedView key={index + JSON.stringify(split)} style={[styles.split, themedStyles.separator, {display: "flex", flexDirection: "column"}]}>
              <ThemedView style={[styles.elementContainer]}>
                <ThemedText>{templateModalRuta.split?.nameText}: </ThemedText>
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
                <ThemedText>{templateModalRuta.split?.startsInKmText}: </ThemedText>
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
                <ThemedText>{templateModalRuta.split?.durationKmsText}: </ThemedText>
                <TextInput 
                  placeholder="Duración en kms"
                  keyboardType="numeric"
                  placeholderTextColor={theme.colors.border}
                  style={[styles.input, themedStyles.inputBorder, { flex: 1, color: theme.colors.text }]}
                  defaultValue={split.duracion?.toString()}
                  onChangeText={(text) => handleChangeTemp(text, index)}
                  onBlur={() => handleChangeNumeric("duracion", index)}
                />
              </ThemedView>

              <ThemedView style={[styles.elementContainer, {flexDirection: "column", width: "100%"}]}>
                <ThemedText style={{alignSelf: "flex-start"}}>{templateModalRuta.split?.graphics?.nameText}: </ThemedText>
                <ThemedView style={[styles.indentLeft, styles.rowWrap]}>
                  <TouchableOpacity style={{flex: 1, position: 'relative'}}>
                    <SelectGraphic 
                      options={graphics} 
                      labelText={templateModalRuta.split?.graphics?.skyboxText}
                      alias={templateModalRuta.split?.graphics?.alias}
                      resizeMode={"contain"}
                      source={ split.sprites?.skybox || require('@/assets/images/backgrounds/grass/skybox.png') }
                      type={"skybox"}
                      onSelect={(dir, source) => handleChangeSprite(dir, source, index)}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity  style={{flex: 1, position: 'relative'}}>
                    <SelectGraphic 
                      options={graphics} 
                      labelText={templateModalRuta.split?.graphics?.backgroundText}
                      alias={templateModalRuta.split?.graphics?.alias}
                      resizeMode={"contain"}
                      source={ split.sprites?.background || require('@/assets/images/backgrounds/grass/background.png') }
                      type={"background"}
                      onSelect={(dir, source) => handleChangeSprite(dir, source, index)}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity  style={{flex: 1, position: 'relative'}}>
                    <SelectGraphic 
                      options={graphics} 
                      labelText={templateModalRuta.split?.graphics?.middleText}
                      alias={templateModalRuta.split?.graphics?.alias}
                      resizeMode={"contain"}
                      source={ split.sprites?.ground || require('@/assets/images/backgrounds/grass/ground.png') }
                      type={"ground"}
                      onSelect={(dir, source) => handleChangeSprite(dir, source, index)}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity  style={{flex: 1, position: 'relative'}}>
                    <SelectGraphic 
                      options={graphics} 
                      labelText={templateModalRuta.split?.graphics?.foregroundText}
                      alias={templateModalRuta.split?.graphics?.alias}
                      resizeMode={"contain"}
                      source={ split.sprites?.overlay || require('@/assets/images/backgrounds/grass/overlay.png') }
                      type={"overlay"}
                      onSelect={(dir, source) => handleChangeSprite(dir, source, index)}
                    />
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>
              <ThemedView style={[styles.elementContainer, {justifyContent: "center"}]}>
                <TouchableOpacity style={[styles.buttonWithText, themedStyles.buttonDefault, themedStyles.dangerBorder]} onPress={() => removeSplit(index)}>
                  <ThemedText style={[themedStyles.dangerText]}>{templateModalRuta.split?.removeSplit}</ThemedText>
                  <MaterialIcons name="remove" size={24} style={[themedStyles.buttonDefaultText]} />
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          ))}
          {/* SECCIÓN NUEVO SPLIT */}
          <ThemedView style={[styles.split, themedStyles.newSplit, {display: "flex", flexDirection: "column"}]}>
            <ThemedView style={[styles.elementContainer, styles.themedViewInheritor]}>
              <ThemedText>{templateModalRuta.split?.nameText}: </ThemedText>
              <TextInput 
                placeholder={templateModalRuta.split?.namePhText}
                placeholderTextColor={theme.colors.border}
                style={[styles.input, themedStyles.inputBorder, { flex: 1, color: theme.colors.text }]}
                value={currentSplit.nombre}
                onChangeText={(ev) => handleChangeNewSplit(ev, "nombre")}
              />
            </ThemedView>
            <ThemedView style={[styles.elementContainer, styles.themedViewInheritor]}>
              <ThemedText>{templateModalRuta.split?.startsInKmText}: </ThemedText>
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
              <ThemedText>{templateModalRuta.split?.durationKmsText}: </ThemedText>
              <TextInput 
                placeholder={templateModalRuta.split?.durationKmsPhText}
                keyboardType="numeric"
                placeholderTextColor={theme.colors.border}
                style={[styles.input, themedStyles.inputBorder, { flex: 1, color: theme.colors.text }]}
                value={currentSplit.duracion?.toString()}
                onChangeText={(ev) => handleChangeNewSplit(ev, "duracion")}
              />
            </ThemedView>
            <ThemedView style={[styles.elementContainer, styles.themedViewInheritor, styles.justifyCenter]}>
              <ThemedText>
                {templateModalRuta.split?.addSplit}: 
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
  },
  buttonWithText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    gap: 8
  },
  indentLeft: {
    marginLeft: 20,
  },
  rowWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8
  },
  thumbnail: {
    height: 32
  }
});