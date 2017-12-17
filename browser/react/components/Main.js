import React, { Component } from 'react';
import axios from 'axios';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StatefulAlbums from './StatefulAlbums';
import StatefulArtists from './StatefulArtists';
import SingleArtist from './SingleArtist';
import SingleAlbum from './SingleAlbum';
import Sidebar from './Sidebar';
import Player from './Player';
import NewPlaylist from './NewPlaylist';
import Playlist from './Playlist';

export default class Main extends Component {

  constructor () {
    super();
    this.state = {
      playlists: []
    };

    this.addPlaylist = this.addPlaylist.bind(this);
  }

  componentDidMount () {
    axios.get('/api/playlists')
      .then(res => res.data)
      .then(playlists => this.setState({ playlists }));
  }

  addPlaylist (name) {
    axios.post('/api/playlists', { name })
      .then(res => res.data)
      .then(playlist => {
        this.setState({ playlists: [...this.state.playlists, playlist] })
      });
  }

  render () {

    const playlists = this.state.playlists;
    const addPlaylist = this.addPlaylist;

    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar playlists={playlists} />
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" component={SingleAlbum} />
              <Route exact path="/artists" component={StatefulArtists} />
              <Route path="/artists/:artistId" component={SingleArtist} />
              <Route path="/new-playlist" render={() => <NewPlaylist addPlaylist={addPlaylist} />} />
              <Route path="/playlists/:playlistId" component={Playlist} />
              <Route component={StatefulAlbums} />
            </Switch>
          </div>
          <Player />
        </div>
    </Router>
    );
  }
}
