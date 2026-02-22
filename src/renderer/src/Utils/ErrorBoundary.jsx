import { Component } from 'react';
import i18n from 'i18next';

class ErrorBoundary extends Component {
  state = {
    error: null,
    hasError: false,
    showError: false,
  };

  componentDidCatch(e) {
    this.setState({
      hasError: true,
      error: e.message,
      errorMessage: e.stack,
    });
  }

  render() {
    return this.state.hasError ? (
      <div className="m-[50px]">
        <h1>{i18n.t('There was an unexpected error')}</h1>
        <div className="text-[22px] leading-[1.8em] mt-[15px] mb-[15px]">
          {i18n.t('Please contact the developer')}
          <br /> ken.q.tools@gmail.com
          <br />
          {i18n.t('In the top menu click View Force Reload to restart the application')}
        </div>
        <div className="bg-white [&_pre]:text-orange-500 [&_pre]:text-[16px] [&_pre]:mt-[15px] [&_pre]:mb-[15px]">
          {!this.state.showError && (
            <button onClick={() => this.setState({ showError: true })}>Show error →</button>
          )}
          {this.state.showError && (
            <pre>
              <code>{this.state.error}</code>
            </pre>
          )}
          <br />
          <br />
          <br />
          {this.state.showError && (
            <pre>
              <code>{this.state.errorMessage}</code>
            </pre>
          )}
        </div>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
