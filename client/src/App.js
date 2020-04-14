import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      //listings: []
    };
  }


  // componentDidMount() {
  //   this.fetchData();
  // }


  render() {
    return (

      <div>
        <h1>Staycation Welcomes you!</h1>
        <p>Your dream luxurious vacation is just a click away.</p>


        <div className="App">
          <div className="App__Aside">
            <div className="App__Form">
              <div className="PageSwitcher">
                <h3>Join the club</h3>
                <a href="membership" className="PageSwitcher__item">Sign In</a>

                <a href="membership" className="PageSwitcher__item PageSwitcher__Item Active">Sign Up</a>

                <div className="FormTitle">
                  <a href="membership" className="FormTittle__Link">Sign In</a> or
                  <a href="membership"
                    className="FormTittle__Link Form__LINK__Active">Sign Up</a>

                </div>
              </div>
              <div>

              </div>
            </div>
          </div>
        </div>
      </div>


    );
  }
}


export default App;