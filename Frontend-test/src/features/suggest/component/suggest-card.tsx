import {
  Avatar,
  Box,
  CardBody,
  Heading,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";

import ButtonFollow from "../../../components/ui/button-follow";

// interface SuggestCardProps extends BoxProps {
//   suggest: SuggestEntity;
// }

export function SuggestCard({
  fullName,
  userName,
  photoProfile,
  isLoading,
  handleFollow,
}: {
  fullName: string;
  userName: string;
  photoProfile: string;
  isLoading: boolean;
  handleFollow: () => void;
}) {
  return (
    <>
      <CardBody paddingTop="0" paddingBottom="2">
        <Box display="flex">
          <HStack>
            <Avatar boxSize="2.5em" src={photoProfile} name={fullName} />
            <Box>
              <Heading size="xs">{fullName}</Heading>
              <Text fontSize="sm" color="grey">
                @{userName}
              </Text>
            </Box>
          </HStack>
          <Spacer />

          <ButtonFollow isLoading={isLoading} handleFollow={handleFollow} />
        </Box>
      </CardBody>
    </>
  );
}
