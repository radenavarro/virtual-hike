// STORE
import { useAppStore } from '@/zustand/useStore';
import { FlatList, View, Text } from 'react-native';
import { ThemedText } from '../ThemedText';
import { StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import dayjs from 'dayjs';
import { useTheme } from '@/hooks/useTheme';

const History = () => {
  const historico = useAppStore(state => state.historico)
  const objetivoActual = useAppStore(state => state.objetivo)
  const theme = useTheme()
  return (
    <View>
      <FlatList 
        data={historico}
        numColumns={2}
        renderItem={({ item }) => {
          const euroFormatDate = dayjs(item.fecha)?.format("DD-MM-YYYY")
          return (
            <View style={{...styles.summary, borderColor: theme.colors.border, borderWidth: 1}}>
              <ThemedText>{euroFormatDate}</ThemedText>
              <Progress.Circle 
                progress={(item.pasos || 1) / (item.objetivo?.diario || objetivoActual.diario || 1)} 
                color={theme.colors.primary}
                unfilledColor={theme.colors.background}
                showsText={true}
                textStyle={{fontSize: 12}}
                thickness={6}
              />
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  summary: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    flex: 1,
    maxWidth: '50%',
  },
})

export default History