import { Box, BoxProps, Card, Image } from "@chakra-ui/react";
// import { ThreadEntity } from "../entities/thread-entity";

interface ThreadCardProps extends BoxProps {
  image: string;
}

export function MediaCard(props: ThreadCardProps) {
  const BoxCSS = {
    border: "1px solid rgb(47, 51, 54)",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    p: "20px 0px 5px 0px",
  };

  return (
    <>
      <Box sx={BoxCSS}>
        <Card maxW="100%" bg="black" color="white" padding="0 0 0 0">
          <Image borderRadius="20px" objectFit="cover" src={props.image} />
        </Card>
      </Box>
    </>
  );
}
