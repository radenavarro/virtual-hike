import { CustomTheme } from '@/app/types';
import { useTheme as useNavigationTheme } from '@react-navigation/native';


export function useTheme(): CustomTheme {
  return useNavigationTheme() as CustomTheme;
}
