import React, { Component } from 'react';
import axios from 'axios';
import Songs from '../components/Songs';

export default class SingleAlbum extends Component {

  constructor () {
    super();
    this.state = {
      album: {}
    };
  }

  fetchAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        album
      }));
  }

  componentDidMount () {
    const albumId = this.props.match.params.albumId;
    this.fetchAlbum(albumId);
  }

  componentWillReceiveProps (nextProps) {
    const nextAlbumId = nextProps.match.params.albumId;
    const currentAlbumId = this.props.match.params.albumId;
    if (nextAlbumId !== currentAlbumId)
      this.fetchAlbum(nextAlbumId);
  }


  render () {
    const album = this.state.album;

    return (
      <div className="album">
        <div>
          <h3>{ album.name }</h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs songs={album.songs} />
      </div>
    );
  }
}
