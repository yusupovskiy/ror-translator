import React from 'react';
import queryString from 'query-string';

export default class Translator extends React.Component {
  constructor(props) {
    super(props);
    const params = queryString.parse(window.location.search);
    this.state = {
      dirs: [],
      langs: {},
      text: params.text || '',
      from: params.from || 'en',
      to: params.to || 'ru',
      result: '',
    };
  } 

  componentDidMount() {
    this.request(`/langs.json?ui=en`, data => {
      this.setState({
        dirs: data.dirs,
        langs: data.langs,
      })
    });
    if(this.state.text.length > 0) {
      this.request(`/translate.json${window.location.search}`, data => {
        this.setState({ result: data.text });
      });
    }
  }

  request = (uri, callback) => {
    fetch(uri)  
      .then(response => {  
          if (response.status !== 200) {  
            console.log('Looks like there was a problem. Status Code: ' +  
              response.status);  
            return;  
          }
          response.json().then(callback);  
      })  
      .catch(err => {
        console.log('Fetch Error :-S', err);  
      });
  };

  parseParams = obj => `?${queryString.stringify(obj)}`;

  handleChange = ev => {
    const value = ev.target.value;

    if(this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.requestTranslate({ text: value })
    }, 400);

    if(value.length === 0) {
      this.setState({ text: value, result: '' });
    } else if(value !== this.state.text) {
      this.setState({ text: value });
    }
  };

  handleSelectFrom = ev => {
    this.requestTranslate({ from: ev.target.value })
  };

  handleSelectTo = ev => {
    this.requestTranslate({ to: ev.target.value })
  };

  requestTranslate = args => {
    const key = Object.keys(args)[0];
    const params = this.parseParams({ 
      text: args.text || this.state.text, 
      from: args.from || this.state.from, 
      to: args.to || this.state.to
    });
    this.request(`/translate.json${params}`, data => {
      this.setState({ [key]: args[key], result: data.text });
      history.replaceState(null, null, params);
    });
  };

  render() {
    return (
      <form className="form">
        <div className="left-form">
          <SelectLangs 
            langs={this.state.langs} 
            tabindex="1" 
            value={this.state.from} 
            onChange={this.handleSelectFrom}
          />
          <textarea 
            className="from-input input" 
            tabindex="2" 
            autocorrect="off"
            autocomplete="off" 
            autocapitalize="off" 
            spellcheck="false"
            placeholder="Введите текст"
            value={this.state.text}
            onChange={this.handleChange}
          >
          </textarea>
        </div>

        <div className="rigth-form">
          <SelectLangs 
            langs={this.state.langs} 
            tabindex="3"
            value={this.state.to} 
            onChange={this.handleSelectTo}
          />
          <textarea 
            className="to-input input" 
            tabindex="4" 
            autocorrect="off"
            autocomplete="off" 
            autocapitalize="off" 
            spellcheck="false"
            value={this.state.result}
            placeholder="Тут будет перевод"
          >
          </textarea>
        </div>
      </form>
    );
  }
}

function SelectLangs(props) {
  const { langs, ...selectArg } = props;
  return (
    <select className="select" {...selectArg} >
      {Object.entries(langs).map(([key, val]) => (
          <option key={key} value={key}>{val}</option>
      ))}
    </select>
  );
}