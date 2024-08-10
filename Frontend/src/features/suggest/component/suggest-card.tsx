import {
  Avatar,
  Box,
  BoxProps,
  Button,
  CardBody,
  Heading,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";

import { SuggestEntity } from "../entities/suggest-entity";
import { useFollow } from "../../../hooks/use-follow-user";

interface SuggestCardProps extends BoxProps {
  suggest: SuggestEntity;
}

export function SuggestCard({ suggest }: SuggestCardProps) {
  const { handleFollow } = useFollow(suggest.id);

  const buttonFollow = {
    color: "brand.800",
    bg: "brand.900",
    borderRadius: "20px",
    fontSize: "sm",
    p: "0px 20px 0px 20px",
    ":hover": {
      bg: "brand.800",
      color: "brand.700",
    },
  };

  return (
    <>
      <CardBody paddingTop="0" paddingBottom="2">
        <Box display="flex">
          <HStack>
            <Avatar
              boxSize="2.5em"
              src={suggest?.photoProfile}
              name={suggest?.fullName}
            />
            <Box>
              <Heading size="xs">{suggest?.fullName}</Heading>
              <Text fontSize="sm" color="grey">
                @{suggest.userName}
              </Text>
            </Box>
          </HStack>
          <Spacer />

          <Button onClick={handleFollow} sx={buttonFollow}>
            Follow
          </Button>
        </Box>
      </CardBody>
    </>
  );
}
