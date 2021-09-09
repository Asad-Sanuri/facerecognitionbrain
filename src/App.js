import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from "react-tsparticles";
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import particlesOptions from "./particles.json";
import './App.css';

const initialState = {
  input: '', 
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
    constructor(){
        super();
        this.state = initialState;
        }
    
    loadUser = (data) => {
        this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
        }})
    }
    
    calculateFaceLocation = (data) => {
        for (let i=0; i<data.outputs[0].data.regions.length; i++){
      //const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        let clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
        leftCol: clarifaiFace.left_col[i] * width,
        topRow: clarifaiFace.top_row[i] * height,
        rightCol: width - (clarifaiFace.right_col[i] * width),
        bottomRow: height - (clarifaiFace.bottom_row[i] * height),
        }}
    }
    
    displayFaceBox = (box) => {
        this.setState({box: box});
    }
    
    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input})
        fetch('https://powerful-waters-98957.herokuapp.com/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input          
          })
        })      
      .then(response => response.json())  
      .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('https://powerful-waters-98957.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))        
      })
      .catch(err => console.log(err));
  }  
    
    onRouteChange = (route) => {
        if (route === 'signout') {
        this.setState(initialState)
        } else if (route === 'home') {
        this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }

    render(){
        const { isSignedIn, imageUrl, route, box } = this.state;
        return (
            <div className="App">
                <Particles options={particlesOptions}/>
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                { route === 'home'
            ? <div>
                <Logo />
                <Rank
                    name={this.state.user.name}
                    entries={this.state.user.entries}
                />
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}                    
                />
                <FaceRecognition box={box} imageUrl={imageUrl} />
                </div>
            : (
                route === 'signin'
                ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                )
            }
      </div>
    );
  }
}                          
        
export default App;
