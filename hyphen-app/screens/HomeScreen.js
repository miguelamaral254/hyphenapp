import {
  Button,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { db, timestamp } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import generateId from "../lib/generateId";



const HomeScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);
 

  useLayoutEffect(() => {
    
    getDoc(doc(db, "users", user.uid)).then((snapShot) => {
      if (!snapShot.exists()) {
        navigation.navigate("Modal");
      }
    });
  }, []);

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      //comes after doing passes in swipeleft

      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapShot) => snapShot.docs.map((doc) => doc.id));

      console.log(passes);

      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapShot) => snapShot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["temp"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["temp"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapShot) => {
          setProfiles(
            snapShot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );

      //comes before doing passes in swipeleft

      // unsub = onSnapshot(collection(db, "users"), (snapShot) => {
      //   setProfiles(
      //     snapShot.docs
      //       .filter((doc) => doc.id !== user.uid)
      //       .map((doc) => ({
      //         id: doc.id,
      //         ...doc.data(),
      //       }))
      //   );
      // });
    };

    fetchCards();

    return unsub;
  }, []);

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) {
      return;
    }

    const userSwiped = profiles[cardIndex];
    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    // if (!profiles[cardIndex]) {
    //   return;
    // }

    // const userSwiped = profiles[cardIndex];

    // setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);

    try {
      if (!profiles[cardIndex]) {
        return;
      }

      const userSwiped = profiles[cardIndex];
      const loggedInProfile = await (
        await getDoc(doc(db, "users", user.uid))
      ).data();

      console.log("loggedInProfile", loggedInProfile);

      getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
        (docSnap) => {
          if (docSnap.exists()) {
            setDoc(
              doc(db, "users", user.uid, "swipes", userSwiped.id),
              userSwiped
            );
            setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
              users: {
                [user.uid]: loggedInProfile,
                [userSwiped.id]: userSwiped,
              },
              usersMatched: [user.uid, userSwiped.id],
              timestamp,
            });

            console.log(loggedInProfile, userSwiped);

            navigation.navigate("Match", {
              loggedInProfile,
              userSwiped,
            });
          } else {
            setDoc(
              doc(db, "users", user.uid, "swipes", userSwiped.id),
              userSwiped
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  
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
            cards={profiles}
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
          
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
