import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { View, Text, TouchableOpacity } from "react-native";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import { Image } from "react-native";

const ChatRow = ({matchDetails}) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  
  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, []);
  console.log(matchedUserInfo);
  return (
    <TouchableOpacity style={tw.style("flex-row items-center p-3 px-5 bg-white mx-3 my-1 rounded-lg shadow-lg")}
    onPress={()=>navigation.navigate("Message",{matchDetails})}>
        <Image
        style={tw.style("rounded-full h-16 w-16 mr-4")}
        source={{uri:matchedUserInfo?.photoURL}}
        />
    </TouchableOpacity>
  );
};

export default ChatRow;
