import React from 'react';
import PropTypes from 'prop-types';

const RandomImage = ({ source }) => {
    const style = {
        backgroundImage: `url(${source})`
    };

    return (
        <div className="unsplash" style={style}>
            <p className="unsplash-credits">Ed Shelley <strong>@mr_ed</strong></p>
        </div>
    );
};

RandomImage.propTypes = {
    source: PropTypes.string
};

RandomImage.defaultProps = {
    source: 'https://images.unsplash.com/photo-1512355654265-78d6235d326a?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE4Njc2fQ%3D%3D%0A&s=638601dd09aa1a7f3d4f528988474402'
};

export default RandomImage;
