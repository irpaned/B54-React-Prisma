import {  Box } from '@chakra-ui/react';
import { ThreadCard} from '../features/home/component/thread-card.tsx';
import { Profile } from '../features/profile/components/my-profile.tsx';
import { useHomePage } from '../hooks/use-home-page.tsx';

import { EditProfile } from '../hooks/use-edit-profile.tsx';

export function MyProfileTest() {

    const {
    threads
    } = useHomePage()

    const {user} = EditProfile()


  const BoxProfile = {
    border: "1px solid rgb(47, 51, 54)",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    p: "20px 15px 20px 15px"
  }


  return (

    
    <Box w="600px" m='0' bg="black" h="700px"   border="1px solid rgb(47, 51, 54)"  borderTop="none" paddingTop="0px"  color="white" overflow="scroll">

      
      <Box sx={BoxProfile}>

        <Profile/>
        {/* {user?.map((user) => <Profile user={user}/>)} */}

      <Box >

        {/* ini cara tanStack */}
        {threads?.map((thread) => <ThreadCard thread={thread} />)}

        {/* ini cara Redux */}
        {/* {<ThreadCard/>} */}

      </Box> 
    </Box>
    </Box>
    
  )
}

