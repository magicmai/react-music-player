import React from 'react';
import { Link } from 'react-router-dom';
import Progress from '../components/progress';
import './player.less';
import Pubsub from 'pubsub-js';

let duration = null;

class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			progress: 0,
			volume: 0,
			isPlay: true,
			leftTime: ''
		}
		
		this.progressChangehandler = this.progressChangehandler.bind(this);
		this.volumeChangeHandler = this.volumeChangeHandler.bind(this);
		this.play = this.play.bind(this);
	}

	playPrev() {
		Pubsub.publish('PLAY_PREV');
	}

	playNext() {
		Pubsub.publish('PLAY_NEXT');
	}

	formatTime(time) {
		time = Math.floor(time);
		let mimutes = Math.floor(time / 60);
		let seconds = Math.floor(time % 60);
		seconds = seconds < 10? `0${seconds}` : seconds;
		return `${mimutes}:${seconds}`;
	}

	componentDidMount() {
		$('#player').bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration;
			this.setState({
				progress: e.jPlayer.status.currentPercentAbsolute,
				volume: e.jPlayer.options.volume * 100,
				leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
			});
		});
	}

	componentWillUnmount() {
		$('#player').unbind($.jPlayer.event.timeupdate);
	}

	progressChangehandler(progress) {
		$('#player').jPlayer('play', duration * progress);
		this.setState({ 
			isPlay: true
		}); 
	}

	volumeChangeHandler(progress) {
		$('#player').jPlayer('volume', progress);		
	}

	play() {
		if(this.state.isPlay) {
			$('#player').jPlayer('pause');
		} else {
			$('#player').jPlayer('play');
		}
		this.setState({
			isPlay: !this.state.isPlay
		});
	}

	render() {
		return (
			<div className="player-page">
                <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                	<div className="controll-wrapper">
                		<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                		<h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                		<div className="row mt20">
                			<div className="left-time -col-auto">-{this.state.leftTime}</div>
                			<div className="volume-container">
                				<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                				<div className="volume-wrapper">
                					<Progress 
                						progress={this.state.volume} 
                						onProgressChange={this.volumeChangeHandler} 
                						barColor="#aaa" />
                				</div>
                			</div>
                		</div>
                		<div style={{height: 10, lineHeight: '10px', marginTop: 10}}>
			                <Progress 
			                	progress={this.state.progress}
			                	onProgressChange={this.progressChangehandler} />
                		</div>
                		<div className="mt35 row">
                			<div>
	                			<i className="icon prev" onClick={this.playPrev}></i>
	                			<i className={`icon ml20 ${this.state.isPlay? 'pause':'play'}`} onClick={this.play}></i>
	                			<i className="icon ml20 next" onClick={this.playNext}></i>
                			</div>
                			<div className="-col-auto">
                				<i className="icon repeat-cycle"></i>
                			</div>
                		</div>
                	</div>
                	<div className="-col-auto cover">
                		<img src={this.props.currentMusicItem.cover} alt="歌曲名称" />
                	</div>
                </div>
            </div>
		);
	}

}

export default Player;