const License = () => {
  return (
    <div className="flex flex-col items-center h-screen w-full overflow-y-auto  border-4 border-t-18 border-grey-button">
      <div className="text-black p-8  bg-white pb-[100px] pt-[20px]  font-sans text-[18px] max-w-[calc(100vw-335px)]  mb-[100px]">
        <h1>KADE (Ken-Q Analysis Desktop Edition)</h1>
        <h2>Copyright (C) 2026 Shawn Banasick</h2>
        <div className="mt-6">
          Cite as: <br /> Banasick, S. (2019). KADE: A desktop application for Q methodology.
          Journal of Open Source Software, 4(36), 1360, https://doi.org/10.21105/joss.01360
        </div>
        <div className="mt-6 mb-6">
          This program is free software: you can redistribute it and/or modify it under the terms of
          the GNU General Public License as published by the Free Software Foundation, either
          version 3 of the License, or (at your option) any later version.
        </div>
        <hr />
        <div className="p-4 text-center">
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
        </div>
        <hr />
        <div className="mt-[35px]">
          <span>Built with:</span>
          <ul className="pl-4 leading-[1.5em] list-disc">
            <li>Electron (MIT license)</li>
            <li>Electron Builder (MIT license)</li>
            <li>React (MIT license)</li>
            <li>React Toastify (MIT license)</li>
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
          <div className="mt-[20px]">
            {`Principal components based on Javascript version by Dominik Dumaine, adapted 
              from Python version by Thomas Metcalf (GNU GPL license), derived from G.H. Golub 
              and C. Reinsch (1970) "Singular Value Decomposition and Least Squares Solutions." 
              Numerische Mathematik 14(5), pp. 403-420.`}
          </div>
          <div className="mt-[20px]">{`Varimax rotation based on Fortran 77 version in PQMethod (GNU GPL license) by 
                  Peter Schmolck, based on the QMethod program by John R. Atkinson.`}</div>
          <div className="mt-[20px]">
            Centroid factor extraction based on the computational steps described in Brown, Steven
            R. (1980). Political subjectivity. New Haven, CT: Yale University Press.
          </div>
        </div>
      </div>
    </div>
  );
};

export default License;
