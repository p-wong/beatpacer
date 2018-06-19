import React from 'react'

class Visualization extends React.Component {
  constructor(props){
    super(props)

    this.createVisualization = this.createVisualization.bind(this)
  }

  componentDidMount(){
    this.createVisualization()
  }

  createVisualization(){
    let context = new AudioContext();
    let analyser = context.createAnalyser();
    let canvas = this.refs.analyzerCanvas;
    canvas.width = 800;
    canvas.height = 100;
    let ctx = canvas.getContext('2d');
    let audio = this.refs.audio;
    audio.crossOrigin = "anonymous";
    let audioSrc = context.createMediaElementSource(audio);
    audioSrc.connect(analyser);
    audioSrc.connect(context.destination);
    analyser.connect(context.destination);

    function renderFrame(){
      let freqData = new Uint8Array(analyser.frequencyBinCount)
      requestAnimationFrame(renderFrame)
      analyser.getByteFrequencyData(freqData)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      console.log(freqData)
      ctx.fillStyle = '#2ebd59';
      let bars = 300;
      for (var i = 0; i < bars; i++) {
        let bar_x = i * 6;
        let bar_width = 4;
        let bar_height = -(freqData[i] / 4);
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height)
      }
    };
    renderFrame()
  }

  render() {
    return (
      <div>
        <div>
          <canvas
            ref="analyzerCanvas"
            id="visualizer"
            >
          </canvas>
          <div>
            <audio
              ref="audio"
              autoPlay={true}
              controls={true}
              src={this.props.audioFile}
              >
            </audio>
          </div>
        </div>
      </div>
    );
  }
}

export default Visualization;
