import { Text } from "react-native";

type TitleProps = {
  children: React.ReactNode;
};

const Title = ({ children }: TitleProps) => {
  return (
    <Text className="text-5xl font-bold tracking-wider text-neutral-800 py-8">
      {children}
    </Text>
  );
};

export default Title;
