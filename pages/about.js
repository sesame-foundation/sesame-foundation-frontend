import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Head from "next/head";
import Layout from "../components/Layout";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function About() {
  const metaTitle = "About - Sesame Foundation";

  return (
    <Layout>
      <Head>
        <title>{metaTitle}</title>
        <meta property="og:title" content={metaTitle} />
        <meta name="twitter:title" content={metaTitle} />
      </Head>
      <Container>
        <Row className="justify-content-center my-5">
          <Col xs={8}>
            <div className="about">
              <h1>
                A decentralized factoring challenge to encourage research in
                computational number theory.
              </h1>
              <div style={{ marginBottom: "32px" }}>
                <Button
                  variant="primary"
                  onClick={() =>
                    (window.location.href = "Sesame_Challenges.pdf")
                  }
                >
                  Read the whitepaper
                </Button>
              </div>
              <p>
                Monetary prizes have long been used to incentivize research into
                unsolved problems in mathematics. While most prizes have been
                created by a single institution or individual, it can be
                difficult for a decentralized community to offer such prizes. In
                particular, it is challenging to provide assurances to donors
                that their contribution will be properly distributed to the
                individual or group that solves a given problem.
              </p>
              <p>
                The Sesame protocol aims to address these limitations by
                allowing the creation of decentralized prizes for unsolved
                mathematical problems in cases where verification of a correct
                solution is computationally efficient. This system provides
                guarantees that the prize can only be withdrawn to someone who
                solves a given problem. The Sesame protocol also provides a
                public interface to allow additional contracts and applications
                to be built on top of it. The Decentralized Factoring Challenge,
                inspired by the RSA Factoring Challenge, is the first challenge
                built on the Sesame protocol.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

// Related content:
// satcompetition.org
// Decentralized Combinatorial Optimization
// Netflix Prize
// NIST Open Innovation Prize Challenges

// Todo:
// One-paragraph summary
// What happens if solution is never found

export default About;
