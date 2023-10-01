import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";

const MatchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { loggedInProfile, userSwiped } = route.params;
  return (
    <View style={tw.style("h-full bg-gray-900 pt-20", { opacity: 0.89 })}>
      <View style={tw.style("justify-center px-10 pt-20")}>
        <Image
          source={{
            uri: "https://e9digital.com/love-at-first-website/images/its-a-match.png",
          }}
          style={tw.style("h-20 w-full")}
        />
        <Text style={tw.style("text-white text-center mt-5")}>
          You && {userSwiped.displayName} return 0.
        </Text>

        <View style={tw.style("flex-row justify-evenly mt-5")}>
          <Image
            style={tw.style("h-32 w-32 rounded-full")}
            source={{
              uri: loggedInProfile.photoURL,
            }}
          />
          <Image
            style={tw.style("h-32 w-32 rounded-full")}
            source={{
              uri: userSwiped.photoURL,
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={tw.style("p-3 mx-10 border border-green-700 rounded-lg mt-20")}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text style={tw.style("text-center text-gray-200")}>Enviar mensagem</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style("p-3 mx-10 border border-green-700 rounded-lg mt-5")}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Home");
        }}
      >
        <Text style={tw.style("text-center text-gray-200")}>Continue deslizando</Text>
      </TouchableOpacity>
      <TouchableOpacity>
      <Text style={tw.style("mt-5 text-center text-gray-200 font-bold")}>Compartilhe no LinkedIn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;