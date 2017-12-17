import React, { Component } from 'react';
import axios from 'axios';
import FilterableArtists from './FilterableArtists';

export default class StatefulArtists extends Component {

  constructor () {
    super();
    this.state = {
      artists: []
    };
  }

  componentDidMount () {
    axios.get('/api/artists')
      .then(res => res.data)
      .then(artists => this.setState({ artists }));
  }

  render () {

    const artists = this.state.artists;

    return (
      <FilterableArtists artists={artists} />
    );
  }
}
