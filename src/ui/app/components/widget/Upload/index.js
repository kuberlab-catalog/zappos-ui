import React from 'react';
import {connect} from 'react-redux'
import * as Actions from '../../../actions';
import {bindActionCreators} from 'redux';

import './styles.scss';

class UploadWidget extends React.Component {
  render() {
    return (
      <div className="cmp-upload-widget">
        <form>
          <input type="file" name="file" onChange={this.onChange} ref={(input) => {
            this.inputFile = input;
          }} />
          <button type="button" className="upload" onClick={this.clickOnInput}>Upload file...</button>
          <button type="button" className="reset" onClick={this.reset}>Shuffle</button>
        </form>
      </div>
    );
  }

  onChange = (event) => {
    if (!event.target.files) return;
    const form = event.target.parentNode;

    this.getPreview();

    this.props.actions.uploadFile(new FormData(form));
    form.reset();
  };

  clickOnInput = () => {
    this.inputFile.click();
  };

  getPreview() {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      this.props.actions.setUploadedFile(reader.result);
    });

    reader.readAsDataURL(this.inputFile.files[0]);
  }

  reset = () => {
    this.props.actions.reset();
    this.props.actions.getRandomFiles();
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(UploadWidget);
