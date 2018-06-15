var React = require('react')
var LazyLoad = require('react-lazyload').default;

class LazyImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.small
    }
  }
  componentDidMount(){
    let large = new Image()
    large.src = this.props.large
    large.onload= function(){
      this.setState({
        url: this.props.large
      })
    }.bind(this)
  }
  render() {
    if(this.props.lazy){
      return (
        <LazyLoad height={120}>
            <img className="gif" src={this.state.url}></img>
        </LazyLoad>
      );
    }else{
      return (
         <img className="gif" src={this.state.url}></img>
      );
    }
  }
}
module.exports = LazyImage