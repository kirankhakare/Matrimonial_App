import { FlatList } from "react-native";
import BiodataCard from "./BiodataCard";

type Biodata = {
  id: number;
  name: string;
  age: number;
  city: string;
  profession: string;
};

type Props = {
  data: Biodata[];
};

export default function BiodataList({ data }: Props) {

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <BiodataCard data={item} />}
      showsVerticalScrollIndicator={false}
    />
  );

}