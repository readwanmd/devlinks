import { useContext } from 'react';
import PreviewContext from '../context/PreviewContext';

const usePreview = () => {
	return useContext(PreviewContext);
};
export default usePreview;
