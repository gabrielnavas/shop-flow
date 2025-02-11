import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import { Button } from "./Button"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Product } from "@/src/services/entities"
import React from "react"
import { useTheme } from "@/src/hooks/useTheme"

type Props = {
  product: Product
}

export const ProductCard = ({ product }: Props) => {

  const [imageUrl, setImageUrl] = React.useState(product.imageUrl)

  const { theme } = useTheme()

  const handleImageError = () => {
    setImageUrl('');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.wrapped, {
        gap: theme.spacing.sm,
      }]}>
        <View style={styles.top}>
          <View style={styles.imageContainer}>
            <Image
              source={imageUrl ? { uri: imageUrl } : require('../../../assets/images/no-image.jpg')}
              style={styles.image}
              resizeMode="contain"
              onError={handleImageError}
            />
          </View>
        </View>
        <View style={styles.middle}>
          <Text style={[styles.productName, {
            fontSize: theme.fontSizes.medium,
          }]}>
            {product.name}
          </Text>
          <Text style={[styles.productDescription, {
            fontSize: theme.fontSizes.small
          }]}>
            {product.description}
          </Text>
        </View>
        <View style={{
          gap: theme.spacing.sm,
        }}>
          <Text style={[styles.productPrice, {
            fontSize: theme.fontSizes.extraLarge
          }]}>
            {product.price}
          </Text>
          <View style={styles.buttonContainer}>
            <Button icon={
              <MaterialCommunityIcons
                size={theme.fontSizes.extraLarge}
                name="cart-plus"
                color={theme.colors.icon} />
            } />
          </View>
        </View>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  wrapped: {
    width: Dimensions.get('screen').width * .80,
  },
  top: {},
  imageContainer: {
    height: 275, // Defina um tamanho para a imagem
  },
  image: {
    width: "100%",
    height: "100%",
  },
  middle: {},
  productName: {
    fontWeight: '500'
  },
  productDescription: {
    fontWeight: '400'
  },
  bottom: {
  },
  productPrice: {
    fontWeight: 'bold',
  },
  buttonContainer: {},
})