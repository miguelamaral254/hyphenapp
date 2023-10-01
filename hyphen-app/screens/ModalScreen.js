import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import useAuth from "../hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { db, timestamp } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");

  const incompleteForm = !image || !name || !age || !job;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job,
      displayName,
      age,
      timestamp,
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("Error", err.message);
      });
  };

  return (
    <View style={tw.style("flex-1 items-center pt-1")}>
      <Image
        style={tw.style("h-20 w-full")}
        resizeMode="contain"
        source={require("../assets/hy2-text.png")}
      />
      <Text style={tw.style("text-xl text-gray-500 p-2 font-bold")}>
        Bem vindo {user.displayName} !
      </Text>

      <Text style={tw.style("text-center p-4 font-bold text-green-500")}>
        Passo 1: Foto de perfil
      </Text>

      <TextInput
        placeholder="Escreva/cole a url da imagem"
        style={tw.style("text-center text-xl pb-2")}
        keyboardType="url"
        value={image}
        onChangeText={setImage}
      />
      <Text style={tw.style("text-center p-4 font-bold text-green-500")}>
        Passo 2: Seu nome para o perfil
      </Text>

      <TextInput
        placeholder="Escreva seu nome"
        style={tw.style("text-center text-xl pb-2")}
        keyboardType="url"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <Text style={tw.style("text-center p-4 font-bold text-green-500")}>
        Passo 3: Sua profissão
      </Text>

      <TextInput
        placeholder="Escreva sua profissão"
        style={tw.style("text-center text-xl pb-2")}
        onChangeText={setJob}
        value={job}
      />
      <Text style={tw.style("text-center p-4 font-bold text-green-500")}>
        Passo 4: Sua idade
      </Text>

      <TextInput
        placeholder="Escreva sua idade"
        style={tw.style("text-center text-xl pb-2")}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        maxLength={2}
      />

      <TouchableOpacity
        disabled={incompleteForm}
        style={tw.style(
          "w-64 p-3 rounded-xl absolute bottom-10 bg-green-400",
          incompleteForm && "bg-gray-400"
        )}
        onPress={updateUserProfile}
      >
        <Text style={tw.style("text-center text-white text-xl")}>
          Atualizar perfil 
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;