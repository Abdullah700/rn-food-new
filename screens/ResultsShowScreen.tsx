import React, {FC, useEffect, useState} from "react";
import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import yelp from "../api/yelp";
import {IBusiness} from "../types/IBusiness";


const ResultsShowScreen:FC = ()=> {
    const {id} = useRoute().params as {id:string}
    const [result, setResult] = useState<IBusiness>();

    const getResult = async (id:string)=>{
      const {data} =  await yelp.get(`/${id}`)
        setResult(data)
    }

    useEffect(() => {
        getResult(id)
    }, []);

    if (!result){
        return null
    }

    return (
       <View>
           <Text>{result.name}</Text>
           <FlatList data={result.photos} keyExtractor={(photo=> photo)} renderItem={({item}) =>{
               return <Image style={styles.image} source={{uri:item}} />
           }}/>
       </View>
    )
}


const styles = StyleSheet.create({
    image:{
        height:200,
        width:300
    }
})



export default ResultsShowScreen;
