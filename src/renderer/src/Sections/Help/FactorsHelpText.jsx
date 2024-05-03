import React from 'react';
import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import FactorImagePca from './helpImages/k3-pca-1.png';
import FactorImagePca2 from './helpImages/k3-pca2-scree.png';
import Centroid1 from './helpImages/k3-centroid-1.png';
import Centroid2 from './helpImages/k3-centroid-2-brown.png';
import Horst from './helpImages/k3-centroid-horst.png';
import Horst2 from './helpImages/k3-centroid-horst-2.png';
import horstHeywood from './helpImages/k3-centroid-horst-heywood.png';

const HelpSection = () => {
  return (
    <MainContent>
      <h2 id="factorssectionfaq">Factors Section FAQ:</h2>
      <ul>
        <li>
          <p>
            <strong>What is the maximum numbers of factors I can extract?</strong>
            <br /> 8 factors
          </p>
        </li>
        <li>
          <p>
            <strong>
              Can I change the factor extraction method without reloading my project data?
            </strong>
            <br /> Yes, click the <strong>{`"Reset Analysis"`}</strong> button.
            {`The current analysis data will be deleted and cannot be recovered. `}
          </p>
        </li>
      </ul>
      <br />
      <hr />
      <br />
      <p>
        Click the <strong>&quot;Principal Components&quot;</strong>button to automatically extract 8
        principal components.
      </p>
      <img src={FactorImagePca} width="1000px" alt="principal components" />
      <img src={FactorImagePca2} width="1000px" alt="principal components" />

      <p>
        Clicking on the <strong> &quot;Centroid Factors&quot;</strong> button will provide two
        options - <strong>&quot;Brown Centroid Factors&quot;</strong> or{' '}
        <strong>&quot;Horst 5.5 Centroid Factors&quot;</strong>.
      </p>
      <img src={Centroid1} width="1000px" alt="centroid factors" />
      <p>
        <strong>&quot;Brown Centroid Factors&quot;</strong> are calculated following the method
        described in Brown, Steven R. (1980) <i>Political Subjectivity</i>.
      </p>
      <img src={Centroid2} width="1000px" alt="brown centroid factors" />
      <p>
        <strong>&quot;Horst 5.5 Centroid Factors&quot;</strong> are calculated following the method
        described in Chapter 5, Section 5 of Horst, Paul (1965){' '}
        <i>Factor Analysis of Data Matrices</i>.
      </p>
      <br />
      <p>
        For the Horst method of extraction, the researcher can specify the number of factors to
        extract, or can allow the Horst algorithm determine the number of factors. The number of
        iterations used for the calcuation of the factors can be set by the researcher.
      </p>
      <img src={Horst} width="1000px" alt="horst centroid factors" />
      <p>
        When the Horst algorithm is used to determine the number of factors to extract, the
        researcher can specify both the number of iterations and the cutoff threshold for the
        calculations.
      </p>
      <img src={Horst2} width="1000px" alt="horst centroid factors" />
      <p>
        When extracting centroid factors, there are times when the communality for one or more
        participant Q sorts is larger than one. This is known as a{' '}
        <strong>&quot;Heywood Case&quot;</strong>, and it usually occurs when you have extracted too
        many or too few factors.
      </p>
      <br />
      <p>
        There are three options in KADE to deal with a Heywood Case. First, the analysis can be
        continued with the Heywood case values left unchanged. A second option is to re-select the
        number of factors to extract (recommended option). The last option is to proportionally
        adjust the factor loadings for that participant so that their communality equals 1.0.
      </p>
      <img src={horstHeywood} width="1000px" alt="horst centroid factors" />
    </MainContent>
  );
};

export default view(HelpSection);

const MainContent = styled.div`
  background-color: white;
  padding: 50px;
  user-select: all;
  overflow: auto;

  p {
    max-width: 950px;
  }
`;
