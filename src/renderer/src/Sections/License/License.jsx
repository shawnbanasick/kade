import React from 'react';
import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';

const License = () => {
  return (
    <MainContent>
      <div />
      <div>
        <h1>KADE (Ken-Q Analysis Desktop Edition)</h1>
        <h2>Copyright (C) 2024 Shawn Banasick</h2>
        <SelectableText>
          Cite as: <br /> Banasick, S. (2019). KADE: A desktop application for Q methodology.
          Journal of Open Source Software, 4(36), 1360, https://doi.org/10.21105/joss.01360
        </SelectableText>
        <br />
        <span>
          This program is free software: you can redistribute it and/or modify it under the terms of
          the GNU General Public License as published by the Free Software Foundation, either
          version 3 of the License, or (at your option) any later version.
        </span>
        <hr />
        <span>
          {`THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
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
            POSSIBILITY OF SUCH DAMAGE.`}
        </span>
        <hr />
        <div style={{ marginTop: 35 }}>
          <span>Built with:</span>
          <ul>
            <li>Electron (MIT license)</li>
            <li>Electron Builder (MIT license)</li>
            <li>React (MIT license) </li>
            <li>React Easy State (MIT license)</li>
            <li>React Toastify (MIT license)</li>
            <li>Styled Components (MIT license)</li>
            <li>Semantic-UI-React (MIT license)</li>
            <li>D3.js (BSD license)</li>
            <li>ag-Grid (MIT license)</li>
            <li>react-i18next (MIT license)</li>
            <li>Filesaver.js (MIT license)</li>
            <li>Lodash (MIT license)</li>
            <li>Papa Parse 4 (MIT license)</li>
            <li>Blob.js - Copyright (C) 2014 by Eli Grey</li>
            <li>SheetJS js-xlsx (Apache-2.0 license)</li>
            <li>JSZip (GPLv3 license)</li>
            <li>DOCX (MIT license)</li>
          </ul>
          <span>
            {`Principal components based on Javascript version by Dominik Dumaine, adapted 
              from Python version by Thomas Metcalf (GNU GPL license), derived from G.H. Golub 
              and C. Reinsch (1970) "Singular Value Decomposition and Least Squares Solutions." 
              Numerische Mathematik 14(5), pp. 403-420.`}
          </span>
          <br />
          <br />
          <span>{`Varimax rotation based on Fortran 77 version in PQMethod (GNU GPL license) by 
                  Peter Schmolck, based on the QMethod program by John R. Atkinson.`}</span>
          <br />
          <br />
          <span>
            Centroid factor extraction based on the computational steps described in Brown, Steven
            R. (1980). Political subjectivity. New Haven, CT: Yale University Press.
          </span>
          <br />
          <br />
        </div>
      </div>
    </MainContent>
  );
};

export default view(License);

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 50px 700px 1fr;
  justify-items: center;
  align-items: center;
  box-sizing: border-box;
  background-color: white;
  padding-bottom: 100px;
  padding-top: 50px;
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  width: calc(100vw - 135px);
  height: calc(100vh);
  overflow: auto;
`;

const SelectableText = styled.h3`
  user-select: text;
`;
