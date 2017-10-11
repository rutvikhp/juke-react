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

  componentDidMount () {
    const albumId = this.props.match.params.albumId;

    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        album
      }));
  }

  render () {
    const album = this.state.album;

    return (
      <div className="album">
        <div>
          <div>
            <h3>{ album.name }</h3>
            <a href={
              `mailto:?subject=${album.name}&body=Check%20out%20this%20groovy%20album: ${window.location.href}`
            }>
              <button id="send-album-btn" className="glyphicon glyphicon-share btn btn-default btn-xs"></button>
            </a>
          </div>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs songs={album.songs} />
      </div>
    );
  }
}
