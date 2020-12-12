import {useState} from 'react';

export default function useLightMode(){
    const [lightMode,setLightMode] = useState(false);
    const toggleMode = () => {
        setLightMode(!lightMode);
    }
    return [lightMode, toggleMode];
}