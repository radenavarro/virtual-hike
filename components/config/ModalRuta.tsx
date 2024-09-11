import { useTheme } from "@/hooks/useTheme";
import { FlatList, Modal, ModalProps, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";
import { useState } from "react";
import { useAppStore } from "@/zustand/useStore";

/**
 * Componente Modal que se encarga de las rutas. Entiéndase como un partial.
 *
 * @param {ModalProps} otherProps - props del componente Modal
 * @return {JSX.Element} Componente Modal + Botón que lo habilita
 */
export const ModalRuta = ({...otherProps}:ModalProps): JSX.Element => {
  const [routeObjectiveInSteps, setrouteObjectiveInSteps] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showListRutas, setShowListRutas] = useState(false)

  const { ruta, addRuta, deleteRuta } = useAppStore()

  const theme = useTheme();
  const themedStyles = StyleSheet.create({
    modalWrapper: {
      minWidth: "100%",
      minHeight: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    modal: {
      minHeight: "100%",
      width: "90%",
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
    inputBorder: {
      borderColor: theme.colors.border
    },
    showWhenRouteObjectiveInSteps: {
      display: routeObjectiveInSteps ? "flex" : "none"
    },
    hideWhenRouteObjectiveInSteps: {
      display: !routeObjectiveInSteps ? "flex" : "none"
    }
  })

  function handleRouteObjectiveUnits () {
    setrouteObjectiveInSteps(!routeObjectiveInSteps)
  }

  function setRouteObjectives () {

  }

  function toggleRutas () {
    setShowListRutas(!showListRutas)
  }

  function showModalRutas () {
    setShowModal(true)
  }

  function hideModalRutas () {
    setShowModal(false)
  }

  return (
    <>
      <TouchableOpacity  style={[styles.roundButton, themedStyles.buttonPrimary]} onPress={showModalRutas}>
        <FontAwesome6 name="person-walking" size={24} style={[ themedStyles.buttonPrimaryText ]} />
      </TouchableOpacity>
      <Modal
        visible={otherProps.visible || showModal}
        onDismiss={otherProps.onDismiss || hideModalRutas}
        onRequestClose={otherProps.onRequestClose || hideModalRutas}
        {...otherProps}
      >
        {/* El modalwrapper sólo añade un alpha fuera del modal */}
        <View style={[themedStyles.modalWrapper]}>
          <View style={[themedStyles.modal]}>
            <View style={[themedStyles.modalSuperiorBar]}>
              <ThemedText type="subtitle">Gestión de rutas</ThemedText>
              <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]} onPress={hideModalRutas}>
                <Ionicons name="close" size={24} style={[themedStyles.buttonDefaultText]} />
              </TouchableOpacity>
            </View>
            <View style={[themedStyles.modalBody]}>
              <ThemedView style={styles.elementContainer}>
                <ThemedText>Cargar ruta: </ThemedText>
                <TouchableOpacity onPress={toggleRutas} style={[styles.roundButton, themedStyles.buttonDefault]}>
                  <FontAwesome6 name="file-arrow-up" size={24} style={[themedStyles.buttonDefaultText]} />
                </TouchableOpacity>
                
                <FlatList 
                  data={ruta}
                  renderItem={({item}) => (
                    <ThemedText>{item.nombre}</ThemedText>
                  )}
                />
              </ThemedView>
              <ThemedView style={styles.elementContainer}>
                <ThemedText style={[themedStyles.showWhenRouteObjectiveInSteps]}>Pasos</ThemedText>
                <TextInput
                  keyboardType="numeric"
                  placeholder="Kilómetros"
                  placeholderTextColor={theme.colors.border}
                  style={[styles.input, themedStyles.inputBorder, themedStyles.hideWhenRouteObjectiveInSteps]}
                />
                <ThemedText style={[themedStyles.hideWhenRouteObjectiveInSteps]}>Kms</ThemedText>
                <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]}>
                  <FontAwesome6 name="trash-can" size={24} style={[themedStyles.buttonDefaultText]} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.roundButton, themedStyles.buttonDefault]} onPress={handleRouteObjectiveUnits}>
                  <FontAwesome6 name="arrows-rotate" size={24} style={[themedStyles.buttonDefaultText]} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.roundButton, themedStyles.buttonPrimary]} onPress={setRouteObjectives}>
                  <FontAwesome6 name="add" size={24} style={[themedStyles.buttonPrimaryText]} />
                </TouchableOpacity>
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
                  <FontAwesome6 name="trash-can" size={24} style={[themedStyles.buttonDefaultText]} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.roundButton, themedStyles.buttonPrimary]}>
                  <FontAwesome6 name="add" size={24} style={[themedStyles.buttonPrimaryText]} />
                </TouchableOpacity>
              </ThemedView>
            </View>      
          </View> 
        </View>
      </Modal>
    </>
  )}

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
  },
  icon: {
    lineHeight: 24
  }
});