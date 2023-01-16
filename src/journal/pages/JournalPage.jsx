
import { AddOutlined } from "@mui/icons-material"
import { IconButton} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startNewNote } from "../../store/journal/thunks"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView } from "../views/NoteView"
import { NothingSelectView } from "../views/NothingSelectView"



export const JournalPage = () => {

  const dispatch = useDispatch();

  const {isSaving,active} = useSelector(state => state.journal);

  const onClickNewNote = () =>{

    dispatch(startNewNote());

  }


  return (

    <JournalLayout>

   
    {
       (!!active) 
        ? <NoteView />
        : <NothingSelectView/> 

    }


      
    


     <IconButton
      onClick={onClickNewNote}
      size="large"
      disabled={isSaving}
     sx={{
      color:'white',
      backgroundColor:'error.main',
      ':hover':{backgroundColor:'error.main',opacity:0.9},
      position:'fixed',
      right:50,
      bottom:50
     }}
     
     >
      <AddOutlined sx={{fontSize:35}}/>
     </IconButton>

    </JournalLayout>

  
  )
}
