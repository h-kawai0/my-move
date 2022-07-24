import { useContext } from 'react';
import { FlashMessageContext, FlashMessageContextType } from '../providers/FlashMessageProvider';

export const useFlashMessage = (): FlashMessageContextType => useContext(FlashMessageContext);