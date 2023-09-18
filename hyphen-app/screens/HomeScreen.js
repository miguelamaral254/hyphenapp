import React, { useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import useAuth from "../hooks/useAuth";
import { Entypo, Ionicons } from "@expo/vector-icons/";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-deck-swiper";
import { ImageBackground } from "react-native";
const DUMMY_DATA = [
  {
    displayName: "Miguel Augusto",
    project: "HYPHEN",
    projDisc:"APP para devs se inserirem em projetos",
    job: "Software Engineer",
    photoURL:
      "https://instagram.frec17-1.fna.fbcdn.net/v/t51.2885-19/331815343_570029035178473_203142887568872698_n.jpg?stp=dst-jpg_s150x150&cb=efdfa7ed-2feb43a7&efg=eyJxZV9ncm91cHMiOiJbXCJpZ19ianBnX3Byb2ZpbGVfcGljXzA3MDVfd2VicF9jb250cm9sLU5vbmVcIl0ifQ&_nc_ht=instagram.frec17-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=dAvBFURp98kAX8zXpnp&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfCySj4Nd7ziRh2JRSfvCDkx6NSrRTURc0UlRmTAyVddbg&oe=650C4D95&_nc_sid=ee9879",
    age: 25,
    id: 1,
  },
  {
    displayName: "Mark Zuckerberg",
    job: "Programmer",
    photoURL:
      "https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
    age: 39,
    id: 2,
  },
  {
    displayName: "Justin Mateen",
    job: "Software Developer",
    photoURL:
      "https://i.insider.com/606730e3856cd700198a2dd1?width=1136&format=jpeg",
    age: 37,
    id: 3,
  },
];
const HomeScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const swipeRef = useRef();
  return (
    <ImageBackground
      style={tw.style("flex-1 bg-black")}
      resizeMode="cover"
      source={require("../assets/bg.jpg")}
    >
      <SafeAreaView style={tw.style("flex-1 mt-6")}>
        <View style={tw.style("flex-row items-center justify-between px-5")}>
          <TouchableOpacity onPress={logout}>
            <Image
              style={tw.style("h-10 w-10 rounded-full")}
              source={{
                uri: "https://img.freepik.com/free-icon/user_318-159711.jpg",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
            <Image
              source={require("../assets/logoh.png")}
              style={tw.style("h-14 w-14")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <Ionicons name="chatbubbles-sharp" size={30} color="#00FF19" />
          </TouchableOpacity>
        </View>
        <View style={tw.style("flex-1 -mt-6")}>
          <Swiper
            ref={swipeRef}
            containerStyle={{
              backgroundColor: "transparent",
            }}
            cards={DUMMY_DATA}
            stackSize={5}
            cardIndex={0}
            animateCardOpacity
            verticalSwipe={false}
            renderCard={(card) => {
              return card ? (
                <View
                  key={card.id}
                  style={tw.style("bg-white h-3/4 rounded-xl relative")}
                >
                  <Image
                    style={tw.style("absolute top-0 h-full w-full bg-black rounded-xl")}
                  />
                 <Text style={tw.style("text-2xl text-white font-bold")}>
                      {card.age}
                    </Text>
                  <View
                    style={tw.style(
                      "absolute bottom-0 bg-blue-400 w-full justify-between items-center flex-row px-6 py-2 rounded-b-xl shadow-xl"
                    )}
                  >
                    <View>
                      <Image
                        style={tw.style("h-10 w-10 rounded-full")}
                        source={{ uri: card.photoURL }}
                      />
                      <Text style={tw.style("text-xl font-bold")}>
                        {card.displayName}
                      </Text>
                      <Text>{card.job}</Text>
                    </View>
                    <Text style={tw.style("text-2xl font-bold")}>
                      {card.age}
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={tw.style(
                    "relative bg-white h-3/4 rounded-xl justify-center items-center shadow-xl"
                  )}
                >
                  <Text style={tw.style("font-bold pb-5")}>
                    {" "}
                    no more prorojects to see
                  </Text>
                  <Image
                    style={tw.style("h-20 w-20")}
                    source={{
                      uri: "https://cdn.shopify.com/s/files/1/1061/1924/products/Crying_Face_Emoji_large.png?v=1571606037",
                    }}
                  />
                </View>
              );
            }}
          />
        </View>

        <View style={tw.style("flex flex-row justify-evenly")}>
          <TouchableOpacity
            onPress={() => swipeRef.current.swipeLeft()}
            style={tw.style(
              "items-center justify-center rounded-full w-16 h-16 bg-red-200"
            )}
          >
            <Entypo name="cross" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => swipeRef.current.swipeRight()}
            style={tw.style(
              "items-center justify-center rounded-full w-16 h-16 bg-green-200"
            )}
          >
            <Entypo name="heart" size={24} color="green" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
