import React from 'react';
import queryString from 'query-string';

export default class App extends React.Component {
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
    this.locale = 'ru';
  }

  componentDidMount() {
    this.request(`/langs.json?ui=${this.locale}`, ({ dirs, langs }) => this.setState({ dirs, langs }));

    if(this.state.text.length > 0) {
      this.request(`/translate.json${window.location.search}`, ({ text }) => this.setState({ result: text }) );
    }
  }

  parseParamsUrl = obj => `?${queryString.stringify(obj)}`;

  getTranslate = ev => {
    const { value } = ev.target;

    if(this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.requestTranslate({ text: value });
    }, 800);

    if(value.length === 0)
      this.setState({ text: value, result: '' });
    else if(value !== this.state.text)
      this.setState({ text: value });

    this.checkSetLanguageFrom(value);
  };

  checkSetLanguageFrom = value => {
    this.request(`/detect.json?text=${value}`, ({ lang }) => {
      if(this.state.from !== lang) {
        const params = this.parseParamsUrl({ 
          text: this.state.text,
          from: lang,
          to: this.state.to
        });
        this.setState({ from: lang });
        history.replaceState(null, null, params);
      }
    });
  };

  setLanguageFrom = ev => this.requestTranslate({ from: ev.target.value });

  setLanguageTo = ev => this.requestTranslate({ to: ev.target.value });

  requestTranslate = args => {
    const key = Object.keys(args)[0];
    const params = this.parseParamsUrl({ 
      text: args.text || this.state.text, 
      from: args.from || this.state.from, 
      to: args.to || this.state.to
    });
    this.request(`/translate.json${params}`, ({ text }) => {
      this.setState({ [key]: args[key], result: text });
      history.replaceState(null, null, params);
    });
  };

  request = (uri, callback) => {
    fetch(uri)  
      .then(response => {  
          if(response.status !== 200) {  
            console.log('Looks like there was a problem. Status Code: ' +  
              response.status);
          } else {
            response.json().then(callback);  
          }
      })  
      .catch(err => {
        console.log('Fetch Error: ', err);  
      });
  };

  render() {
    return (
      <form className="form">
        <div className="left-form">
          <SelectLangs
            langs={this.state.langs}
            value={this.state.from}
            onChange={this.setLanguageFrom}
          />
          <textarea
            className="from-input input"
            placeholder="Введите текст"
            value={this.state.text}
            onChange={this.getTranslate}
          >
          </textarea>
        </div>

        <div className="rigth-form">
          <SelectLangs
            langs={this.state.langs}
            value={this.state.to}
            onChange={this.setLanguageTo}
          />
          <textarea
            className="to-input input"
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