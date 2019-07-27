import React from "react";
import { Link } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

const SecondPage = () => (
  <Layout active="about" headerTitle="About me" headerDescription="Vinícius Sales - Front-end Developer">
    <SEO title="About" keywords={[`Vinicius Sales`, `about`, `Front-end`]} />
    <h1>About</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default SecondPage;
