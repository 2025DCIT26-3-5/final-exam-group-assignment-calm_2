import { View, TouchableOpacity, Text } from "react-native";

type Props = {
  rating: number;
  setRating: (rating: number) => void;
};

export default function StarRating({ rating, setRating }: Props) {
  return (
    <View style={{ flexDirection: "row", marginVertical: 10 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => setRating(star)}>
          <Text
            style={{ fontSize: 30, color: star <= rating ? "gold" : "gray" }}
          >
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
