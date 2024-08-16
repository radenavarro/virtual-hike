import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { CustomTheme } from '@/app/types';
import { useTheme } from '@/hooks/useTheme';

// export type ThemedViewLegacyProps = ViewProps & {
//   lightColor?: string;
//   darkColor?: string;
// };

// export function ThemedViewLegacy({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
//   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

//   return <View style={[{ backgroundColor }, style]} {...otherProps} />;
// }

export type ThemedViewProps = ViewProps & {theme?: CustomTheme};

export function ThemedView({ style, theme, ...otherProps }: ThemedViewProps) {
  const _theme = theme ? theme : useTheme();
  const themedStyle = StyleSheet.create({
    container: {
      backgroundColor: _theme.colors.background,
      color: _theme.colors.text
    }
  })

  return <View style={[themedStyle?.container, style]} {...otherProps} />;
}