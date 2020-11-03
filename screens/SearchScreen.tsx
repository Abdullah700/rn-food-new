import React, { FC, useState } from "react";
import { ScrollView, StyleSheet, Text, View} from "react-native";

import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";
import { IBusiness } from "../types/IBusiness";
import {SafeAreaView} from "react-native-safe-area-context";
import {createStackNavigator} from "@react-navigation/stack";
import {RootStackParamList} from "../types/types";

const SearchScreen: FC = () => {
  const [term, setTerm] = useState<string>("");
  const [{ searchApi }, { results }, { errMsg }] = useResults();
    const Stack = createStackNavigator<RootStackParamList>();
  const filterResultsByPrice = (price: string): IBusiness[] => {
    return results.filter((result) => {
      return result.price === price;
    });
  };
  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {!!errMsg && <Text style={{ color: "red" }}>{errMsg}</Text>}
      <ScrollView>
        <ResultsList
          results={filterResultsByPrice("$")}
          title={"Cost Effective"}
        />
        <ResultsList
          results={filterResultsByPrice("$$")}
          title={"Bit Pricer"}
        />
        <ResultsList
          results={filterResultsByPrice("$$$")}
          title={"Big Spender"}
        />
      </ScrollView>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
