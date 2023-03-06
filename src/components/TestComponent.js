import getDataFromFirebase from "../api/firestoreController";
import { useState, useEffect } from "react";
import { Text } from "react-native";

const TestComponent = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getDataFromFirebase().then((res) => {
      setData(res);
    });
  }, []);

  //const sarasa = await getDataFromFirebase();

  return data.map((item) => {
    return <Text key={item.id}>{item.name}</Text>;
  });
};

export default TestComponent;
