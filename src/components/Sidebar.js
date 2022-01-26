import React from 'react';
import styled from 'styled-components'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SidebarOption from './SidebarOption'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';


function Sidebar() {
    
  // channels = values , react firebase hooks, get a collection
  const [channels, loading , error ] = useCollection(collection(db,"rooms"))

  const [user] = useAuthState(auth);
 
  return (
      <SidebarContainer>
        <SidebarHeader>
            <SidebarInfo>
              <h2>{user.displayName}</h2>
              <h3>
                  <FiberManualRecordIcon />
                  Solange
              </h3>
            </SidebarInfo>
            <CreateIcon />
        </SidebarHeader>

        <SidebarOption Icon={InsertCommentIcon} title="Threads"/>
        <SidebarOption Icon={InboxIcon} title="Mentions & reactions"/>
        <SidebarOption Icon={DraftsIcon} title="Saved items"/>
        <SidebarOption Icon={BookmarkIcon} title="Channel browser"/>
        <SidebarOption Icon={PeopleAltIcon} title="People & user groups"/>
        <SidebarOption Icon={AppsIcon} title="Apps"/>
        <SidebarOption Icon={FileCopyIcon} title="File browser"/>
        <SidebarOption Icon={ExpandLessIcon} title="Show less"/>
        <hr />
        <SidebarOption Icon={ExpandMoreIcon} title="Channels"/>
        <hr />
        <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel"/>
        
        {channels?.docs.map(doc => (
          <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
        ))}

      </SidebarContainer>
  );
}

export default Sidebar;

 const SidebarContainer = styled.div`
   background-color: var(--slack-color);
   color:white;
   flex:0.3;
   border-top: 1px solid #49274b;
   max-width: 260px;
   margin-top: 60px;
   > hr {
     margin-top: 10px;
     margin-bottom: 10px;
     border: 1px solid #49274b;
   }
 `

 const SidebarHeader = styled.div`
  display:flex;
  border-bottom: 1px solid #49274b;
  padding:13px;
  > .MuiSvgIcon-root {
    padding:8px;
    color:#49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
 `

const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > h3 {
    display:flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }
  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color:green;
  }
`