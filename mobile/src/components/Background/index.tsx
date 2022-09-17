import { ImageBackground } from 'react-native';

import backgroundGalaxy from '../../assets/background-galaxy.png';

import { styles } from './styles';

interface Props {
  children: React.ReactNode;
}

export function Background({ children }: Props) {
  return (
    <ImageBackground
      source={backgroundGalaxy}
      defaultSource={backgroundGalaxy}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}
