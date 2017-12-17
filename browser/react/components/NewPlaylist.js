import React, { Component } from 'react';

export default class NewPlaylist extends Component {

  constructor (props) {
    super(props);
    this.state = {
      inputValue: '',
      dirty: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (evt) {
    const value = evt.target.value;
    this.setState({
      inputValue: value,
      dirty: true
    });
  }

  handleSubmit (evt) {
    evt.preventDefault();

    const addPlaylist = this.props.addPlaylist;
    addPlaylist(this.state.inputValue);
    this.setState({
      inputValue: '',
      dirty: false
    });
  }

  render () {

    const dirty = this.state.dirty;
    const inputValue = this.state.inputValue;
    const handleSubmit = this.handleSubmit;
    const handleChange = this.handleChange;

    let warning = '';
    if (!inputValue && dirty) warning = 'You must enter a name';
    else if (inputValue.length > 16) warning = 'Name must be less than 16 characters';

    return (
      <div className="well" style={{marginTop: '20px'}}>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <fieldset>
            <legend>New Playlist</legend>
            { warning && <div className="alert alert-warning">{warning}</div> }
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input
                  className="form-control"
                  type="text"
                  onChange={handleChange}
                  value={inputValue}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={!!warning || !inputValue}>
                  Create Playlist
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
