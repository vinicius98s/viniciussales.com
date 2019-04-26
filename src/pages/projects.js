import React from "react";
// import { Link } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

const SecondPage = () => (
    <Layout active="projects" headerTitle="Projects" headerDescription="Some stuffs I've been working around">
        <SEO title="Projects" keywords={[`Vinicius Sales`, `projects`, `Front-end`, "react"]} />
        <h1>Projects</h1>
    </Layout>
);

export default SecondPage;
