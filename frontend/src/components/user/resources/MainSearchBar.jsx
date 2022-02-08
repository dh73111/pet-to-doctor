import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import zIndex from '@mui/material/styles/zIndex';

function MainSearchBar(props) {
    const style = {
        position: 'absolute',
        fontSize: '32px',
        color: '#63CFC8',
        top: '7px',
        right: '10px',
        zIndex: 99,
    }
    return (
        <span className='searchbar'>
            <input type="text" placeholder='찾으시는 병원을 입력하세요.' className='mainSearchBar' />
            <SearchIcon sx={style} />
        </span>
    );
}

export default MainSearchBar;