import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";

class License extends Component {
  render() {
    // console.log(JSON.stringify(state));
    return (
      <MainContent>
        <div />
        <div>
          <h1>KADE (Ken-Q Analysis Desktop Edition)</h1>
          <h2>Copyright (C) 2019 Shawn Banasick</h2>
          <span>
            This program is free software: you can redistribute it and/or modify
            it under the terms of the GNU General Public License as published by
            the Free Software Foundation, either version 3 of the License, or
            (at your option) any later version.
          </span>
          <hr />
          <span>
            THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
            'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
            LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
            FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
            COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
            INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
            BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
            LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
            CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
            LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
            ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGE.
          </span>
          <hr />
          <div style={{ marginTop: 35 }}>
            <span>Built with:</span>
            <ul>
              <li>Electron (MIT license)</li>
              <li>Electron Forge (MIT license)</li>
              <li>Electron Builder (MIT license)</li>
              <li>Electron-Splashscreen (MIT license)</li>
              <li>React (MIT license) </li>
              <li>React Easy State (MIT license)</li>
              <li>React Toastify (MIT license)</li>
              <li>Styled Components (MIT license)</li>
              <li>Semantic-UI-React (MIT license)</li>
              <li>D3.js (BSD license)</li>
              <li>ag-Grid (MIT license)</li>
              <li>Filesaver.js (MIT license)</li>
              <li>Lodash (MIT license)</li>
              <li>Papa Parse 4 (MIT license)</li>
              <li>Blob.js - Copyright (C) 2014 by Eli Grey</li>
              <li>SheetJS js-xlsx (Apache-2.0 license)</li>
            </ul>
            <span>
              {`Principal components based on Python version by Thomas Metcalf
              (GNU GPL license), adapted from G.H. Golub and C. Reinsch (1970) "Singular
              Value Decomposition and Least Squares Solutions." Numerische
              Mathematik 14(5), pp. 403-420.`}
            </span>
            <br />
            <br />
            <span>{`Varimax rotation based on Fortran 77 version in PQMethod (GNU GPL license) by Peter Schmolck and John R. Atkinson.`}</span>
          </div>
        </div>
      </MainContent>
    );
  }
}

export default view(License);

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 50px 700px 1fr;
  justify-items: center;
  align-items: center;
  background-color: white;
  padding-bottom: 50px;
  padding-top: 50px;
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  width: calc(100vw - 123px);
  box-sizing: border-box;
  height: calc(100vh - 22px);
  overflow: auto;
  user-select: none;
`;
