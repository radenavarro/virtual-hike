import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Pressable } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CountryFlag from 'react-native-country-flag';
import { useAppStore } from '@/zustand/useStore';
import { Idioma, TemplateIdioma } from '../types';
import { useEffect, useState } from 'react';
import { english } from '../languages/tabs/language/english';
import { spanish } from '../languages/tabs/language/spanish';

export default function TabFourScreen() {
  const {idioma, setIdioma} = useAppStore()
  const [template, setTemplate] = useState<TemplateIdioma>(spanish)

  useEffect(() => {
    if (idioma) {
      manejarTemplate()
    }
  }, [idioma])

  /**
   * Setea un template de idioma para el actual componente acorde al idioma seleccionado en la store de Zustand
   */
  function manejarTemplate () {
    let selectedTemplate = spanish
    if (idioma === 'English') selectedTemplate = english
    setTemplate(selectedTemplate)
  }

  /**
   * Handler de idioma que setea en la store de Zustand
   * @param lang 
   */
  function manejarIdioma (lang:Idioma) {
    setIdioma(lang)
  }

  function esSeleccionado (lang:Idioma) {
    return idioma === lang
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="language" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{template.header}</ThemedText>
      </ThemedView>
      <ThemedText>{template.subheader}</ThemedText>
      <ThemedView style={styles.flagContainer}>
        <Pressable style={[styles.language, esSeleccionado('Español') ? styles.selected : {}]} onPress={() => manejarIdioma('Español')}>
          <CountryFlag isoCode='es' size={32} />
          <ThemedText>
            Español
          </ThemedText>
        </Pressable>
        <Pressable style={[styles.language, esSeleccionado('English') ? styles.selected : {}]} onPress={() => manejarIdioma('English')}>
          <CountryFlag isoCode='gb' size={32} />
          <ThemedText>
            English
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  flagContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 24
  },
  language: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: 8
  },
  selected: {
    outlineColor: "white",
    outlineStyle: "solid",
    outlineWidth: 4
  }
});
