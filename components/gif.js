var React = require('react')
class GIF extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
        <div>
          <img className="gif" src='https://reactiongifs.me/wp-content/uploads/2013/11/seinfeld-happy-dance-Jerry-seinfeld-Elaine-George-Costanza.gif'></img>
        </div>
      );
    }
  }
module.exports = GIF