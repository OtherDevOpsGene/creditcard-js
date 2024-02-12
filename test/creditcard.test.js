import {expect} from "chai";
import {normalize, luhn10, type} from "../creditcard.js";

describe("creditcard", function () {
  describe("normalize", function () {
    it("should strip spaces", function () {
      expect(normalize("4111 1111 1111 1111")).to.equal("4111111111111111");
    });
    it("should strip dashes", function () {
      expect(normalize("5555-5555-5555-4444")).to.equal("5555555555554444");
    });
    it("should join array", function () {
      expect(normalize(["3400", "123456", "78905"])).to.equal(
        "340012345678905",
      );
    });
    it("should return a single string unchanged", function () {
      expect(normalize("6011111111111117")).to.equal("6011111111111117");
    });
  });

  describe("luhn10", function () {
    context("valid card number", function () {
      it("4567-8901-2345-6783 is valid", function () {
        expect(luhn10("4567-8901-2345-6783")).to.be.true;
      });

      it("5555-5555-5555-4444 as an array is valid", function () {
        expect(luhn10(["5555", "5555", "5555", "4444"])).to.be.true;
      });
    });
    context("invalid card number", function () {
      it("4111 1111 1111 1110 is invalid", function () {
        expect(luhn10("4111 1111 1111 1110")).to.be.false;
      });
    });
  });

  describe("type", function () {
    context("Visa", function () {
      it("4111 1111 1111 1111 is valid for Visa", function () {
        let cc = type("4111 1111 1111 1111");
        expect(cc.valid).to.be.true;
        expect(cc.cardType).to.equal("Visa");
      });

      it("4567-8901-2345-6783 is valid for Visa", function () {
        let cc = type("4567-8901-2345-6783");
        expect(cc.valid).to.be.true;
        expect(cc.cardType).to.equal("Visa");
      });

      it("4111-111-111-119 is valid for Visa", function () {
        let cc = type("4111-111-111-119");
        expect(cc.valid).to.be.true;
        expect(cc.cardType).to.equal("Visa");
      });

      it("4111-111-111-118 is a bad checksum for Visa", function () {
        let cc = type("4111-111-111-118");
        expect(cc.valid).to.be.false;
        expect(cc.cardType).to.equal("Visa");
      });

      it("4111-111-111-17 is too short for Visa", function () {
        let cc = type("4111-111-111-17");
        expect(cc.valid).to.be.false;
        expect(cc.cardType).to.equal("Visa");
      });

      it("4111-1111-1111-1111-9 is too long for Visa", function () {
        let cc = type("4111-1111-1111-1111-9");
        expect(cc.valid).to.be.false;
        expect(cc.cardType).to.equal("Visa");
      });

      it("4111-1111-1111-14 is the wrong length for Visa", function () {
        let cc = type("4111-1111-1111-14");
        expect(cc.valid).to.be.false;
        expect(cc.cardType).to.equal("Visa");
      });
    });

    context("Mastercard", function () {
      it("5555 5555 5555 4444 is valid for Mastercard", function () {
        let cc = type("5555 5555 5555 4444");
        expect(cc.valid).to.be.true;
        expect(cc.cardType).to.equal("Mastercard");
      });

      it("5111-1111-1111-1111 is a bad checksum for Mastercard", function () {
        let cc = type("5111-1111-1111-1111");
        expect(cc.valid).to.be.false;
        expect(cc.cardType).to.equal("Mastercard");
      });

      it("5555-5555-5555-558 is the wrong length for Mastercard", function () {
        let cc = type("5555-5555-5555-558");
        expect(cc.valid).to.be.false;
        expect(cc.cardType).to.equal("Mastercard");
      });
    });

    context("American Express", function () {
      it("3411 111111 11111 is valid for American Express", function () {
        let cc = type("3411 111111 11111");
        expect(cc.valid).to.be.true;
        expect(cc.cardType).to.equal("American Express");
      });

      it("3700-000000-00002 is valid for American Express", function () {
        let cc = type("3700-000000-00002");
        expect(cc.valid).to.be.true;
        expect(cc.cardType).to.equal("American Express");
      });

      it("3700-000000-00001 is a bad checksum for American Express", function () {
        let cc = type("3700-000000-00001");
        expect(cc.valid).to.be.false;
        expect(cc.cardType).to.equal("American Express");
      });

      it("3700-1234-5678-9012 is the wrong length for American Express", function () {
        let cc = type("3700-1234-5678-9012");
        expect(cc.valid).to.be.false;
        expect(cc.cardType).to.equal("American Express");
      });
    });

    context("Discover Card", function () {
      it("6011111111111117 is valid for Discover Card", function () {
        let cc = type("6011111111111117");
        expect(cc.valid).to.be.true;
        expect(cc.cardType).to.equal("Discover Card");
      });

      it("6565 4444 5555 6666 is valid for Discover Card", function () {
        let cc = type("6565 4444 5555 6666");
        expect(cc.valid).to.be.true;
        expect(cc.cardType).to.equal("Discover Card");
      });

      it("6011111111111111 is a bad checksum for Discover Card", function () {
        let cc = type("6011111111111111");
        expect(cc.valid).to.be.false;
        expect(cc.cardType).to.equal("Discover Card");
      });

      it("6565 4444 5555 661 is the wrong length for Discover Card", function () {
        let cc = type("6565 4444 5555 661");
        expect(cc.valid).to.be.false;
        expect(cc.cardType).to.equal("Discover Card");
      });
    });

    context("unknown", function () {
      it("1234-5678-9015 is valid but unknown", function () {
        let cc = type("1234-5678-9015");
        expect(cc.valid).to.be.true;
        expect(cc.cardType).to.equal("unknown");
      });

      it("1234 5678 9012 3456 785 is valid but unknown", function () {
        let cc = type("1234 5678 9012 3456 785");
        expect(cc.valid).to.be.true;
        expect(cc.cardType).to.equal("unknown");
      });

      it("1234 5678 9012 3456 7896 is too long to be a credit card number", function () {
        let cc = type("1234 5678 9012 3456 7896");
        expect(cc.valid).to.be.false;
        expect(cc.cardType).to.equal("unknown");
      });

      it("1234-5678-903 is too short to be a credit card number", function () {
        let cc = type("1234-5678-903");
        expect(cc.valid).to.be.false;
        expect(cc.cardType).to.equal("unknown");
      });
    });
  });
});