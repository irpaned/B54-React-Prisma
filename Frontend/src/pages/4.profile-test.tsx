import {  Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ThreadCard} from '../features/home/component/thread-card.tsx';
import { Profile } from '../features/profile/components/my-profile.tsx';
// import { UserEntity } from '../features/home/entities/user-entity.ts';
import { useProfilePage } from '../hooks/use-profile-page.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';



// interface ProfileCardProps extends BoxProps {
//   profile: UserEntity; 
  
// }
export function MyProfileTest() {

  const currentUser = useSelector((state : RootState) => state.auth.user);
    console.log(currentUser);

    const {
    threads
    } = useProfilePage(currentUser.id) // currentUser.id ini kita panggil karena di parameter hooks nya kita membutuhkan userId

  const BoxProfile = {
    border: "1px solid rgb(47, 51, 54)",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    borderBottom: "none",
    p: "20px 15px 20px 15px"
  }

  const TabCss = {
    border: "1px solid rgb(47, 51, 54)",
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
  }



  return (

    
    <Box w="600px" m='0' bg="black" h="700px"   border="1px solid rgb(47, 51, 54)"  borderTop="none" paddingTop="0px"  color="white" overflow="scroll">

      
      <Box sx={BoxProfile}>

        <Profile/>
        

        <Tabs mt={'0'} isFitted variant='enclosed'>
  <TabList border={'none'} mb='1em'>
    <Tab 
    sx={TabCss}  
    color={'white'}
    _selected={{ 
      border: "1px solid green",
      borderTop: "none",
      borderRight: "none",
      borderLeft: "none" }}
    >All Post</Tab>
    <Tab 
    sx={TabCss} 
    color={'white'}
     _selected={{ 
      border: "1px solid green",
      borderTop: "none",
      borderRight: "none",
      borderLeft: "none" }}
    >Media</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <Box >
        {/* ini cara tanStack */}
        {threads?.map((thread) => <ThreadCard thread={thread} />)}
        {/* ini cara Redux */}
        {/* {<ThreadCard/>} */}
      </Box> 
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
      

    </Box>
    </Box>
    
  )
}

