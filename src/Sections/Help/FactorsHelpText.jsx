import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";

const HelpSection = () => {
  const FactorImage = React.lazy(() => import("./helpImages/FactorsImage"));
  const FactorImage2 = React.lazy(() => import("./helpImages/FactorsImage2"));
  const HeywoodWarningImage = React.lazy(() =>
    import("./helpImages/factorHeywoodWarningMessage")
  );
  const FactorCentroidSelection = React.lazy(() =>
    import("./helpImages/factorCentroidSelection")
  );
  const BrownCentroidsImage = React.lazy(() =>
    import("./helpImages/BrownCentroidsImage")
  );
  const Horst1Image = React.lazy(() => import("./helpImages/Horst1Image"));
  const Horst2Image = React.lazy(() => import("./helpImages/Horst2Image"));

  return (
    <MainContent>
      <h2 id="factorssectionfaq">Factors Section FAQ:</h2>
      <ul>
        <li>
          <p>
            <strong>
              What is the maximum numbers of factors I can extract?
            </strong>
            <br /> 8 factors
          </p>
        </li>
        <li>
          <p>
            <strong>
              Can I change the factor extraction method without reloading my
              project data?
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
        Click the <strong>&quot;Principal Components&quot;</strong>button to
        automatically extract 8 principal components.
      </p>
      <FactorImage />
      <FactorImage2 />
      <p>
        Clicking on the <strong> &quot;Centroid Factors&quot;</strong> button
        will provide two options -{" "}
        <strong>&quot;Brown Centroid Factors&quot;</strong> or{" "}
        <strong>&quot;Horst 5.5 Centroid Factors&quot;</strong>.
      </p>
      <FactorCentroidSelection />
      <p>
        <strong>&quot;Brown Centroid Factors&quot;</strong> are calculated
        following the method described in Brown, Steven R. (1980){" "}
        <i>Political Subjectivity</i>.
      </p>
      <BrownCentroidsImage />
      <p>
        <strong>&quot;Horst 5.5 Centroid Factors&quot;</strong> are calculated
        following the method described in Chapter 5, Section 5 of Horst, Paul
        (1965) <i>Factor Analysis of Data Matrices</i>.
      </p>
      <br />
      <p>
        For the Horst method of extraction, the researcher can specify the
        number of factors to extract, or can allow the Horst algorithm determine
        the number of factors. The number of iterations used for the calcuation
        of the factors can be set by the researcher.
      </p>
      <Horst1Image />
      <p>
        When the Horst algorithm is used to determine the number of factors to
        extract, the researcher can specify both the number of iterations and
        the cutoff threshold for the calculations.
      </p>
      <Horst2Image />
      <p>
        When extracting centroid factors, there are times when the communality
        for one or more participant Q sorts is larger than one. This is known as
        a <strong>&quot;Heywood Case&quot;</strong>, and it usually occurs when
        you have extracted too many or too few factors.
      </p>
      <br />
      <p>
        There are three options in KADE to deal with a Heywood Case. First, the
        analysis can be continued with the Heywood case values left unchanged. A
        second option is to re-select the number of factors to extract
        (recommended option). The last option is to proportionally adjust the
        factor loadings for that participant so that their communality equals
        1.0.
      </p>
      <HeywoodWarningImage />
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
