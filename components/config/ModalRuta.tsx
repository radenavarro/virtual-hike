import { useTheme } from "@/hooks/useTheme";
import { Alert, FlatList, Modal, ModalProps, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";
import { useEffect, useState } from "react";
import { useAppStore } from "@/zustand/useStore";
import { BloquesCrearRuta } from "./BloquesCrearRuta";

import { RootSiblingParent } from "react-native-root-siblings";
import { useTemplate } from "@/hooks/useTemplate";
import { TemplateModalRuta } from "@/app/types";

/**
 * Componente Modal que se encarga de las rutas. Entiéndase como un partial.
 *
 * @param {ModalProps} otherProps - props del componente Modal
 * @return {JSX.Element} Componente Modal + Botón que lo habilita
 */
export const ModalRuta = ({...otherProps}:ModalProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false)
  const [showListRutas, setShowListRutas] = useState(false)
  const [selectedRuta, setSelectedRuta] = useState<string | undefined>(undefined)
  const [itemHasBeenPressed, setItemHasBeenPressed] = useState(false)

  const { ruta, addRuta, deleteRuta } = useAppStore()

  const { template } = useTemplate<TemplateModalRuta>('tabs/config/modalRuta')

  const theme = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setItemHasBeenPressed(false)
    }, 1000)
  }, [!!itemHasBeenPressed])
  
  const themedStyles = StyleSheet.create({
    modalWrapper: {
      minWidth: "100%",
      height: "100%",
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
      padding: 10,
      flex: 1
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
    closeButton: { 
      width: 48, height: 48, backgroundColor: theme.colors.background,
      display: "flex", flexDirection: "row", flexWrap: "nowrap", justifyContent: "center", alignItems: "center"
    },
    rutaItem: {
      borderColor: theme.colors.border, borderWidth: 1, padding: 10, borderRadius: 8, maxWidth: 100
    },
    rutaItemText: {
      fontSize: 10
    }
  })

  function toggleRutas () { setShowListRutas(!showListRutas) }

  function showModalRutas () { setShowModal(true) }

  function hideModalRutas () { 
    deselectRuta()
    setShowModal(false) 
  }

  function selectRuta (uuid:string) { 
    setSelectedRuta(uuid)
    setItemHasBeenPressed(true)
  }

  function deselectRuta () { setSelectedRuta(undefined) }

  const confirmDeleteRuta = () => {
    if (selectedRuta) {
      Alert.alert(
        "Eliminar ruta",
        "¿Seguro que quieres eliminar esta ruta?. Se borrará permanentemente.",
        [
          {
            text: "No eliminar",
            style: "cancel"
          },
          {
            text: "Eliminar del registro",
            onPress: () => { 
              deleteRuta(selectedRuta)
              deselectRuta()
            }
          }
        ]
      )
    }
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
        {/* RootSiblingParent ya está en la raíz de la app por lo que EN TEORÍA no debería hacer falta aquí, PERO se debe añadir 
        para que las notificaciones puedan aparecer en el modal. De lo contrario, no se ven */}
        <RootSiblingParent>
          <View style={[themedStyles.modalWrapper]}>
            <View style={[themedStyles.modal]}>
              {/* Título */}
              <View style={[themedStyles.modalSuperiorBar]}>
                <ThemedText type="subtitle">{template.header}</ThemedText>
                <TouchableOpacity style={[themedStyles.closeButton]} onPress={hideModalRutas}>
                  <Ionicons name="close" size={24} style={[themedStyles.buttonDefaultText]} />
                </TouchableOpacity>
              </View>

              <View style={[themedStyles.modalBody]}>
                {/* Visor de ruta */}
                <ThemedView style={[styles.elementContainer, {justifyContent: "space-between"}]}>
                  <View style={[styles.elementBlock]}>
                    <ThemedText>{template.currentPathText}: </ThemedText>
                    <ThemedText 
                      numberOfLines={1} 
                      ellipsizeMode="tail"
                      style={{maxWidth: 180}}
                    >
                      {selectedRuta ? ruta.find(ruta => ruta.uuid === selectedRuta)?.nombre : "Ninguna"}
                    </ThemedText>
                  </View>
                  <View style={[styles.elementBlock]}>
                    <TouchableOpacity 
                      disabled={!selectedRuta} 
                      onPress={deselectRuta} 
                      style={[
                        styles.roundButton, themedStyles.buttonDefault, 
                        {backgroundColor: selectedRuta ? theme.colors.button?.default?.color : theme.colors.button?.default?.disabledColor}
                      ]}>
                      <MaterialIcons 
                        name="delete-outline" 
                        size={24} 
                        style={[
                          themedStyles.buttonDefaultText, 
                          {color: selectedRuta ? theme.colors.button?.default?.text : theme.colors.button?.default?.disabledText}
                        ]} 
                      />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!selectedRuta} onPress={confirmDeleteRuta} style={[styles.roundButton, themedStyles.buttonDanger]}>                  
                      <MaterialIcons name="delete-forever" size={24} style={themedStyles.buttonDangerText} />
                    </TouchableOpacity>
                  </View> 
                </ThemedView>

                {/* Carga de ruta */}
                <ThemedView style={[styles.elementContainer]}>
                  <View style={[styles.elementBlock]}>
                    <ThemedText>{template.loadPathText}: </ThemedText>
                    <TouchableOpacity onPress={toggleRutas} style={[styles.roundButton, themedStyles.buttonDefault]}>
                      <MaterialIcons name="upload-file" size={24} style={[themedStyles.buttonDefaultText]} />
                    </TouchableOpacity>
                  </View>
                </ThemedView>

                {/* Lista de rutas */}
                <ThemedView style={[styles.elementContainer, {display: showListRutas ? "flex" : "none"}]}>
                  <FlatList 
                    style={{minHeight: 100, width: "100%"}}
                    keyExtractor={(item) => item.uuid}
                    data={ruta}
                    numColumns={4}
                    columnWrapperStyle={{gap: 8}}
                    renderItem={({item}) => (
                      <TouchableOpacity style={[styles.centerVertical, themedStyles.rutaItem]} onPress={() => {selectRuta(item.uuid)}}>
                        <ThemedText style={[themedStyles.rutaItemText]}>{item.nombre}</ThemedText>
                      </TouchableOpacity>
                    )}
                  />
                </ThemedView>

                <BloquesCrearRuta selectedRuta={selectedRuta} itemHasBeenPressed={itemHasBeenPressed} />
              </View>
            </View>      
          </View>
        </RootSiblingParent>
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
  },
  centerVertical: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});