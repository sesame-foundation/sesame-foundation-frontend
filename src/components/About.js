import "./About.css";

import { Container, Row, Col } from "react-bootstrap";

function About() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={8}>
          <div className="about">
            <p>
              Many people and organizations have used monetary prizes to draw
              attention to unsolved mathematical problems of interest. For
              example, the Clay Institude has offered $1 million for solutions
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
              important unsolved problems, the creation of such prizes involves
              many complexities. These complexities arise from the difficulty in
              providing a strong guarantee, to those pursuing the problem as
              well as those donating to the prize, that the prize would in fact
              be awarded to the first party to solve the problem and not to
              anyone else. Such guarantees can be especially difficult given the
              long time-scales for solving such problems.
            </p>
            <p>
              In order to address these challenges, past prizes have often
              relied on trusted organizations as facilitators. For example, the
              Beal Prize is sponsored by billionaire mathematician D. Andrew
              Beal but administered by the American Mathemitcal Society (AMS).
              Such approaches have limitations however: one must persuade a
              trusted organization to take interest in a given problem and
              negotiate the financial and legal details of such an arrangement.
              Such challenges are particularly significant for problems where
              the interest is not concentrated in a single individual or entity
              but diffused across many stakeholders.
            </p>
            <p>
              As a first step towards providing a mechanism for creating
              mathematical prizes, we are introducing the Decentralized
              Factorization Challenge (DCF). The DCF provides a mechanism for
              anyone to contribute to prizes for factoring large integers and,
              by leveraging Ethereum smart contracts, provides a guarantee that
              the first party to find the factors will be able to claim the
              prize.
            </p>
            <p>
              The{" "}
              <a href="https://en.wikipedia.org/wiki/RSA_Factoring_Challenge">
                RSA Factoring Challenge
              </a>{" "}
              in the past awarded prizes for factoring large integers, a
              problem of great importance of public-key cryptography.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
