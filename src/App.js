import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router, Routes, Link, Route, useHistory ,useLocation } from 'react-router-dom';
import Result from './Comparision';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<ComparisionForm />}/>
        <Route exact path="/comparision/:id" element={<Result />} />
      </Routes>
    </div>
    </Router>
  );


}
class ComparisionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {as1:'Aries',
                  as2:'Aries',
                  age1:'',
                  age2:'',
                  hairColor1:'',
                  hairColor2:'',
                  name1: '',
                  name2: '',
                  textarea: '',
                  generatedUrl:'',
                  disabled: true,
                  submitDisabled: true,
                  location: window.location.host
                };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.post = this.post.bind(this);

  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleSubmit(event) {
      this.setState({disabled: false});
      var ageString = ''
      var hairString = ''
      if (this.state.age1 != '' && this.state.age2 != '') {
        var age1 = parseInt(this.state.age1);
        var age2 = parseInt(this.state.age2);

        ageString += this.state.as2 + "'s have a tendency to cherish and connect with " + this.state.as1 +"'s that are between the ages of " + (age1 - 2) +" - " + (age1+ 2)+". "
        ageString += this.state.as1 + "'s are most compatible with " + this.state.as2 +"'s that are between the ages of " + (age2 - 2) +" - " + (age2 + 1)+"."

      } else if (this.state.age1 != '' && this.state.age2 == '') {
        var age1 = parseInt(this.state.age1);
        ageString += this.state.as2 + "'s have a tendency to cherish and connect with " + this.state.as1 +"'s that are between the ages of " + (age1 - 2) +" - " + (age1+ 2)+"."
      } else if (this.state.age1 == '' && this.state.age2 != '') {
        var age2 = parseInt(this.state.age2);
        ageString += this.state.as1 + "'s have a tendency to cherish and connect with " + this.state.as2 +"'s that are between the ages of " + (age2 - 2) +" - " + (age2+ 2)+"."
      }
      ageString += " This is because their Chinese Lunar Year signs are universally aligned. "

      hairString += " Research shows that certain astrological signs are attracted various hair colors. "
      if (this.state.hairColor1 != '' && this.state.hairColor2 != '') { 
        hairString += this.state.as1 + "'s tend like " + this.state.hairColor2 + " hair and " + this.state.as2 + " more often like " + this.state.hairColor1 + " hair."
      }
      else if (this.state.hairColor1 != '' && this.state.hairColor2 == '') {
        hairString += this.state.as2 + "'s tend like " + this.state.his.state.hairColor1 + " hair.";
      }
      else if (this.state.hairColor1 == '' && this.state.hairColor2 != '') {
        hairString += this.state.as1 + "'s tend like " + this.state.his.state.hairColor2 + " hair.";
      }

      this.setState({textarea: "Both " + this.state.as1 + " and "+this.state.as2 + " are extremely compatible. " + ageString + hairString});
      event.preventDefault();
  }
  post(event) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "as1": this.state.as1,
        "as2": this.state.as2,
        "description": this.state.textarea

   })
  };
  fetch('https://84dvvklokj.execute-api.us-east-1.amazonaws.com/Production/compatibility', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({generatedUrl: data, submitDisabled:false}));
      event.preventDefault();


  }
  

  render() {
    return (
      <div className="container">
      <div>Welcome to Astrology Compatability creator!</div>
      <form onSubmit={this.handleSubmit}>
        <p>Your information:</p>
        <div className="row"> 
            <div className="col">
            <label>
            Astrological Sign: 
            </label>
            </div>
            <div className="col">

            <select value={this.state.as1} name="as1" onChange={this.handleChange}>
              <option value="Aries">Aries</option>
              <option value="Taurus">Taurus</option>
              <option value="Gemini">Gemini</option>
              <option value="Cancer">Cancer</option>
              <option value="Leo">Leo</option>
              <option value="Virgo">Virgo</option>
              <option value="Libra">Libra</option>
              <option value="Scorpio">Scorpio</option>
              <option value="Sagittarius">Sagittarius</option>
              <option value="Capricorn">Capricorn</option>
              <option value="Aquarius">Aquarius</option>
              <option value="Pisces">Pisces</option>
            </select> 
            </div>
          </div>
            <div className="row mt-2"> 
            <div className="col">
            <label>
            Age:     </label>
            </div>
            <div className="col">
              <input type="number" min="13" max="100" value={this.state.age1} name="age1"  onChange={this.handleChange} />
          </div>
          </div>
          <div className="row mt-2"> 
            <div className="col">
            <label>
            Hair Color:</label>
            </div>           
             <div className="col">
             <select value={this.state.hairColor1} name="hairColor1" onChange={this.handleChange}>
             <option disabled value = ''></option>
             <option value="brown">Brown</option>
              <option value="blonde">Blonde</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="grey">Grey</option>
              <option value="no">Bald</option>
            </select>
            </div>
          </div>
          <div className="row"> 
          <div className="col-12">
        <p>Their information:</p>
          </div>
        </div>
        <div className="row"> 
            <div className="col">

            <label>
            Astrological Sign:
            </label>
            </div>
            <div className="col">
            <select value={this.state.as2} name="as2" onChange={this.handleChange}>
            <option value="Aries">Aries</option>
              <option value="Taurus">Taurus</option>
              <option value="Gemini">Gemini</option>
              <option value="Cancer">Cancer</option>
              <option value="Leo">Leo</option>
              <option value="Virgo">Virgo</option>
              <option value="Libra">Libra</option>
              <option value="Scorpio">Scorpio</option>
              <option value="Sagittarius">Sagittarius</option>
              <option value="Capricorn">Capricorn</option>
              <option value="Aquarius">Aquarius</option>
              <option value="Pisces">Pisces</option>
            </select>
            </div>
            </div>
          <div className="row mt-2"> 
            <div className="col">
            <label>
            Age:</label>
            </div>
            <div className="col">
            <input type="number" min="13" max="100" value={this.state.age2} name="age2"  onChange={this.handleChange} />
            </div>
            </div>
            
            <div className="row mt-2"> 
            <div className="col">
            <label>
            Hair Color:</label>
            </div>
            <div className="col">
            <select value={this.state.hairColor2} name="hairColor2" onChange={this.handleChange}>
            <option disabled value = ''></option>
            <option value="brown">Brown</option>
              <option value="blonde">Blonde</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="grey">Grey</option>
              <option value="no">Bald</option>
            </select>
            </div>
            </div>
            <div className="row"> 
            <div className="col-3 mt-5 offset-3 justify-content-center">
              <input value ="Generate Comparision" type="submit" />
        </div>
        </div>

      </form>
      <br/>
      <div className='row'>
      <div className='col-9 offset-0'>

      <form onSubmit={this.post}>
        <label>Results:</label>
        <br/>
        <br/>
        <div className='row'>
          <div className='col-12'>
        <textarea rows="10" style={{width: "100%"}} value={this.state.textarea}  name="textarea" placeholder='Generated comparisions will appear here...' onChange={this.handleChange} />
       </div>
       </div>
        <br/>
        <br/>
        <input value ="Submit" type="submit" disabled={this.state.disabled}/>
      </form>
      <p>
        <label hidden={this.state.submitDisabled}> <Link to={'/comparision/'+this.state.generatedUrl}>{this.state.location}/comparision/{this.state.generatedUrl}</Link></label> 
      </p>
      </div>
      </div>
      </div>
    );
  }
}

export default App;
