[![Build Status](https://travis-ci.com/nextstrain/auspice.svg?branch=master)](https://travis-ci.com/nextstrain/auspice)
[![GitHub CI Status](https://travis-ci.com/nextstrain/auspice.svg?branch=master)](https://github.com/nextstrain/auspice/actions?query=workflow%3Aci)
[![NPM version](https://img.shields.io/npm/v/auspice.svg?style=flat)](https://www.npmjs.com/package/auspice)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

## About Altare

*Definition: Flat-topped structure used for divination.*

**Altare** is simply an extension of Auspice to allow for visualizing phylogenomic data with out using a web server.
It may be used in tandem with nextstrain's bioinformatics toolkit [augur](https://github.com/nextstrain/augur) or on its own.

## About Auspice

*Definition: Observation by an augur, ie a prophetic sign.*

**Auspice** is an open-source interactive web app for visualizing phylogenomic data.
It may be used in tandem with nextstrain's bioinformatics toolkit [augur](https://github.com/nextstrain/augur) or on its own.
Auspice may be used to explore datasets locally or run as a server to share results.

## About Nextstrain

**Nextstrain** is an open-source project to harness the scientific and public health potential of pathogen genome data.
We provide a continually-updated view of publicly available data with powerful analytics and visualizations showing pathogen evolution and epidemic spread.
Our goal is to aid epidemiological understanding and improve outbreak response.

Resulting data and inferences are available live at the website [nextstrain.org](https://nextstrain.org).

## Documentation

Full documentation may be found at: [nextstrain.github.io/auspice](https://nextstrain.github.io/auspice).
The following are helpful when beginning to use Auspice:

* [Overview of how Auspice fits together with other Nextstrain tools](https://nextstrain.org/docs/getting-started/introduction#open-source-tools-for-the-community)  
* [Auspice documentation](https://nextstrain.github.io/auspice/introduction/overview)

## Quickstart

Download the package release for your operating system and run it as needed.

### Obtain datasets to display

To get up & running, you'll need datasets to visualise.
(Please see the [nextstrain docs](https://nextstrain.org/docs/) for tutorials on how to run your own analyses.)

If you've installed auspice from `npm` you may get datasets to display via:

```bash
mkdir data
curl http://data.nextstrain.org/zika.json --compressed -o data/zika.json
curl http://data.nextstrain.org/ncov.json --compressed -o data/ncov.json
...
```

If you've installed auspice from source, we have helper scripts to make all the datasets & narratives you see on nextstrain.org available locally:

```bash
# from the auspice src directory
npm run get-data
npm run get-narratives
```

## Contributor Information

> We have received a number of generous offers to contribute developer effort to nextstrain (and auspice) following our work on hCoV-19. We welcome contributions! To get started, please review these resources before submitting a pull request:

* [Contributor guide](https://github.com/nextstrain/.github/blob/master/CONTRIBUTING.md)  
* [Project board with available issues](https://github.com/orgs/nextstrain/projects/5)
* [Developer docs for Auspice](./DEV_DOCS.md)  

This project strictly adheres to the [Contributor Covenant Code of Conduct](https://github.com/nextstrain/.github/blob/master/CODE_OF_CONDUCT.md).

## License and copyright

Copyright 2014-2020 Trevor Bedford and Richard Neher.

Source code to Nextstrain is made available under the terms of the [GNU Affero General Public License](LICENSE.txt) (AGPL). Nextstrain is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.
