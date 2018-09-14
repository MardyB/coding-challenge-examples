import React from 'react';
import PropTypes from 'prop-types';
import './GridItem.css';

const GridItem = ({ title, url, thumbnail }) => (
  <div className="gridItem">
    <a href={url}>
      <img className="card" alt={title} src={thumbnail} />
    </a>
    <p className="title">{title}</p>
  </div>
);

GridItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired
};

export default GridItem;
