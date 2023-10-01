import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import {Foundation, Ionicons} from "@expo/vector-icons"
const Header = ({title, callEnabled}) => {
    const navigation = useNavigation();
    return(
    
    <View style={tw.style("p-2 flex-row items-center justify-between")}>
        <View style={tw.style("flex flex-row items-center")}>
        <TouchableOpacity style={tw.style("flex ")}>
            <Ionicons 
            name="chevron-back-outline"
            size={34}
            color="#00FF19" />

        </TouchableOpacity>
        <Text style={tw.style("text-2xl font-bold pl-2")}>{title} </Text>
        </View>
        {callEnabled && (
            <TouchableOpacity>
                <Foundation name="telephone" size={20} color="#00FF19"/>
            </TouchableOpacity>
        )}
    </View>
    
    
    )

        
}
export default Header;