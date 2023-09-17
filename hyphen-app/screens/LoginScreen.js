import { View, Text, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from "tailwind-react-native-classnames"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@firebase/auth'
import { auth } from '../firebase'
import useAuth from "../hooks/useAuth"

const LoginScreen = () => {
  const [type, setType] = useState(2) //1. signIn or 2.signUp
  const {loading, setLoading} = useAuth()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=> {
    setName("");
    setEmail("");
    setPassword("");
  },[type]);

  const signIn = () => {
    if (email.trim() === "" || password.trim === "") {
      return Alert.alert("Ohhh!!", "You have not entered all details");
    }
    setLoading(true)

    signInWithEmailAndPassword(auth, email, password)
      .then(({user})=>{
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        
      });
  };
  const signUp = () => {
    if (name.trim() === "" || email.trim() === "" || password.trim === "") {
      return Alert.alert("Ohhh!!", "You have not entered all details");
    }
    createUserWithEmailAndPassword(auth, email, password).then(({user})=>{
      updateProfile(user, {displayName:name});
      console.log(user)

    })
    .catch((err)=> {
      console.log(err);
    })
    
  }
  if(loading) {
    return (
      <View style={tw.style("flex-1 justify-center items-center")}>
        <Text style={tw.style("font-semibold text-red-400 text-2xl")}>Loading...</Text>
      </View>
    )
  }
  return (
    <ImageBackground
      style={tw.style("flex-1 bg-black")}
      resizeMode="cover"
      
    >
      
      {type === 1 ? (
        <View style={tw.style("flex-1 justify-center items-center")}>
          <Text style={tw.style("font-bold text-2xl text-green-700")}>Sign In</Text>
          <Text style={tw.style("text-white font-semibold")}>
            Access to your account
          </Text>
          <View style={tw.style("w-full p-5")}>
            <Text style={tw.style("font-semibold pb-2 text-white")}>Email</Text>
            <TextInput
              keyboardType="email-address"
              style={tw.style(
                "bg-black border border-gray-300 text-sm text-gray-300 rounded-lg w-full p-2.5 mb-4"
              )}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={tw.style("font-semibold pb-2 text-white")}>
              Password
            </Text>
            <TextInput
              keyboardType="default"
              secureTextEntry={true}
              style={tw.style(
                "bg-black border border-gray-300 text-sm text-gray-300 rounded-lg w-full p-2.5 mb-4"
              )}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={tw.style("w-full rounded-lg mt-8 bg-green-600 py-3")}
              onPress={signIn}
            >
              <Text style={tw.style("text-center text-white font-bold")}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType(2)}>
              <Text style={tw.style("text-center text-gray-100 pt-3")}>
                Doesn't have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : 
      // sign up
      (
        <View style={tw.style("flex-1 justify-center items-center")}>
          <Text style={tw.style("font-bold text-2xl")}>Sign Up</Text>
          <Text style={tw.style("text-white")}>Create a new account</Text>
          <View style={tw.style("w-full p-5")}>
            <Text style={tw.style("font-semibold pb-2 text-gray-300")}>Name</Text>
            <TextInput
            style={tw.style("bg-black border border-gray-300 text-sm text-gray-300 rounded-lg w-full p-2.5 mb-4")}
            value={name}
            onChangeText={(text)=> setName(text)}/>
            <Text style={tw.style("font-semibold pb-2 text-white")}>Email</Text>
            <TextInput
            keyboardType="email-address" 
            style={tw.style("bg-black border border-gray-300 text-sm text-gray-300 rounded-lg w-full p-2.5 mb-4")}
            value={email}
            onChangeText={(text) => setEmail(text)}/>
            <Text style={tw.style("font-semibold pb-2 text-white")}>Password</Text>
            <TextInput
              
              secureTextEntry={true}
              style={tw.style(
                "bg-black border border-gray-300 text-sm text-gray-300 rounded-lg w-full p-2.5 mb-4"
              )}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={tw.style("w-full rounded-lg mt-8 bg-black py-3")}
              onPress={signUp}
            >
              <Text style={tw.style("text-center text-white font-bold")}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setType(1)}> 
              <Text style={tw.style("text-center text-gray-100 pt-3")}>Already have an account?</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }  

    </ImageBackground>
  )
}

export default LoginScreen