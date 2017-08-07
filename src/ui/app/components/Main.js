import React from 'react';
import {connect} from 'react-redux';

import LOADER from '../assets/images/ajax-loader.gif';
import ListWidget from './widget/List';

class Main extends React.Component {
  render() {
    const classes = this.props.isLoading ? 'is-loading disabled' : '';

    return (
      <div className={`main ${classes}`}>
        <img src={LOADER} alt="Loader..." className="loader" />
        <ListWidget />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading
  }
}

export default connect(mapStateToProps, null)(Main);
