import {showMessage} from 'react-native-flash-message';
import {colors} from '../colors';

export const showError = (message: string, description?: string) => {
  showMessage({
    message: message,
    description: description,
    type: 'default',
    backgroundColor: colors.error,
  });
};

export const showSuccess = (message: string, description?: string) => {
  showMessage({
    message: message,
    description: description,
    type: 'default',
    backgroundColor: colors.primary,
    color: colors.white,
  });
};
