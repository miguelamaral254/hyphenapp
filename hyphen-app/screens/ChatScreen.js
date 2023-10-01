import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Header from "../components/Header";
import tw from "tailwind-react-native-classnames";
import ChatList from "../components/ChatList";

const ChatScreen = () => {
  return (
    <SafeAreaView style={tw.style("pt-5")}>
      <Header title="Conversas" />
      <ChatList/>
    </SafeAreaView>
  );
};

export default ChatScreen;
