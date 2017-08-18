import React from 'react';
import Header from './components/header';
import Progress from './components/progress';

let duration = null;
class Root extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			progress: '-',
		}

		this.progressChangehandler = this.progressChangehandler.bind(this);
	}

	componentDidMount() {
		$('#player').jPlayer({
			ready: function () {
				$(this).jPlayer('setMedia', {
					mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
				}).jPlayer('play');
			},
			supplied: 'mp3',
			vmode: 'window'
		});
		$('#player').bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration;
			this.setState({
				progress: e.jPlayer.status.currentPercentAbsolute
			});
		});
	}

	componentWillUnmount() {
		$('#player').unbind($.jPlayer.event.timeupdate);
	}

	progressChangehandler(progress) {
		$('#player').jPlayer('play', duration * progress);
	}

	render() {
		return (
			<div>
				<Header /> 
				<Progress progress={this.state.progress} 
						  onProgressChange={this.progressChangehandler} 
						  barColor="#ff0000" />
			</div>
		);
	}
}

export default Root;