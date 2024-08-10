import { Button } from "@chakra-ui/react";

export default function ButtonFollow({
  isFollowing,
  isLoading,
  onClick,
}: {
  isFollowing: boolean;
  isLoading: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      colorScheme={"blue"}
      size={"sm"}
      borderRadius={"full"}
      alignSelf={"center"}
      onClick={onClick}
      isLoading={isLoading}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
