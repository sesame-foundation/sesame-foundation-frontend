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
              <div style={{marginBottom: "32px"}}>
              <Button
                variant="primary"
                onClick={() => (window.location.href = "Sesame_Challenges.pdf")}
              >
                Read the whitepaper
              </Button>
              </div>
              <p>
                Many people and organizations have used monetary prizes to draw
                attention to unsolved mathematical problems of interest. For
                example, the Clay Institute has offered $1 million for solutions
                to the so-called{" "}
                <a href="http://www.claymath.org/millennium-problems/millennium-prize-problems">
                  Millenium Prize Problems
                </a>
                . Other examples include the{" "}
                <a href="https://www.eff.org/awards/coop">
                  Electronic Frontier Foundation (EFF) Cooperative Computing
                  Awards
                </a>{" "}
                for identifying large primes and the{" "}
                <a href="https://www.ams.org/prizes-awards/paview.cgi?parent_id=41">
                  Beal Prize
                </a>{" "}
                related to the solutions of the equation{" "}
                <i>
                  A<sup>x</sup>
                </i>{" "}
                +{" "}
                <i>
                  B<sup>y</sup>
                </i>{" "}
                ={" "}
                <i>
                  C<sup>z</sup>
                </i>
                .
              </p>
              <p>
                Despite the success of such prizes in drawing attention to
                important unsolved problems, the creation of such prizes
                involves many complexities. These complexities arise from the
                difficulty in providing a strong guarantee, to those pursuing
                the problem as well as those donating to the prize, that the
                prize would in fact be awarded to the first party to solve the
                problem and not to anyone else. Such guarantees can be
                especially difficult given the long time-scales for solving such
                problems.
              </p>
              <p>
                In order to address these challenges, past prizes have often
                relied on trusted organizations as facilitators. For example,
                the Beal Prize is sponsored by billionaire mathematician D.
                Andrew Beal but administered by the American Mathematical
                Society (AMS). Such approaches have limitations however: one
                must persuade a trusted organization to take interest in a given
                problem and negotiate the financial and legal details of such an
                arrangement. Such challenges are particularly significant for
                problems where the interest is not concentrated in a single
                individual or entity but diffused across many stakeholders.
              </p>
              <p>
                This page introduces the Decentralized Factoring Challenge
                (DFC), a first step towards providing a mechanism for creating
                mathematical prizes. The DFC provides a mechanism for anyone to
                contribute to prizes for factoring large integers and, by
                leveraging Ethereum smart contracts, provides a guarantee that
                the first party to find the factors will be able to claim the
                prize. This page reviews the significance and future
                expectations for integer factorization, as well as the mechanics
                of the DFC.
              </p>
              <h2>Integer factorization</h2>
              <p>
                Integer factorization is a problem not only of fundamental
                mathematical interest, but also great practical interest because
                of its central role in public-key cryptography. Many current
                telecommunication systems, including much of the internet, rely
                on public-key encryption whose security comes from the fact that
                large semiprimes are difficult to factor. In order to verify the
                difficulty of this problem, RSA Laboratories launched a{" "}
                <a href="https://en.wikipedia.org/wiki/RSA_Factoring_Challenge">
                  factoring challenge
                </a>{" "}
                in 1991, offering prizes totalling over $500,000 USD for the
                factors of large semiprimes. Although the contest was terminated
                in 2007, researchers have continued to pursue the challenges.
                For example, Boudot et al. factored RSA-250 in 2020, the largest
                RSA number to be factored so far.
              </p>
              <p>
                Although the RSA Factoring Challenge successfully demonstrated
                the security of public-key cryptography against current
                technology, the emergence of quantum computation has raised the
                possibility that public-key cryptography based on factorization
                will be broken in coming decades. In 1994, Peter Shor introduced
                a quantum algorithm that is almost exponentially faster than the
                best known classical algorithms for integer factorization.
                Although no quantum computers existed at that time, recent years
                have seen significant breakthroughs in the realization of
                quantum computers. For example, in 2019, Google announced that
                their quantum processor had achieved quantum supremacy, a major
                milestone in the realization of quantum computers.
              </p>
              <p>
                As a result of these breakthroughs, many experts expect quantum
                computing to disrupt public-key cryptography in coming decades,
                with potentially significant implications for privacy and
                telecommunications infrastructure. For example, the RAND
                Corporation{" "}
                <a href="https://www.rand.org/pubs/research_reports/RR3102.html">
                  estimated
                </a>{" "}
                that quantum computers relevant for cryptography would become
                available by approximately 2033. Similarly, as of March 2022,
                the Metaculus prediction community has{" "}
                <a href="https://www.metaculus.com/questions/3684/when-will-a-quantum-computer-running-shors-algorithm-or-a-similar-one-be-used-to-factor-one-of-the-rsa-numbers-for-the-first-time/">
                  forecast
                </a>{" "}
                that a quantum algorithm will likely be used to factor an as-yet
                unfactored RSA number between 2036 and 2096. Note that related
                quantum algorithms also could have{" "}
                <a href="https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/">
                  significant implications
                </a>{" "}
                for cryptographic tools used today in many blockchains.
              </p>
              <p>
                Given the expectation that quantum computation will likely break
                important protocols such as public-key cryptography and have
                major implications for communication security, there is
                significant value in exploring the limits of emerging methods
                for integer factorization. However, because there are
                essentially no commercial applications for integer
                factorization, there is limited incentive for white-hat
                researchers to invest significant resources in this area.
              </p>

              <h2>Mechanics of the Decentralized Factoring Challenge</h2>
              <p>
                The DFC encourages research into integer factorization by
                providing a smart contract offering a prize for the
                factorization of large integers. Unlike many other mathematical
                contests, the DFC allows anyone to donate to the prize pool.
                Importantly, the mechanics of contract allow donors to have
                confidence that the first person to factor the integer will be
                able to withdraw the prize.
              </p>
              <p>
                There are three ways to interact with a DFC contract: donating
                to the prize, submitting a sealed claim, and withdrawing the
                prize. Users can donate eth to the prize simply by sending eth
                to the contract's address. A user who claims to have found the
                factors to the numbers may submit a sealed claim (the Keccak-256
                hash of the purported factors) using the contract's{" "}
                <tt>submitClaim</tt> method. Lastly, a user who has previously
                submitted a valid sealed claim may withdraw the prize by passing
                the factors to the <tt>withdraw</tt> method.
              </p>
              <p>
                This <tt>withdraw</tt> method performs several checks. First,
                the submitted factors must multiply to the target product.
                Second, the hash of the submitted factors must match a
                previously submitted sealed claim from the same Ethereum
                address. Third, the number of blocks mined since the sealed
                claim was submitted must equal or exceed the withdrawl delay.
                (This withdrawl delay, along with the product to be factored,
                are the two parameters defining a DFC contract.) The second and
                third checks allow for claimants to prevent front-running, i.e.
                a malicious miner using the claimant's factors to withdraw the
                prize to their own address.
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
