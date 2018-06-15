var React = require('react')
var Carousel = require('./carousel')

class FullPage extends React.Component {
  constructor(props) {
    super(props);
    this.categories = ['angry','bored','disappointed','drunk','embarrassed','excited','frustrated','happy','hungry','inspired','lonely','love','nervous','pain','reaction','relaxed','sad','sassy','scared','shocked','sick','stressed','surprised','suspicious','tired','unimpressed']
    this.state = {
      activeCats : ['angry','bored','disappointed','drunk'],
      loaded : [],
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.loaded = this.loaded.bind(this)
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }
  loaded(index){
    let loaded = this.state.loaded
    loaded.push(index)
    this.setState({
      loaded : loaded
    })
  }
  handleScroll(){
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)){
      let activeCats = this.state.activeCats
      if(this.state.loaded.indexOf(activeCats.length-3)!=-1){
        this.loadMoreCategories()
      }else{
        console.log('waiting for previous carousels to load')
      }
    }
  }
  loadMoreCategories(){
    let activeCats = this.state.activeCats
    if(activeCats.length < this.categories.length){
      activeCats.push(this.categories[activeCats.length])
    }
    this.setState({
      activeCats : activeCats
    })
  }
  render() { 
    if(this.state.loaded.length >=3){
      return (
        <div>
          { this.state.activeCats.map((category, i)=>{
            return <Carousel key={i} index={i} loaded={this.loaded} category={category} />
          })}
        </div>
      );
    }else{
      return( 
        <div className='hidden'>
          <Carousel key={0} index={0} loaded={this.loaded} category={this.state.activeCats[0]} />
          <Carousel key={1} index={1} loaded={this.loaded} category={this.state.activeCats[1]} />
          <Carousel key={2} index={2} loaded={this.loaded} category={this.state.activeCats[2]} />
          <Carousel key={3} index={3} loaded={this.loaded} category={this.state.activeCats[3]} />
        </div>
      )
    }
  }
}
module.exports = FullPage