import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import * as sinon from "sinon";
import {RestClient} from "../rest-client.js";

chai.use(chaiAsPromised);
const {expect} = chai;

describe("RestClient", function () {
  it("spy example", function () {
    const processorUrl = "https://example.org/bogus";
    const restClient = new RestClient(processorUrl);

    let get = sinon.spy(restClient, "get");

    let resp = restClient.get(processorUrl + "/1");

    expect(get.calledOnce).to.be.true;
    expect(get.notCalled).to.be.false;
    expect(get.calledWith("https://example.org/bogus/1")).to.be.true;
    expect(resp).to.eventually.equal({status: 501});
  });

  it("stub example", function () {
    const processorUrl = "https://example.org/bogus";
    const restClient = new RestClient(processorUrl);

    let get = sinon.stub(restClient, "get");
    get.returns({status: 418});

    let resp = restClient.get(processorUrl + "/teapot");

    expect(resp.status).to.equal(418);

    expect(get.calledOnce).to.be.true;
    expect(get.notCalled).to.be.false;
    expect(get.calledWith("https://example.org/bogus/teapot")).to.be.true;
  });

  it("mock example", function () {
    const processorUrl = "https://example.org/bogus";
    const restClient = new RestClient(processorUrl);

    let mock = sinon.mock(restClient);
    mock.expects("get").once().withArgs("https://example.org/bogus/3");

    restClient.get(processorUrl + "/3");

    mock.verify();
  });

  it("throws example", function () {
    const processorUrl = "https://example.org/bogus";
    const restClient = new RestClient(processorUrl);

    let get = sinon.stub(restClient, "get");
    get.throws("This is fine.");

    try {
      restClient.get(processorUrl + "/4");
    } catch (error) {
      expect(get.calledOnce).to.be.true;
      expect(get.notCalled).to.be.false;
      expect(get.calledWith("https://example.org/bogus/4")).to.be.true;
      return;
    }
    expect.fail("Should have thrown an exception.");
  });
});
