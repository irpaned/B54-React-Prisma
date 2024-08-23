import { Box } from "@chakra-ui/react";
import { FollowPage } from "../features/follow/component/follow";

export function Follow() {
  const scrollbar = {
    "overflow-x": "hidden",
    "::-webkit-scrollbar": {
      width: "10px",
    },
    "::-webkit-scrollbar-track": {
      border: "7px solid black",
    },
    "::-webkit-scrollbar-thumb": {
      background: "linear-gradient(transparent,green)",
      borderRadius: "6px",
    },
  };
  return (
    <Box
      overflow="scroll"
      sx={scrollbar}
      w="600px"
      m="0"
      bg="black"
      h="703px"
      border="1px solid rgb(47, 51, 54)"
      borderTop="none"
      borderBottom="none"
      paddingTop="10px"
    >
      <FollowPage />
    </Box>
  );
}
