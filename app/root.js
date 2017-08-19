import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musiclist';
import { MUSIC_LIST } from './config/musiclist';

class Root  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentMusicItem: MUSIC_LIST[0],
			musiclist: MUSIC_LIST
		}
	}

	componentDidMount() {
		$('#player').jPlayer({
			ready: function() {
				$(this).jPlayer('setMedia', {
					mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
				}).jPlayer('play');
			},
			supplied: 'mp3',
			vmode: 'window'
		});
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