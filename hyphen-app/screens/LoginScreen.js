import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";

const LoginScreen = () => {
  const [type, setType] = useState(1); //1.signin 2.signup

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, setLoading } = useAuth();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const signIn = () => {
    if (email.trim() === "" || password.trim === "") {
      return Alert.alert("Ohhh!!", "You have not entered all details");
    }
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const signUp = () => {
    if (name.trim() === "" || email.trim() === "" || password.trim === "") {
      return Alert.alert("Ohhh!!", "You have not entered all details");
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName: name });
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={tw.style("flex justify-end items-center")}>
        <ImageBackground style={tw.style("w-full h-full")} source={require("../assets/navista.jpg")}>
        <View style={tw.style("flex-1 items-center justify-center")}>
        <Image 
        resizeMode="contain"
        style={tw.style("h-1/3 w-full")} source={require("../assets/hy2.png")} />
        </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <ImageBackground
      style={tw.style("flex-1 bg-black")}
      
    >
      {type === 1 ? (
        <View style={tw.style("flex-1 justify-center items-center")}>
          <Image
            resizeMode="contain"
            style={tw.style("h-1/4 w-full")}
            source={require("../assets/hy2.png")}
          />

          <Text style={tw.style("text-gray-500 p-5 font-semibold")}>
            O melhor lugar do mundo para{"\n"}encontrar parceiros de trabalho
          </Text>
          <View style={tw.style("w-full p-5")}>
            <Text style={tw.style("font-semibold pb-2 text-gray-500")}>Email</Text>
            <TextInput
              keyboardType="email-address"
              style={tw.style(
                "border border-gray-400 text-sm text-gray-300 rounded-lg w-full p-2.5 mb-4"
              )}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={tw.style("font-semibold pb-2 text-gray-500")}>Senha</Text>
            <TextInput
              keyboardType="default"
              secureTextEntry={true}
              style={tw.style(
                "border border-gray-400 text-sm text-gray-300 rounded-lg w-full p-2.5 mb-4"
              )}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={tw.style("flex pr-3 items-end")}>
              <Text style={tw.style("text-green-400")}>
                Recuperar senha
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style("w-full rounded-lg mt-8 bg-green-100 py-3")}
              onPress={signIn}
            >
              <Text style={tw.style("text-center text-white font-bold")}>
                Entrar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={tw.style("w-full border border-green-700 rounded-lg mt-2 py-3")} 
            onPress={() => setType(2)}>
              <Text style={tw.style("text-center text-green-100 ")}>
                Crie sua conta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={tw.style("flex-1 justify-center items-center")}>
          <Image
            resizeMode="contain"
            style={tw.style("h-1/5 w-full")}
            source={require("../assets/hy2.png")}
          />
          <Text style={tw.style("text-white p-5")}>Crie uma nova conta</Text>
          <View style={tw.style("w-full p-5")}>
            <Text style={tw.style("font-semibold pb-2 text-white")}>
              Nome completo
            </Text>
            <TextInput
              keyboardType="default"
              style={tw.style(
                "border border-gray-300 text-sm text-gray-300 rounded-lg w-full p-2.5 mb-4"
              )}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Text style={tw.style("font-semibold pb-2 text-white")}>Email</Text>
            <TextInput
              keyboardType="email-address"
              style={tw.style(
                "border border-gray-300 text-sm text-gray-300 rounded-lg w-full p-2.5 mb-4"
              )}
              value={email}
              onChangeText={(text) => setEmail(text)}
              secureTextEntry={false}
            />
            <Text style={tw.style("font-semibold pb-2 text-white")}>Senha</Text>
            <TextInput
              secureTextEntry={true}
              style={tw.style(
                "border border-gray-300 text-sm text-gray-300 rounded-lg w-full p-2.5 mb-4"
              )}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={tw.style("w-full rounded-lg mt-8 bg-green-600 py-3")}
              onPress={signUp}
            >
              <Text style={tw.style("text-center text-white font-bold")}>
                Cria conta
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType(1)}>
              <Text style={tw.style("text-center text-gray-100 pt-3")}>
                Já possui uma conta?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

export default LoginScreen;
