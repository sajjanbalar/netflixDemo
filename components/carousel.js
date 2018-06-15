var React = require('react')
var LazyImage = require('./lazyImage')

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.goLeft = this.goLeft.bind(this)
    this.goRight = this.goRight.bind(this)
    this.loaded = this.loaded.bind(this)
    this.showArrows = this.showArrows.bind(this)
    this.hideArrows = this.hideArrows.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
    this.state = {
      images : [], 
      visible: false,
      page : 0
    }
  }
  async componentDidMount(){
    let url = 'https://api.giphy.com/v1/gifs/search?api_key=5isc5UkJiABGgxjRdSDytEMvfZQCfqJ4&q='+this.props.category+'&limit=25&offset=0&rating=G&lang=en'
    let response = await fetch(url)
    let responseJSON = await response.json()
    let images = responseJSON.data
    let first = JSON.parse(JSON.stringify(images[0]))
    first.id = 'first'
    let last = JSON.parse(JSON.stringify(images[images.length-1]))
    last.id = 'last'
    images.push(first)
    images.unshift(last)
    this.setState({
      images : images,
      page : 0,
      loaded : 0,
      showArrows : false,
      marginLeft : -100
    })
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions()
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions(){
    let maxPage = Math.ceil((30 * 204) / window.innerWidth)
    let imagesPerPage = Math.ceil(30/maxPage)
    let index = Math.floor(Math.abs(this.state.marginLeft)/204) 
    let page = Math.floor(index/(imagesPerPage-1))
    if(page>=maxPage){
      page = maxPage - 1
    }
    if(this.state.maxPage!=maxPage || this.state.imagesPerPage!=imagesPerPage){
      this.setState({
        maxPage : maxPage,
        imagesPerPage : imagesPerPage,
        page : page,
        marginLeft : -100 - (page * ((imagesPerPage-1) * 204))
      })
    }
  }
  loaded(){
    let loaded = this.state.loaded
    this.setState({
      loaded : loaded + 1
    })
    if(loaded>=4){
       this.props.loaded(this.props.index)
    }
  }
  goRight(){
    let page = this.state.page
    let marginLeft = this.state.marginLeft
    if(page<(this.state.maxPage-1)){
      this.setState({
        page: page + 1,
        marginLeft : marginLeft - ((this.state.imagesPerPage-1) * 204)
      })
    }else{
      this.setState({
        page: 0,
        marginLeft : -100
      })
    }
  }
  goLeft(){
     //number of images * width occupied by each one / total width available 
    let page = this.state.page
    let marginLeft = this.state.marginLeft
    if(page>0){
      this.setState({
        page : page - 1,
        marginLeft : marginLeft + ((this.state.imagesPerPage-1) * 204) 
      })
    }else{
      this.setState({
        page : this.state.maxPage-1,
        marginLeft : marginLeft - ((this.state.maxPage-1) * ((this.state.imagesPerPage-1) * 204))
      })
    }
  }
  showArrows(){
    this.setState({
      showArrows : true
    })
  }
  hideArrows(){
    this.setState({
      showArrows : false
    })
  }
  render() {
    if(this.state.images.length){
      let rightArrow = 'hidden'
      let leftArrow = 'hidden'
      if(this.state.showArrows){
        rightArrow = 'rightArrow'
        leftArrow = 'leftArrow'
      }
      let lazy = true
      if(this.props.index<4){
        lazy = false
      }
      if(this.state.loaded>=6){
        return (
          <div className="carousel">
            <p className="categoryTitle">{this.props.category}</p>
              <div onMouseOut={this.hideArrows} onMouseOver={this.showArrows}>
                  {this.state.showArrows && <PageIndicator maxPage={this.state.maxPage} page={this.state.page} />}
                  <img onClick={this.goLeft} className={leftArrow} src='../images/leftArrow.png' />  
                  <div id="carousel" style={{marginLeft:this.state.marginLeft}} className='carouselImages' onMouseOut={this.hideArrows} onMouseOver={this.showArrows}>
                    { this.state.images.map((image,i)=>{
                      if(i<=6){
                        lazy = false
                      }
                      return ( 
                        <LazyImage  lazy={lazy} key={image.id} className="gif" large={image.images.preview_gif.url} small={image.images.fixed_height_still.url}/>
                      )
                    })}
                  </div>
                  <img onClick={this.goRight} className={rightArrow} src='../images/rightArrow.png' />
              </div>
          </div>
        );
      }else{
        return(
          <div className="carousel">
            <p className="categoryTitle">{this.props.category}</p>
            <div id="carousel" className='carouselImages'>        
              { this.state.images.map((image,i)=>{
                return <img key={image.id} src='https://media.giphy.com/media/KxepQjR5y0dDq/giphy.gif' className="loading" />
              })}
              {this.state.images.map((image,i)=>{
                return <img key={image.id} onLoad={this.loaded} className="hidden" src={image.images.fixed_height_still.url}/>
              })}
            </div>
          </div>
        )
      }
    }else{
      return null 
    }
  }
}

function PageIndicator(props){
  let pages = []
  for(let i=0;i<props.maxPage;i++){
    pages.push(i)
  }
  return(
    <div className='pageIndicator'>
      {pages.map((i)=>{
        if(i==props.page){
          return <span key={i} className='activePageDash pageDash'>-</span>
        }else{
          return <span key={i} className='pageDash'>-</span>
        }
      })}
    </div>
  )
}
module.exports = Carousel