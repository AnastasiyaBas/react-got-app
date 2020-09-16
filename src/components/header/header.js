import React from 'react';
import './header.css';

const Header = () => {
    return (
        <div className='headerBlock'>
            <h3>
                <a href="_#">
                Game of Thrones DB
                </a>
            </h3>
            <ul className='headerLinks'>
                <li>
                    <a href="_#">Characters</a>
                </li>
                <li>
                    <a href="_#">Houses</a>
                </li>
                <li>
                    <a href="_#">Books</a>   
                </li>
            </ul>
        </div>
    );
};

export default Header;