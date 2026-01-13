import { View, Text, TouchableOpacity } from 'react-native';

export default function StarRating({ rating, onRate }: any) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1,2,3,4,5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onRate(star)}>
          <Text style={{ fontSize: 22 }}>
            {star <= rating ? '⭐' : '☆'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
