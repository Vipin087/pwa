import React from 'react';

export default class App extends React.Component {
  state = {
    otp: '',
  };

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>0');
    if ('OTPCredential' in window) {
      console.log('>>>>>>>>>>>>>>>1');
      const ac = new AbortController();

      console.log('>>>>>>>>>>>>>>>2', ac);
      navigator.credentials
        .get({
          otp: { transport: ['sms'] },
          signal: ac.signal,
        })
        .then((otp) => {
          console.log('>>>>>>>>>>>>>>>3');
          this.setState({ otp: otp.code });
          ac.abort();
        })
        .catch((err) => {
          console.log('>>>>>>>>>>>>>>>4',err);
          ac.abort();
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Your OTP is: {this.state.otp}</h2>
      </div>
    );
  }
}
