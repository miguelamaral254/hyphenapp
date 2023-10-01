import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import tw from 'tailwind-react-native-classnames'

const ChatScreen = () => {
  return (
    <SafeAreaView style={tw.style("pt-5")}>
      <Text>
        <Header title="Conversas"/>
      </Text>
    </SafeAreaView>
  )
}

export default ChatScreen