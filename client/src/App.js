import React from 'react';
import './App.css';
import ImageSelectPreview from 'react-image-select-pv';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      listings: []
    };
  }


  //componentDidMount() {
  //   this.fetchData();
  // }


  render() {
    return (
      <div>

        <div>
          <header className="App-header">
            {/* <ImageSelectPreview/> */}
            {/* <img src="./client/IMAGES/AJO_3220.JPG"></img> */}
            <h1>Staycation Welcomes you!</h1>
            <p>Your dream luxurious vacation is just a click away.</p>
          </header>
        </div>
        <div>
          <form>
            <h3>Join the club</h3>

            <button>Sign In</button>
          </form>
        </div>


      </div>
    );
  }
}


export default App;