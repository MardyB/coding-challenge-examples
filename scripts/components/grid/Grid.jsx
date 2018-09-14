import React from 'react';
import Pagination from 'react-js-pagination';
import GridItem from '../gridItem/GridItem';
import getImages from '../../api/service';
import './Grid.css';

const LIMIT = 6;
const ORDER = {
  asc: 'asc',
  desc: 'desc'
};

export default class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      activePage: 0,
      order: ORDER.asc
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.orderElements = this.orderElements.bind(this);
  }
  async componentWillMount() {
    this.setState({
      items: await getImages(this.state.activePage, LIMIT, this.state.order),
      activePage: this.state.activePage,
      order: this.state.order
    });
  }
  async handlePageChange(pageNumber) {
    this.setState({
      items: await getImages(pageNumber, LIMIT, this.state.order),
      activePage: pageNumber,
      order: this.state.order
    });
  }
  orderElements() {
    this.setState({
      items: this.state.items
        .map(elem => elem)
        .sort(
          this.state.order === ORDER.asc
            ? (a, b) => b.title.localeCompare(a.title)
            : (a, b) => a.title.localeCompare(b.title)
        ),
      activePage: this.state.activePage,
      order: this.state.order === ORDER.asc ? ORDER.desc : ORDER.asc
    });
  }

  render() {
    let gridItems = [];
    if (this.state.items.length > 1) {
      gridItems = this.state.items.map(item => (
        <GridItem key={item.id} title={item.title} url={item.url} thumbnail={item.thumbnailUrl} />
      ));
    }
    return (
      <div className="grid">
        <div
          onKeyPress={this.orderElements}
          tabIndex="0"
          role="button"
          className="orderButton"
          onClick={this.orderElements}
        >
          Title {this.state.order === ORDER.asc ? '↑' : '↓'}
        </div>
        {gridItems}
        <div>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={9}
            totalItemsCount={4950}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
            activeLinkClass="activeLink"
          />
        </div>
      </div>
    );
  }
}
