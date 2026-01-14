import { View, Text } from 'react-native';
import StarRating from '../components/StarRating';
import { rateNote } from '../services/api';

export default function NoteDetailsScreen({ route }: any) {
  const { note } = route.params;

  const rate = async (value: number) => {
    await rateNote(note._id, value);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>{note.title}</Text>
      <Text>{note.professor}</Text>
      <Text>{note.content}</Text>

      <StarRating rating={note.rating} onRate={rate} />
    </View>
  );
}
