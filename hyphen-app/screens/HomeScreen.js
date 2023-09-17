import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image} from "react-native";
import tw from "tailwind-react-native-classnames";
import useAuth from "../hooks/useAuth"
const HomeScreen = () => {
  const {user , logout} = useAuth()
  return (
    <SafeAreaView style={tw.style("flex-1 mt-6")}>
      <View>
        <TouchableOpacity onPress={logout}>
          <Image
            style={tw.style("h-10 w-10 rounded-full")}
            source={{
              uri: "https://img.freepik.com/free-icon/user_318-159711.jpg",
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
