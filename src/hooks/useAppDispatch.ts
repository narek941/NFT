import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/storage/configureStore';

export const useAppDispatch = () => useDispatch<AppDispatch>();
