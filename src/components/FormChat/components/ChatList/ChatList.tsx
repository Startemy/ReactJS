import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { selectChatList } from 'src/store/chats/selectors';
import { deleteChat } from 'src/store/chats/actions';

export const ChatList = () => {
  const chatList = useSelector(selectChatList)
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Чаты" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {chatList.map((chat) => (
        <Collapse key={chat.id} in={open} timeout="auto" unmountOnExit>
          <NavLink
            to={`/chats/${chat.name}`}
            style={({ isActive }) => ({
              color: isActive ? 'green' : 'black',
            })}
          >
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary={chat.name} />
              </ListItemButton>
            </List>
          </NavLink>
          <button
            name='deleteChat'
            onClick={() => { dispatch(deleteChat(chat.name)) }} >
            <DeleteOutlinedIcon />
          </button>
        </Collapse>
      ))}
    </List>
  );
}