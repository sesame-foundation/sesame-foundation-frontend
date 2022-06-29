import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Head from "next/head";
import Layout from "../components/Layout";
import Row from "react-bootstrap/Row";

function Terms() {
  const metaTitle = "Terms of Service - Sesame Foundation";

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
              <h2>1. Acceptance of the Terms of Service</h2>
              <p>
                Welcome to the Sesame Foundation! (a.k.a. "we" or "us" or the
                "Foundation"). We are excited to have you as user and member of
                the community. The following terms and conditions (collectively,
                these "Terms of Service") apply to your use of
                www.sesamefoundation.org, including any content, functionality
                and services offered on or via sesamefoundation.org (the
                "Website").{" "}
              </p>
              <p>
                We want to keep our relationship with you as lean and informal
                as possible, but please read the Terms of Service carefully
                before you start using the Sesame Foundation, because by using
                the Website you accept and agree to be bound and abide by these
                Terms of Service.
              </p>
              <h2> 2. Changes to the Terms of Service and the Website</h2>
              <p>
                The Sesame Foundation is a work in progress, meaning that a lot
                will change in the near future. We reserve the right to update
                the Website and these Terms of Service from time to time, at our
                discretion. We will make sure to announce any major change in a
                prominent way. Your continued use of the Website following the
                publishing of updated Terms of Service means that you accept and
                agree to the changes.
              </p>
              <h2> 3. Accessing the Website, Security and Privacy</h2>
              <p>
                We are working hard on improving the Sesame Foundation, but we
                can't guarantee that the Website will be up and running 24/7. We
                also reserve the right to suspend or restrict access to some
                features to users. In any case, we will not be liable if for any
                reason all or any part of the Website is unavailable at any time
                or for any period, nor for any data loss (see also section 7
                below).
              </p>
              <p>
                To access certain features of the Website you have to use an
                Ethereum wallet to interact with the Ethereum blockchain. You
                must ensure that any private keys and passwords associated with
                your wallet are secure. Transactions with the Ethereum
                blockchain are publicly visible and we do not have the ability
                to undo or modify transactions.
              </p>
              <p>
                Although our website is secured with SSL encryption, we cannot
                guarantee that all use will be secure. We also do not guarantee
                that the Website or any content provided on the Website is error
                free.
              </p>
              <p>
                As custom for internet websites, we reserve the right to block
                access to any user, at any time in our sole discretion for any
                or no reason, including, if in our opinion you have failed to
                comply with any provision of these Terms of Service.
              </p>
              <h2>4. Intellectual Property Rights and Use Guidelines.</h2>
              <p>
                The Website and its original content, features and functionality
                (including look!), are owned by the Sesame Foundation and are
                protected by United States and international copyright,
                trademark, patent, trade secret and other intellectual property
                or proprietary rights laws. You agree to not copy, modify,
                create derivative works of, publicly display, publicly perform,
                republish, any of our copyrighted material, except to the extent
                permitted by the Website itself. If you have doubts about
                whether and how to use of material on the Website, please raise
                your concerns on our{" "}
                <a href="https://discord.gg/WWXPmZAsGf">Discord server</a>.
              </p>
              <p>
                For purposes of these Terms of Service, the term “Content”
                includes, without limitation, information, data, text,
                photographs, videos, audio clips, written posts and comments,
                software, scripts, graphics, and interactive features generated,
                provided, or otherwise made accessible on or through the
                Website.
              </p>
              <p>
                You are permitted to use the Website for your personal,
                non-commercial use, or legitimate business purposes, provided
                that your activities are lawful and in accordance with these
                Terms of Service. Prohibited uses include violation of laws and
                regulations, hacking the Website in any manner, or violating the
                Content Standards set below.
              </p>
              <p>
                No right, title or interest in or to the Website or any content
                on the site is transferred to you, and all rights not expressly
                granted are reserved. Any use of the Website not expressly
                permitted by these Terms of Service is a breach of these Terms
                of Service.
              </p>
              <p>
                We ecourage your feedback, in the form of reviews, comments, and
                suggestions or recommendations for modifications, improvements
                or changes to the Services or the Site that you may choose in
                your sole discretion to provide us from time to time
                (“Feedback”). When you provide Feedback, you grant us, under all
                right, title and interest in and to the Feedback, a
                non-exclusive, royalty-free, worldwide, transferable,
                sub-licensable, irrevocable, perpetual license to use that
                Feedback or to incorporate it into the Website or other producs
                or services.
              </p>
              <p>
                The Website may contain Content specifically provided by us, our
                partners or our users and such Content is protected by
                copyrights, trademarks, service marks, patents, trade secrets or
                other proprietary rights and laws. You shall abide by and
                maintain all copyright notices, information, and restrictions
                contained in any Content accessed through the Website.
              </p>
              <h2>5. Geographic Restrictions</h2>
              <p>
                For now, we provide this Website for use only by persons located
                in the United States. We make no claims that the Website or any
                of its content is accessible, appropriate or legal outside of
                the United States. If you access the Website from outside the
                United States, you do so on your own initiative and are
                responsible for compliance with local laws.
              </p>
              <h2>6. Governing Law and Jurisdiction </h2>
              <p>
                These Terms of Service and any dispute or claim arising out of,
                or related to them, shall be governed by and construed in
                accordance with the internal laws of the State of California
                without giving effect to any choice or conflict of law provision
                or rule. Any legal suit, action or proceeding arising out of, or
                related to, these Terms of Service or the Website shall be
                instituted exclusively in the federal courts of the United
                States or the courts of the State of California.
              </p>
              <h2>7. Waiver and Severability</h2>
              <p>
                Our failure to exercise or enforce any right or provision of the
                Terms of Service shall not constitute a waiver of such right or
                provision. The Terms of Service constitutes the entire agreement
                between you and the Sesame Foundation and govern your use of the
                service, superseding any prior agreements (including, but not
                limited to, any prior versions of the Terms of Service). If any
                provision of these Terms of Service is held by a court of
                competent jurisdiction to be invalid, illegal or unenforceable
                for any reason, such provision shall be eliminated or limited to
                the minimum extent such that the remaining provisions of the
                Terms of Service will continue in full force and effect.
              </p>
              <h2>8. Feedback</h2>
              <p>
                We welcome any comment, question, and communication on our{" "}
                <a href="https://discord.gg/WWXPmZAsGf">Discord server</a>.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Terms;
