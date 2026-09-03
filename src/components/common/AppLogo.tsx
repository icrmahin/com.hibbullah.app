import { Image } from "expo-image";
import { StyleSheet, type ImageStyle, type StyleProp } from "react-native";

const logo = require("@/assets/images/logo/hibbullah-logo.png");

export default function AppLogo({ size = 88, style }: { size?: number; style?: StyleProp<ImageStyle> }) {
  return (
    <Image
      source={logo}
      style={[{ width: size, height: size }, style]}
      contentFit="contain"
      priority="high"
    />
  );
}
