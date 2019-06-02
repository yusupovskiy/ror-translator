import React from 'react';

export default class Translator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dirs: [],
      langs: {},
    };
  } 

  componentDidMount() {
    fetch('/langs.json?ui=en')  
      .then(response => {  
          if (response.status !== 200) {  
            console.log('Looks like there was a problem. Status Code: ' +  
              response.status);  
            return;  
          }
          response.json().then(data => {
            this.setState({
              dirs: data.dirs,
              langs: data.langs,
            })
          });  
      })  
      .catch(err => {  
        console.log('Fetch Error :-S', err);  
      });
  }

  render() {
    return (
      <div className="form">
        <div className="left-form">
          <SelectLangs langs={this.state.langs} tabindex="1" />
          <div 
            className="from-input input" 
            tabindex="2" 
            autocorrect="off"
            autocomplete="off" 
            autocapitalize="off" 
            spellcheck="false" 
            contenteditable="true"
            data-text="Введите текст"
          >
          </div>
        </div>

        <div className="rigth-form">
          <SelectLangs langs={this.state.langs} tabindex="3" />
          <div className="to-input input" tabindex="4" autocorrect="off" autocomplete="off" autocapitalize="off" spellcheck="false">Привет</div>
        </div>
      </div>
    );
  }
}


function SelectLangs(props) {
  const { langs, ...selectArg } = props;
  return (
    <select className="select" {...selectArg} >
      {Object.entries(langs).map(([key, val]) => (
          <option value={key}>{val}</option>
      ))}
    </select>
  );
}