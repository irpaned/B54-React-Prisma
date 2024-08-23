import { Flex } from "@chakra-ui/react";
import { LeftBar } from "../pages/2.left-bar";
import { MyProfile } from "../pages/4.profile";
import { RightBarProfile } from "../pages/3.right-bar-profile";

export default function Profile() {
  return (
    <>
      <Flex justify={"center"} position={"relative"} right={"20"}>
        <LeftBar />
        <MyProfile />
        <RightBarProfile />
      </Flex>
    </>
  );
}
