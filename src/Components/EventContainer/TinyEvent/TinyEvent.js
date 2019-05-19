import React, {Component} from 'react';

import request from '../../../Utils/request';

import styles from './TinyEvent.css';

export default class TinyEvent extends Component {
    state = {
        imgSrc: null,
    }
    
  render() {

    return (
        <div className={styles.TinyEvent}>
            <img src={`/api/files/${this.props.imgId}`} alt=""/>
            <div>{this.props.title}</div>
            <span>{this.props.type}</span>
        </div>
    );
  }
}

