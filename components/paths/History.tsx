// STORE
import { useAppStore } from '@/zustand/useStore';
import { FlatList, View, Text } from 'react-native';
// import { ThemedText } from '../ThemedText';
import { StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import dayjs from 'dayjs';
import { useTheme } from '@/hooks/useTheme';
import { Collapsible } from '../Collapsible';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';

const History = () => {
  const historico = useAppStore(state => state.historico)?.sort((a, b) => dayjs(b.fecha)?.isAfter(dayjs(a.fecha)) ? 1 : -1)
  const objetivoActual = useAppStore(state => state.objetivo)
  const theme = useTheme()
  return (
    <View>
      <FlatList 
        data={historico}
        numColumns={1}    
        renderItem={({ item }) => {
          const euroFormatDate = dayjs(item.fecha)?.format("DD-MM-YYYY")
          return (
            <Collapsible 
              title={euroFormatDate} 
              style={{
                ...styles.summary, 
                borderColor: theme.colors.border, 
                borderWidth: 1,
              }} 
              contentStyle={{
                ...styles.dayDetailsWrapper,
                borderColor: theme.colors.border,
              }}
            >
              {/* Dia */}

              <View style={styles.dayDetails}>
                <Ionicons name='footsteps' size={18} color={theme.colors.primary} />
                <Progress.Circle 
                  progress={(item.pasos || 1) / (item.objetivo?.diario || objetivoActual.diario || 1)} 
                  color={theme.colors.primary}
                  unfilledColor={theme.colors.background}
                  showsText={true}
                  textStyle={{fontSize: 12}}
                  thickness={6}
                />
              </View>

              {/* Ruta */}
              <View style={styles.dayDetails}>
                <Ionicons name='walk' size={18} color={theme.colors.primary} />
                <ThemedText>{item.ruta || ' - '}</ThemedText>
              </View>
            </Collapsible>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  summary: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    flex: 1,
  },
  dayDetailsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginTop: 0,
    padding: 8,
  },
  dayDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  }
})

export default History