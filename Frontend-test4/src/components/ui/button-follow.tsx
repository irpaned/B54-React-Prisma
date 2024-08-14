import { Button } from "@chakra-ui/react";

export default function ButtonFollow({
  isLoading,
  isFollowing,
  onClick,
}: {
  isLoading: boolean;
  isFollowing: boolean;
  onClick: () => void;
}) {
  const ButtonPost = {
    bg: "brand.900",
    color: "white",
    borderRadius: 30,
    p: "0px 15px 1px 15px",
    ":hover": {
      bg: "white",
      color: "black",
    },
    ":active": {
      color: "black",
      bg: "#ACACAC",
    },
  };
  return (
    <Button
      bg={"brand.900"}
      size={"sm"}
      color={"white"}
      borderRadius={"full"}
      alignSelf={"center"}
      isLoading={isLoading}
      onClick={onClick}
      sx={ButtonPost}
    >
      {isFollowing ? "unfollow" : "follow"}
    </Button>
  );
}
