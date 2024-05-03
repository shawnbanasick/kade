import React, { Component } from "react";
import styled from "styled-components";
import i18n from "i18next";

class ErrorBoundary extends Component {
  state = {
    error: null,
    hasError: false,
    showError: false
  };

  componentDidCatch(e) {
    this.setState({
      hasError: true,
      error: e.message,
      errorMessage: e.stack
    });
  }

  render() {
    return this.state.hasError ? (
      <ErrorBoundaryDiv>
        <h1>{i18n.t("There was an unexpected error")}</h1>
        <ErrorText>
          {i18n.t("Please contact the developer")}
          <br /> ken.q.tools@gmail.com
          <br />
          {i18n.t(
            "In the top menu click View Force Reload to restart the application"
          )}
        </ErrorText>
        {!this.state.showError && (
          <button
            onClick={() =>
              this.setState({
                showError: true
              })
            }
          >
            Show error →
          </button>
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
      </ErrorBoundaryDiv>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;

const ErrorBoundaryDiv = styled.div`
  margin: 50px;
`;

const ErrorText = styled.div`
  font-size: 22px;
  line-height: 1.8em;
  margin-top: 15px;
  margin-bottom: 15px;
`;
