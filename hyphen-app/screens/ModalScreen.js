import { View, Text, Image, ImageBackground} from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
  const {user} = useAuth();
  return (
    <ImageBackground
      style={tw.style("flex-1 bg-black")}
      resizeMode="cover"
      source={require("../assets/bg.jpg")}
    >
      <View style={tw.style("flex-1 items-center pt-1 text-white")}>
        <Image
        resizeMode='contain'
        style={tw.style("h-20 w-full")}
        source={require("../assets/hy2-text.png")}
        />
        <Text style={tw.style("text-white")} >Welcome {user.displayName} </Text>
        
      </View>
    </ImageBackground>
  )
}

export default ModalScreen