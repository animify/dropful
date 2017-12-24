import React from 'react';
import PropTypes from 'prop-types';

const RandomImage = ({ source }) => {
    const style = {
        backgroundImage: `url(${source})`
    };

    return (
        <div className="unsplash" style={style}>
            <p className="unsplash-credits">Itchy Feet <strong>@boredbanker</strong></p>
        </div>
    );
};

RandomImage.propTypes = {
    source: PropTypes.string
};

RandomImage.defaultProps = {
    source: 'https://images.unsplash.com/photo-1506047453301-d4df41ee32c3?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE4Njc2fQ%3D%3D%0A&s=694a1777bdc1fc0935ace9f5b1808c06'
    // source: 'https://images.unsplash.com/photo-1489403436206-aa40ce7f184d?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE4Njc2fQ%3D%3D%0A&s=2348abb1a04ef9de07f234bb149d1b1f'
};

export default RandomImage;
