import React from 'react';
import {connect} from 'react-redux'
import * as Actions from '../../../actions';
import {bindActionCreators} from 'redux';

import './styles.scss';
import LOADER from './images/ajax-loader.gif';

class UploadWidget extends React.Component {
  render() {
    const class1 = this.props.list.length ? 'selected' : 'not-selected';
    const class2 = this.props.isLoading ? 'is-loading' : '';

    return (
      <div className={`cmp-upload-widget ${class1} ${class2}`}>
        {this.props.selectedFile && this.props.list.length ?
          (
            <div className="cmp-upload-widget-preview">
              <img src={this.props.selectedFile} alt="Selected image" title="Selected image" />
            </div>
          ) : null
        }

        <form className={this.props.isLoading ? 'disabled' : ''}>
          <input type="file" name="file" onChange={this.onChange} ref={(input) => {
            this.inputFile = input;
          }} />
          <button type="button" onClick={this.clickOnInput}>Upload file...</button>
          <img src={LOADER} alt="Loader..." />
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
      this.props.actions.setSelectedFile(reader.result);
    });

    reader.readAsDataURL(this.inputFile.files[0]);
  }
}

function mapStateToProps(state) {
  return {
    list: state.list,
    isLoading: state.isLoading,
    selectedFile: state.selectedFile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadWidget);
