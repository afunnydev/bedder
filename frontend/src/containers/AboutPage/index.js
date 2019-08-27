import React from 'react';
import { Helmet } from 'react-helmet';

import GeneralTemplate from 'components/GeneralTemplate';
import json from './data.json';

const AboutPage = () => (
  <>
    <Helmet>
      <title>About</title>
    </Helmet>
    <GeneralTemplate markdown={json.text} />
  </>
);

export default AboutPage;
