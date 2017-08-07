import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../../../actions';
import {bindActionCreators} from 'redux';

import UploadWidget from '../Upload';

import './styles.scss';

class ListWidget extends React.Component {
  constructor(props) {
    super();

    props.actions.getRandomFiles();
  }

  render() {
    if (!this.props.list.length) return null;

    return (
      <div className="cmp-list-widget">
        <ul>
          {this.props.list.map((value, index) => {
              return (
                <li key={index}>
                  <img src={value} alt="image" title="Select image to see similar"
                       onClick={this.searchByImage.bind(this, index)} />
                  <ol>
                    {this.renderSimilar(index)}
                  </ol>
                </li>
              )
            }
          )}
          <li>
            <UploadWidget />
          </li>
        </ul>
      </div>
    );
  }

  renderSimilar(index) {
    const list = this.props.similar[index];
    if (!list) return null;

    return list.map((value, index) =>
      <li key={index}>
        <img src={value} alt="image" />
      </li>
    );
  }

  searchByImage = (index, event) => {
    this.props.actions.searchBy(event.target.src, index);
  };

}

function mapStateToProps(state) {
  return {
    list: state.list,
    isLoading: state.isLoading,
    similar: state.similar
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListWidget);
