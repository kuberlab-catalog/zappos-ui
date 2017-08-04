import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../../../actions';
import {bindActionCreators} from 'redux';

import './styles.scss';

class ListWidget extends React.Component {
  render() {
    if (!this.props.list.length) return null;

    return (
      <div className="cmp-list-widget">
        <h3>Found similar images:</h3>
        <ul>
          {this.props.list.map((value, index) => {
              const liClass1 = this.props.selectedItem === index ? 'active' : '';
              const liClass2 = this.props.isLoading && liClass1 !== 'active' ? 'disabled' : '';

              return (
                <li key={index} className={`${liClass1} ${liClass2}`}>
                  <img src={value} alt="image" title="Select image to start search"
                       onClick={this.searchByImage.bind(this, index)} />
                </li>
              )
            }
          )}
        </ul>
      </div>
    );
  }

  searchByImage = (index, event) => {
    this.props.actions.setSelectedItem(index);

    this.props.actions.searchBy(event.target.src);
  };

}

function mapStateToProps(state) {
  return {
    list: state.list,
    selectedItem: state.selectedItem,
    isLoading: state.isLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListWidget);
