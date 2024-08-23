// import {
//   Avatar,
//   Box,
//   Card,
//   CardBody,
//   Heading,
//   HStack,
//   Spacer,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   Text,
// } from "@chakra-ui/react";
// import {
//   useFollowerPage,
//   useFollowingPage,
// } from "../../../hooks/use-follow-page";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";

// const TabCss = {
//   border: "1px solid rgb(47, 51, 54)",
//   borderTop: "none",
//   borderRight: "none",
//   borderLeft: "none",
// };
// export function FollowPage() {
//   const currentUser = useSelector((state: RootState) => state.auth.user);
//   const { listFollowings, isPending } = useFollowingPage(currentUser.id);
//   const { listFollowers, isPending } = useFollowerPage(currentUser.id);

//   console.log("cek", listFollowings);

//   return (
//     <Tabs mt={"0"} isFitted variant="enclosed">
//       <TabList border={"none"} mb="1em">
//         <Tab
//           sx={TabCss}
//           color={"white"}
//           _selected={{
//             border: "1px solid green",
//             borderTop: "none",
//             borderRight: "none",
//             borderLeft: "none",
//           }}
//         >
//           Followers
//         </Tab>
//         <Tab
//           sx={TabCss}
//           color={"white"}
//           _selected={{
//             border: "1px solid green",
//             borderTop: "none",
//             borderRight: "none",
//             borderLeft: "none",
//           }}
//         >
//           Following
//         </Tab>
//       </TabList>
//       <TabPanels>
//         <TabPanel paddingTop={0}>
//           <Box>
//             {listFollowers?.followeds.map((user) => (
//               <Card backgroundColor={"transparent"}>
//                 <CardBody paddingTop="0" paddingBottom="2">
//                   <Box display="flex">
//                     <HStack>
//                       <Avatar
//                         boxSize="2.5em"
//                         src={user.follower.photoProfile}
//                         name={user.follower.fullName}
//                       />
//                       <Box>
//                         <Heading size="xs" color="white">
//                           {user.follower.fullName}
//                         </Heading>
//                         <Text fontSize="sm" color="grey">
//                           @{user.follower.userName}
//                         </Text>
//                       </Box>
//                     </HStack>
//                     <Spacer />
//                   </Box>
//                 </CardBody>
//               </Card>
//             ))}
//           </Box>
//         </TabPanel>
//         <TabPanel paddingTop={0}>
//           <Box>
//             {listFollowings?.followers.map((user) => (
//               <Card backgroundColor={"transparent"}>
//                 <CardBody paddingTop="0" paddingBottom="2">
//                   <Box display="flex">
//                     <HStack>
//                       <Avatar
//                         boxSize="2.5em"
//                         src={user.followed.photoProfile}
//                         name={user.followed.fullName}
//                       />
//                       <Box>
//                         <Heading size="xs" color="white">
//                           {user.followed.fullName}
//                         </Heading>
//                         <Text fontSize="sm" color="grey">
//                           @{user.followed.userName}
//                         </Text>
//                       </Box>
//                     </HStack>
//                     <Spacer />
//                   </Box>
//                 </CardBody>
//               </Card>
//             ))}
//           </Box>
//         </TabPanel>
//       </TabPanels>
//     </Tabs>
//   );
// }

import {
  Avatar,
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Spacer,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import {
  useFollowerPage,
  useFollowingPage,
} from "../../../hooks/use-follow-page";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const TabCss = {
  border: "1px solid rgb(47, 51, 54)",
  borderTop: "none",
  borderRight: "none",
  borderLeft: "none",
};

export function FollowPage() {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const { listFollowings, isPending: isFollowingPending } = useFollowingPage(
    currentUser.id
  );
  const { listFollowers, isPending: isFollowerPending } = useFollowerPage(
    currentUser.id
  );

  return (
    <Tabs mt={"0"} isFitted variant="enclosed">
      <TabList border={"none"} mb="1em">
        <Tab
          sx={TabCss}
          color={"white"}
          _selected={{
            border: "1px solid green",
            borderTop: "none",
            borderRight: "none",
            borderLeft: "none",
          }}
        >
          Followers
        </Tab>
        <Tab
          sx={TabCss}
          color={"white"}
          _selected={{
            border: "1px solid green",
            borderTop: "none",
            borderRight: "none",
            borderLeft: "none",
          }}
        >
          Following
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel paddingTop={0}>
          <Box>
            {isFollowerPending ? (
              <Spinner color="white" />
            ) : (
              listFollowers?.followeds.map((user) => (
                <Card
                  backgroundColor={"transparent"}
                  key={user.follower.userName}
                >
                  <CardBody paddingTop="0" paddingBottom="2">
                    <Box display="flex">
                      <HStack>
                        <Avatar
                          boxSize="2.5em"
                          src={user.follower.photoProfile}
                          name={user.follower.fullName}
                        />
                        <Box>
                          <Heading size="xs" color="white">
                            {user.follower.fullName}
                          </Heading>
                          <Text fontSize="sm" color="grey">
                            @{user.follower.userName}
                          </Text>
                        </Box>
                      </HStack>
                      <Spacer />
                    </Box>
                  </CardBody>
                </Card>
              ))
            )}
          </Box>
        </TabPanel>
        <TabPanel paddingTop={0}>
          <Box>
            {isFollowingPending ? (
              <Spinner color="white" />
            ) : (
              listFollowings?.followers.map((user) => (
                <Card
                  backgroundColor={"transparent"}
                  key={user.followed.userName}
                >
                  <CardBody paddingTop="0" paddingBottom="2">
                    <Box display="flex">
                      <HStack>
                        <Avatar
                          boxSize="2.5em"
                          src={user.followed.photoProfile}
                          name={user.followed.fullName}
                        />
                        <Box>
                          <Heading size="xs" color="white">
                            {user.followed.fullName}
                          </Heading>
                          <Text fontSize="sm" color="grey">
                            @{user.followed.userName}
                          </Text>
                        </Box>
                      </HStack>
                      <Spacer />
                    </Box>
                  </CardBody>
                </Card>
              ))
            )}
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
