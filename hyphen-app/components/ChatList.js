import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import tw from "tailwind-react-native-classnames";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "matches"),
        where("usersMatched", "array-contains", user.uid)
      ),
      (snapShot) =>
        setMatches(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
    return unsubscribe;
  }, [user]);
  return matches.length > 0 ? (
    <FlatList
      style={tw.style("h-full")}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View style={tw.style("p-5")}>
      <Text style={tw.style("text-center text-lg")}>
        Sem conversas no momento...
      </Text>
    </View>
  );
};

export default ChatList;
