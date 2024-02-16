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
    expect.fail("This test needs to be implemented.");
  });

  it("missing amount", function () {
    expect.fail("This test needs to be implemented.");
  });

  it("invalid credit card number", function () {
    expect.fail("This test needs to be implemented.");
  });

  it("invalid credit card type", function () {
    expect.fail("This test needs to be implemented.");
  });

  it("valid POST to processor", function () {
    expect.fail("This test needs to be implemented.");
  });
});
