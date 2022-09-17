import { FlatList, Image, View } from 'react-native';

import logo from '../../assets/logo-nlw-esports.png';
import { GameCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { GAMES } from '../../utils/games';

import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Heading
        title="Find your duo!"
        subtitle="Select the game that you want to play..."
      />

      <FlatList
        data={GAMES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        contentContainerStyle={styles.contentList}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
}
