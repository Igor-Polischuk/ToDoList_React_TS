import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import BallotIcon from '@mui/icons-material/Ballot';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { Container } from '@mui/material';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

import './sidebar.scss'
import ITask from '../../types/ITask';
import { FC } from 'react';

const Sidebar: FC<{
    toggleCreateTask: () => void,
    setFilter: (filter: string) => any,
    categoryes: string[]
}> = ({ toggleCreateTask, setFilter, categoryes }) => {
    return (
        <aside>
            <div className='aside__add'>
                <AddCircleOutlineOutlinedIcon sx={{
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: 94
                }}
                    onClick={toggleCreateTask} />
            </div>
            <List
                sx={{ width: '100%', color: 'white', borderBottom: '1px solid #a3a3a3', borderTop: '1px solid #a3a3a3' }}
                aria-label="contacts">
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setFilter('important')}>
                        <ListItemIcon>
                            <StarIcon sx={{ color: "#e3c500" }} />
                        </ListItemIcon>
                        <ListItemText primary="Importance" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setFilter('all')}>
                        <ListItemIcon>
                            <BallotIcon sx={{ color: "#4dd5ff" }} />
                        </ListItemIcon>
                        <ListItemText primary="All tasks" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setFilter('completed')}>
                        <ListItemIcon>
                            <LibraryAddCheckOutlinedIcon sx={{ color: "#00ff66" }} />
                        </ListItemIcon>
                        <ListItemText primary="Completed" />
                    </ListItemButton>
                </ListItem>
            </List>

            <List
                sx={{ width: '100%', color: 'white' }}
                aria-label="contacts">
                    {categoryes.map((category : string, i : number) => {
                        return (<ListItem disablePadding key={i}>
                            <ListItemButton onClick={() => setFilter(category)}>
                                <ListItemIcon>
                                    <FormatListBulletedOutlinedIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary={category} />
                            </ListItemButton>
                        </ListItem>)
                    })}
            </List>


        </aside>
    )
}

export default Sidebar