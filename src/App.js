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
  boxes: [{}],  
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
        this.setState({
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        }});
    }       
                                                                                       
    onInputChange = (event) => {
      if (event.target.files) {
        const files = Array.from(event.target.files);
        const formData = new FormData();
        files.forEach((file, i) => {
          formData.append(i, file)
        })
        fetch(`https://face--brain-api.herokuapp.com/image-upload`, {
          method: 'POST',
          body: formData
        })
          .then(res => res.json())
          .then(images => {
            this.setState({ input: images[0].url});
          })
      } else {
        this.setState({ input: event.target.value});
      }      
      this.setState({ box: [{}] });
      }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input})
        fetch('https://face--brain-api.herokuapp.com/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input          
          })
        })      
      .then(response => response.json())  
      .then(response => {
        console.log('hi, this is your response', response)
        if (response) {
          fetch('https://face--brain-api.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {if(this.state.input !==''){ 
              this.setState(Object.assign(this.state.user, {entries: count}))
            }})            
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))        
      })
      .catch(err => console.log(err));
  }  
    
    calculateFaceLocation = (data) => {                          
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return data.outputs[0].data.regions.map(face => {
        const clarifaiFace = face.region_info.bounding_box;               
        return{    
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)                  
                    }
                  });                                                                             
                }   
    
    displayFaceBox = (boxes) => { this.setState({boxes: boxes}); }      
              
    onRouteChange = (route) => {
        if (route === 'signout') {
        this.setState(initialState)
        } else if (route === 'home') {
        this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }

    render(){
        const { isSignedIn, imageUrl, route, boxes, input} = this.state;
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
                    input = {input}
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}                    
                />
                <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
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
