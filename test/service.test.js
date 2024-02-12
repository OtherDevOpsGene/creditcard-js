import {expect} from "chai";
import * as sinon from "sinon";
import {CreditCardProcessor} from "../service.js";
import {RestClient} from "../rest-client.js";

describe("charge", function () {
  const processorUrl = "https://example.org/does/not/exist";
  const restClient = new RestClient(processorUrl);
  const service = new CreditCardProcessor(restClient);

  it("missing credit card number", function () {
    expect(() => service.charge("", "12/2029", 1.23)).to.throw(
      "Credit card number must be supplied.",
    );
  });
  it("missing expiration date", function () {
    expect(() => service.charge("4111 1111 1111 1111", "", 2.34)).to.throw(
      "Credit card expiration date must be supplied.",
    );
  });
  it("missing amount", function () {
    expect(() => service.charge("5555555555554444", "11/2028", null)).to.throw(
      "Amount to charge must be supplied.",
    );
  });
  it("invalid credit card number", function () {
    expect(() => service.charge("4111-111-111-118", "10/2027", 4.56)).to.throw(
      "Not a valid credit card number, type Visa",
    );
  });
  it("invalid credit card type", function () {
    expect(() => service.charge("1234-5678-9015", "9/2026", 6.78)).to.throw(
      "Unknown credit card type.",
    );
  });

  it("valid POST to processor", function () {
    let post = sinon.stub(restClient, "post");
    post.returns({status: 200});
  
    let charge = service.charge("4111 1111 1111 1111", "8/2025", 7.89);

    expect(charge).to.equal(200);
    expect(
      post.calledOnceWith({
        cardNumber: "4111 1111 1111 1111",
        cardExpiration: "8/2025",
        amount: 7.89,}
      )
    ).to.be.true;

    sinon.restore();
  });
});
