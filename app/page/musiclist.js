import React from 'react';
import MusicListItem from '../components/musiclistitem';

class MusicList extends React.Component {
	render() {
		let ListEle = null;
		ListEle = this.props.musiclist.map((item) => {
			return <MusicListItem 
				focus={item === this.props.currentMusicItem}
				key={item.id} 
				musicItem={item}>
					{item.title}
			</MusicListItem>
		});

		return (
			<ul>
				{ListEle}
			</ul>
		);
	}
}

export default MusicList;