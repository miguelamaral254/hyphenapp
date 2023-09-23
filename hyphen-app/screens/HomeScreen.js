import React, { useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import tw from "tailwind-react-native-classnames";
import useAuth from "../hooks/useAuth";
import { Entypo, Ionicons } from "@expo/vector-icons/";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-deck-swiper";
const DUMMY_DATA = [
  {
    displayName: "Miguel Augusto",
    project: "HYPHEN",
    projDisc:
      "App mobile desenvolvido em react native, com prótitpo de alta fidelidade feito no Figma.",
    job: "Software Engineer",
    photoURL:
      "https://instagram.frec17-1.fna.fbcdn.net/v/t51.2885-19/331815343_570029035178473_203142887568872698_n.jpg?stp=dst-jpg_s150x150&cb=efdfa7ed-2feb43a7&efg=eyJxZV9ncm91cHMiOiJbXCJpZ19ianBnX3Byb2ZpbGVfcGljXzA3MDVfd2VicF9jb250cm9sLU5vbmVcIl0ifQ&_nc_ht=instagram.frec17-1.fna.fbcdn.net&_nc_cat=101&_https://instagram.frec17-1.fna.fbcdn.net/v/t51.2885-19/331815343_570029035178473_203142887568872698_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.frec17-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=zAjzNMsZJ_UAX8ENpkB&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfBZrWR_946RBwozkz43u4YlP3ASixZhGa6-Dl4iT8S80g&oe=65143695&_nc_sid=ee9879nc_ohc=dAvBFURp98kAX8zXpnp&edm=ACWDqb8BAAAA&ccb=7-5&oh=00_AfCySj4Nd7ziRh2JRSfvCDkx6NSrRTURc0UlRmTAyVddbg&oe=650C4D95&_nc_sid=ee9879",
    age: 25,
    id: 1,
  },
  {
    displayName: "Mark Zuckerberg",
    project: "Facebook",
    projDisc: "Rede social",
    job: "Programmer",
    photoURL:
      "https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
    age: 39,
    id: 2,
  },
  {
    displayName: "Justin Mateen",
    project: "Tinder",
    projDisc: "App de relacionamentos",
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
      source={require("../assets/navista.jpg")}
    >
      <SafeAreaView style={tw.style("flex-1 mt-6")}>
        <View style={tw.style("flex-row items-center justify-between px-5")}>
          <TouchableOpacity onPress={logout}>
            <Image
              resizeMode="contain"
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
            stackSize={1}
            cardIndex={0}
            animateCardOpacity
            verticalSwipe={false}
            onSwipedLeft={(cardIndex) => {
              console.log("Swipe Pass");
              swipeLeft(cardIndex);
            }}
            onSwipedRight={(cardIndex) => {
              console.log("Swipe Match");
              swipeRight(cardIndex);
            }}
            backgroundColor="#4FD0E9"
            overlayLabels={{
              left: {
                title: "NOPE",
                style: {
                  label: {
                    textAlign: "right",
                    color: "red",
                  },
                },
              },
              right: {
                title: "MATCH",
                style: {
                  label: {
                    color: "#4DED30",
                  },
                },
              },
            }}
            renderCard={(card) => {
              return card ? (
                <View
                  key={card.id}
                  style={tw.style(
                    "flex items-center bg-white h-3/4 rounded-xl relative bg-blue-400 border border-2 border-white"
                  )}
                >
                  
                  <Text style={tw.style("text-2xl text-white pt-10 font-bold")}>
                    {card.project}
                  </Text>
                  <Text style={tw.style("text-2xl text-white font-bold")}>
                    ____________________
                  </Text>
                  <Text style={tw.style("text-white py-2 px-10")}>
                    {card.projDisc}
                  </Text>
                  <View style={tw.style("text-white pt-16 justify-end")}>
                    <Text>Vagas</Text>
                  </View>

                  <View
                    style={tw.style(
                      "absolute bottom-0 bg-white w-full justify-between items-center flex-row px-6 py-2 rounded-b-xl shadow-xl"
                    )}
                  >
                    <View
                      style={tw.style("flex-row justify-center items-center")}
                    >
                      <Image
                        resizeMode="contain"
                        style={tw.style("h-10 w-10 rounded-full")}
                        source={{ uri: card.photoURL }}
                      />
                      <View style={tw.style("p-2")}>
                        <Text style={tw.style("text-xl font-bold")}>
                          {card.displayName}
                        </Text>
                        <Text>{card.job}</Text>
                      </View>
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
                    Sem projetos disponíveis para ver
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
            style={tw.style(
              "items-center justify-center rounded-full w-16 h-16 bg-white"
            )}
          >
            <Entypo name="cw" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => swipeRef.current.swipeLeft()}
            style={tw.style(
              "items-center justify-center rounded-full w-16 h-16 bg-white shadow-2xl"
            )}
          >
            <Entypo name="cross" size={40} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => swipeRef.current.swipeRight()}
            style={tw.style(
              "items-center justify-center rounded-full w-16 h-16 bg-white shadow-2xl"
            )}
          >
            <Entypo name="heart" size={40} color="green" />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw.style(
              "items-center justify-center rounded-full w-16 h-16 bg-white shadow-2xl"
            )}
          >
            <Entypo name="user" size={40} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
