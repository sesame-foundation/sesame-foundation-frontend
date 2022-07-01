import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import DonationItem from "./DonationItem";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { BigNumber } from "ethers";
import { providerContract } from "../utils/utils.js";

export default function DonorList({ contractName }) {
  const [donationEvents, setDonationEvents] = useState([]);

  useEffect(() => {
    getDonors();
  }, []);

  const getDonors = () => {
    const contract = providerContract(contractName);
    if (contract === undefined) return;
    let eventFilter = contract.filters.Donation();
    contract.queryFilter(eventFilter).then((events) => {
      setDonationEvents(events);
    });
  };

  const listItems = () => {
    // Given an array of donation events, reduces matching donor addresses
    // and sorts in decending value order
    const donations = Array.from(
      donationEvents.reduce(
        (m, event) =>
          m.set(
            event.args[0],
            (m.get(event.args[0]) || BigNumber.from(0)).add(event.args[1])
          ),
        new Map()
      ),
      ([donor, value]) => ({ donor, value })
    ).sort((a, b) => parseFloat(b.value) - parseFloat(a.value));

    return donations.map((donation) => (
      <DonationItem
        contractName={contractName}
        donation={donation}
        key={donation.donor}
      />
    ));
  };

  return (
    <>
      {donationEvents.length > 0 ? (
        <Container className="py-5 my-5">
          <Row className="justify-content-center">
            <Col xl={4}>
              <h2 className="text-center">Top Donors</h2>

              <div className="table-responsive">
                <Table striped>
                  <thead>
                    <tr>
                      <th scope="col">Donor</th>
                      <th scope="col" style={{ textAlign: "right" }}>
                        Contribution
                      </th>
                    </tr>
                  </thead>
                  <tbody>{listItems()}</tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}
