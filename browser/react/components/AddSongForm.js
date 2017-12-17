import React, { Component } from 'react';
import axios from 'axios';

export default class AddSongForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      songId: 1,
      error: false,
      songs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    axios.get('/api/songs')
      .then(res => res.data)
      .then(songs => {
        this.setState({ songs });
      });
  }

  handleChange (evt) {
    this.setState({
      songId: evt.target.value,
      error: false
    });
  }

  handleSubmit (evt) {
    evt.preventDefault();

    const playlistId = this.props.playlist.id;
    const songId = this.state.songId;

    this.props.addSongToPlaylist(playlistId, songId)
      .catch(err => {
        this.setState({ error: true });
      });
  }

  render () {

    const songs = this.state.songs;
    const error = this.state.error;
    const handleChange = this.handleChange;
    const handleSubmit = this.handleSubmit;

    return (
      <div className="well">
        <form className="form-horizontal" noValidate name="songSelect" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Add to Playlist</legend>
            { error && <div className="alert alert-danger">Song is a duplicate</div> }
            <div className="form-group">
              <label htmlFor="song" className="col-xs-2 control-label">Song</label>
              <div className="col-xs-10">
                <select
                  className="form-control"
                  name="song"
                  required
                  onChange={handleChange}>
                  {
                    songs && songs.map(song => (
                      <option key={song.id} value={song.id}>{song.name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success">Add Song</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
