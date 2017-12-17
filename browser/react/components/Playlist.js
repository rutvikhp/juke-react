import React, { Component } from 'react';
import Songs from './Songs';
import AddSongForm from './AddSongForm';
import axios from 'axios';

export default class Playlist extends React.Component {

  constructor () {
    super();
    this.state = {
      playlist: {}
    };

    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
  }

  fetchPlaylist (playlistId) {
    axios.get(`/api/playlists/${playlistId}`)
      .then(res => res.data)
      .then(playlist => {
        this.setState({ playlist });
      });
  }

  addSongToPlaylist (playlistId, songId) {
    return axios.post(`/api/playlists/${playlistId}/songs`, {
      id: songId
    })
    .then(res => res.data)
    .then(song => {
      const playlist = this.state.playlist;
      const songs = playlist.songs;
      const newSongs = [...songs, song];
      const newPlaylist = Object.assign({}, playlist, { songs: newSongs });
      this.setState({ playlist: newPlaylist });
    });
  }

  componentDidMount () {
    const playlistId = this.props.match.params.playlistId;
    this.fetchPlaylist(playlistId);
  }

  componentWillReceiveProps (nextProps) {
    const nextPlaylistId = nextProps.match.params.playlistId;
    const currentPlaylistId = this.props.match.params.playlistId;
    if (nextPlaylistId !== currentPlaylistId)
      this.fetchPlaylist(nextPlaylistId);
  }

  render () {

    const playlist = this.state.playlist;

    return (
      <div>
        <h3>{ playlist.name }</h3>
        <Songs songs={playlist.songs} />
        { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
        <hr />
        <AddSongForm playlist={playlist} addSongToPlaylist={this.addSongToPlaylist} />
      </div>
    );
  }
}
