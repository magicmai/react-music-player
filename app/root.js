import React from 'react';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musiclist';
import { MUSIC_LIST } from './config/musiclist';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Pubsub from 'pubsub-js';

class Root extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentMusicItem: MUSIC_LIST[0],
			musiclist: MUSIC_LIST
		}
	}

	playMusic(musicItem) {
		$('#player').jPlayer('setMedia', {
			mp3: musicItem.file
		}).jPlayer('play');

		this.setState({
			currentMusicItem: musicItem
		});
	}

	playNext(type='next') {
		let index = this.findMusicIndex(this.state.currentMusicItem);
		let newIndex = null;
		let musicListlength = this.state.musiclist.length;
		if (type === 'index') {
			newIndex = (index + 1) % musicListlength;
		} else {
			newIndex = (index - 1 + this.state.musiclist.length) % musicListlength;
		}

		this.playMusic(this.state.musiclist[newIndex]);
	}

	findMusicIndex(musicItem) {
		return this.state.musiclist.indexOf(musicItem);
	}

	componentDidMount() {
		$('#player').jPlayer({
			supplied: 'mp3',
			vmode: 'window'
		});

		this.playMusic(this.state.currentMusicItem);
		
		Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
			this.playMusic(musicItem);
		});
		Pubsub.subscribe('PLAY_PREV', (msg, musicItem) => {
			this.playNext('prev');
		});
		Pubsub.subscribe('PLAY_NEXT', (msg, musicItem) => {
			this.playNext();
		});

		Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
			this.setState({
				musiclist: this.state.musiclist.filter(item => {
					return item !== musicItem;
				})
			});
			if(this.state.currentMusicItem === musicItem){
				this.playNext('next');
			}
		});

		$('#player').bind($.jPlayer.event.ended, (e) => {
			this.playNext();
		});
	}

	componentWillUnmount() {
		Pubsub.unsubscribe('PLAY_MUSIC');
		Pubsub.unsubscribe('DELETE_MUSIC');
		Pubsub.unsubscribe('PLAY_PREV');
		Pubsub.unsubscribe('PLAY_NEXT');
		$('#player').unbind($.jPlayer.event.ended);
	}

	render() {
		const Home = () => {
			return <Player currentMusicItem={this.state.currentMusicItem} />
		};
		const List = () => {
			return <MusicList 
				currentMusicItem={this.state.currentMusicItem} 
				musiclist={this.state.musiclist} />
		};
		return (
			<Router>
        		<div>
          			<Header/>
					<Route exact path="/" component={Home}/>
					<Route path="/list" component={List}/>
        		</div>
      		</Router>
		);
	}
}

export default Root;