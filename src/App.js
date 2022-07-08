import React from 'react';

function App() {
  return (
    <div>Welcome to Astrology Compatability creator! <ComparisionForm /></div>
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
                  disabled: true};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.post = this.post.bind(this);

  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleSubmit(event) {
    alert(this.state.as1 + this.state.name1 +this.state.age1 +this.state.hairColor1 +
      this.state.as2 + this.state.name2 +this.state.age2 +this.state.hairColor2);
      this.setState({disabled: false});
      event.preventDefault();
  }
  post(event) {
    console.log("test")

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "as1": this.state.as1,
        "as2": this.state.as2,
        "description": this.state.textarea

   })
  };
  console.log("test")
  fetch('https://84dvvklokj.execute-api.us-east-1.amazonaws.com/Production/compatibility', requestOptions)
      .then(response => response.json())
      .then(data => this.state.generatedUrl = data);
      event.preventDefault();


  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <p>Your information:</p>
        <ul>
          <li>
            <label>
            Astrological Sign:<select value={this.state.as1} name="as1" onChange={this.handleChange}>
              <option value="Aries">Aries</option>
              <option value="Taurus">Taurus</option>
              <option selected value="Gemini">Gemini</option>
              <option value="Cancer">Cancer</option>
              <option value="Leo">Leo</option>
              <option value="Virgo">Virgo</option>
              <option selected value="Libra">Libra</option>
              <option value="Scorpio">Scorpio</option>
              <option value="Sagittarius">Sagittarius</option>
              <option value="Capricorn">Capricorn</option>
              <option value="Aquarius">Aquarius</option>
              <option selected value="Pisces">Pisces</option>
            </select> 
            </label>
            
          </li>
          <li>
            <label>
            Name:<input type="text"  value={this.state.name1} name="name1"  onChange={this.handleChange} />
            </label>
          </li>
          <li>
            <label>
            Age:<input type="text"  value={this.state.age1} name="age1"  onChange={this.handleChange} />
            </label>
          </li>
          <li>
            <label>
            Hair Color:<input type="text"  value={this.state.hairColor1} name="hairColor1"  onChange={this.handleChange} />
            </label>
          </li>
        </ul>
        <p>Their information:</p>
        <ul>
          <li>
            <label>
            Astrological Sign:<select value={this.state.as2} name="as2" onChange={this.handleChange}>
            <option value="Aries">Aries</option>
              <option value="Taurus">Taurus</option>
              <option selected value="Gemini">Gemini</option>
              <option value="Cancer">Cancer</option>
              <option value="Leo">Leo</option>
              <option value="Virgo">Virgo</option>
              <option selected value="Libra">Libra</option>
              <option value="Scorpio">Scorpio</option>
              <option value="Sagittarius">Sagittarius</option>
              <option value="Capricorn">Capricorn</option>
              <option value="Aquarius">Aquarius</option>
              <option selected value="Pisces">Pisces</option>
            </select>            </label>
          </li>
          <li>
            <label>
            Name:<input type="text" value={this.state.name2} name="name2" onChange={this.handleChange} />
            </label>
          </li>
          <li>
            <label>
            Age:<input type="text"  value={this.state.age2} name="age2"  onChange={this.handleChange} />
            </label>
          </li>
          <li>
            <label>
            Hair Color:<input type="text"  value={this.state.hairColor2} name="hairColor2"  onChange={this.handleChange} />
            </label>
          </li>
        </ul>
        <input value ="Generate Comparision" type="submit" />
      </form>
      <br/>
      <form onSubmit={this.post}>
        <label>Results:</label>
        <br/>
        <br/>
        <textarea value={this.state.textarea}  name="textarea" placeholder='Generated comparisions will appear here...' onChange={this.handleChange} />
        <br/>
        <br/>
        <input value ="Submit" type="submit" disabled={this.state.disabled}/>
      </form>
      <label> {this.state.generatedUrl}  </label>
      </div>
    );
  }
}

export default App;
