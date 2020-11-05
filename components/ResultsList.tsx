import { Feather } from "@expo/vector-icons";
import React, { FC } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IBusiness } from "../types/IBusiness";
import ResultsDetail from "./ResultsDetail";
import {useNavigation} from "@react-navigation/native"

interface IProp {
  title: string;
  results: IBusiness[];
}

const ResultsList: FC<IProp> = ({ title, results,}) => {
  const navigation = useNavigation()

  if (!results.length){
    return null
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}> {title} </Text>
      <FlatList
        horizontal
        data={results}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("ResultsShow",{id:item.id})}
            >
              <ResultsDetail result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ResultsList;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  container: {
    marginBottom: 10,
  },
});
