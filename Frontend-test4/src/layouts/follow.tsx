import { Flex } from "@chakra-ui/react";
import { Follow } from "../pages/12.follow";
import { LeftBar } from "../pages/2.left-bar";
import { RightBar } from "../pages/3.right-bar";

export default function FollowPage() {
  return (
    <Flex justify={"center"} position={"relative"} right={"20"}>
      <LeftBar />
      <Follow />
      <RightBar />
    </Flex>
  );
}
