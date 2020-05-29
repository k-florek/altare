import React from "react"; // eslint-disable-line
import { handleDroppedFiles } from "./handleDroppedFiles";
import { P, Title, NextstrainTitle, CenterContent, Line, GitHub, StaphB } from './styles';
import { version } from "../../package.json";

class SplashContent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    document.addEventListener("dragover", (e) => {e.preventDefault();}, false);
    document.addEventListener("drop", (e) => {
      e.preventDefault();
      handleDroppedFiles(this.props.dispatch, e.dataTransfer.files);
    }, false);
  }
  datasetLink(path) {
    return (
      <div
        style={{color: "#5097BA", textDecoration: "none", cursor: "pointer", fontWeight: "400", fontSize: "94%"}}
        onClick={() => this.props.dispatch(this.props.changePage({path, push: true}))}
      >
        {path}
      </div>
    );
  }
  render() {
    return (
      <div className="static container">

        <CenterContent>
          <Title>altare</Title>
          <P>
            {`altare allows interactive exploration of phylogenomic datasets using auspice by simply dragging & dropping them here.`}
          </P>
        </CenterContent>

        <CenterContent>
            <Line/>
              <h2 style={{color: "#30353f"}}>{`Drag & Drop a dataset JSON on here to view`}</h2>
            <Line/>
        </CenterContent>


        <CenterContent>
          <P>
            {`altare is built from Nextstrain, an open-source project to harness the scientific and public health potential of pathogen genome data. `}
            {`For more information about how to run the bioinformatics tools which this tool can visualise please see `}
            <a href="https://nextstrain.org/docs/bioinformatics/introduction-to-augur">the Nextstrain documentation</a>.
            {` The JSON schema for datasets is defined `}
            <a href="https://github.com/nextstrain/augur/blob/master/augur/data/schema-export-v2.json">here</a>.
            {` For more information about the software which powers these visualisations please see `}
            <a href="https://nextstrain.github.io/auspice/">the Nextstrain/Auspice documentation</a>.
          </P>

          <Line/>

          <P>{`altare v${version} is built by `}<a href="https://github.com/k-florek">kelsey florek</a></P>
          <P>{"built using auspice developed by "}<a href="https://twitter.com/hamesjadfield">james hadfield</a></P>
          <NextstrainTitle/>
          <StaphB/>
          <GitHub/>
        </CenterContent>

      </div>
    );
  }
}

export default SplashContent;
