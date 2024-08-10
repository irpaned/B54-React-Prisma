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
import { useFollow } from "../../../hooks/use-follow-user";

//

export function SuggestCard({
  id,
  fullName,
  userName,
  photoProfile,
  isFollowing,
}: {
  id: number;
  fullName: string;
  userName: string;
  photoProfile: string;
  isFollowing: boolean;
}) {
  const { isPending, onFollow } = useFollow(id);
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

          <ButtonFollow
            isFollowing={isFollowing}
            isLoading={isPending}
            onClick={onFollow}
          />
        </Box>
      </CardBody>
    </>
  );
}
