import { View, Text, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from "tailwind-react-native-classnames"

const LoginScreen = () => {
  const [type, setType] = useState(2) //1. signIn or 2.signUp
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const signIn = () => {
    console.log(email, password)
  }
  return (
    <ImageBackground 
    style={tw.style("flex-1")}
    resizeMode="cover"
    source={require("../assets/bg.png")}
    >
    {
      type === 1 ? (
        <View style={tw.style("flex-1 justify-center items-center")}>
          <Text style={tw.style("font-bold text-2xl")}>Sign In</Text>
          <Text style={tw.style("text-white")}>Access to your account</Text>
          <View style={tw.style("w-full p-5")}>
          <Text style={tw.style("font-semibold pb-2 text-white")}>Email</Text>
            <TextInput
            keyboardType="email-address" 
            style={tw.style("bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4")}
            value={email}
            onChangeText={(text) => setEmail(text)}
            />
            <Text style={tw.style("font-semibold pb-2 text-white")}>Password</Text>
            <TextInput
            secureTextEntry={true}
            style={tw.style("bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4")}
            value={password}
            onChangeText={(text) => setPassword(text)}
            />
            
            <TouchableOpacity style={tw.style("w-full rounded-lg mt-8 bg-black py-3")}
            onPress={signIn}>
              <Text style={tw.style("text-center text-white font-bold")}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setType(2)}>
              <Text style={tw.style("text-center text-gray-100 pt-3")}>Doesn't have an account?</Text>
            </TouchableOpacity> 

          </View>
        </View>

      ) : (
        <View style={tw.style("flex-1 justify-center items-center")}>
          <Text style={tw.style("font-bold text-2xl")}>Sign Up</Text>
          <Text style={tw.style("text-white")}>Create a new account</Text>
          <View style={tw.style("w-full p-5")}>
            <Text style={tw.style("font-semibold pb-2 text-white")}>Name</Text>
            <TextInput
            style={tw.style("bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4")}/>
            <Text style={tw.style("font-semibold pb-2 text-white")}>Email</Text>
            <TextInput
            keyboardType="email-address" 
            style={tw.style("bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4")}/>
            <Text style={tw.style("font-semibold pb-2 text-white")}>Password</Text>
            <TextInput
            secureTextEntry={true}
            style={tw.style("bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg w-full p-2.5 mb-4")}/>
            <TouchableOpacity style={tw.style("w-full rounded-lg mt-8 bg-black py-3")}>
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