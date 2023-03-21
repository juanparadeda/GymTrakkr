import { Text } from "@rneui/base";

const Exercise = ({ route }) => {
  console.log(JSON.stringify(route.params, null, 2));
  return <Text>{route.params.exercise.name}</Text>;
};

export default Exercise;
