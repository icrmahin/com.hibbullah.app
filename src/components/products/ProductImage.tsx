import { Image } from "expo-image";
import { memo } from "react";
import { StyleSheet, type ImageStyle, type StyleProp } from "react-native";
import colors from "../../constants/colors";

const placeholder = require("@/assets/images/placeholders/product-placeholder.png");

type ProductImageProps = {
  uri?: string | null;
  recyclingKey?: string;
  style?: StyleProp<ImageStyle>;
};

function ProductImage({ uri, recyclingKey, style }: ProductImageProps) {
  return (
    <Image
      source={uri ? { uri } : placeholder}
      placeholder={placeholder}
      recyclingKey={recyclingKey}
      contentFit="cover"
      transition={recyclingKey ? 0 : 180}
      style={[styles.image, style]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 140,
    backgroundColor: colors.background,
  },
});

export default memo(ProductImage);
