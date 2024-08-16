import { Text, type TextProps, StyleSheet } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { CustomTheme } from '@/app/types';

export type ThemedTextProps = TextProps & {
  theme?: CustomTheme;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  theme,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  // const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const _theme = theme ? theme : useTheme();
  const themedText = StyleSheet.create({
    textStyle: {
      color: _theme.colors.text
    },
    textLinkStyle: {
      color: _theme.colors.tint
    }
  })
  return (
    <Text
      style={[
        themedText?.textStyle,
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? [styles.link, themedText.textLinkStyle] : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
