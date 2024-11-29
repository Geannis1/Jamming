import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search songs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    marginBottom: '20px',
                    padding: '10px',
                    fontSize: '16px',
                    width: '300px'
                }}
            />
        </div>
    );
};

export default SearchBar;