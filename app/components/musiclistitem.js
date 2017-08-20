import React from 'react';
import './musiclistitem.less';
import Pubsub from 'pubsub-js';

class MusicListItem extends React.Component {
	playMisic(musicItem) {
		Pubsub.publish('PLAY_MUSIC', musicItem);
	}

	deleteMisic(musicItem, e) {
		e.stopPropagation();
		Pubsub.publish('DELETE_MUSIC', musicItem);
	}

	render() {
		let musicItem = this.props.musicItem;
		return (
			<li onClick={this.playMisic.bind(this, musicItem)} className={`components-musiclistitem row ${this.props.focus? 'focus':''}`}>
				<p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
				<p onClick={this.deleteMisic.bind(this, musicItem)} className="-col-auto delete"></p>
			</li>
		);
	}
}

export default MusicListItem;

