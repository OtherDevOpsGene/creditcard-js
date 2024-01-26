const expect = require("chai").expect;
const creditcard = require("../creditcard.js");

describe("creditcard", function () {
  describe("normalize", function () {
    it("should strip spaces", function () {
      expect(creditcard.normalize("4111 1111 1111 1111")).to.equal(
        "4111111111111111",
      );
    });
    it("should strip dashes", function () {
      expect(creditcard.normalize("5555-5555-5555-4444")).to.equal(
        "5555555555554444",
      );
    });
    it("should join array", function () {
      expect(creditcard.normalize(["3400", "123456", "78905"])).to.equal(
        "340012345678905",
      );
    });
    it("should return a single string unchanged", function () {
      expect(creditcard.normalize("6011111111111117")).to.equal(
        "6011111111111117",
      );
    });
  });

  describe("luhn10", function () {
    context("valid card number", function () {
      it("4567-8901-2345-6783 is valid", function () {
        expect(creditcard.luhn10("4567-8901-2345-6783")).to.be.true;
      });

      it("5555-5555-5555-4444 as an array is valid", function () {
        expect(creditcard.luhn10(["5555", "5555", "5555", "4444"])).to.be.true;
      });
    });
    context("invalid card number", function () {
      it("4111 1111 1111 1110 is invalid", function () {
        expect(creditcard.luhn10("4111 1111 1111 1110")).to.be.false;
      });
    });
  });

  describe("type", function () {
    context("Visa", function () {
      it("4111 1111 1111 1111 is valid for Visa", function () {
        expect(creditcard.type("4111 1111 1111 1111")).to.equal("valid Visa");
      });

      it("4567-8901-2345-6783 is valid for Visa", function () {
        expect(creditcard.type("4567-8901-2345-6783")).to.equal("valid Visa");
      });

      it("4111-111-111-119 is valid for Visa", function () {
        expect(creditcard.type("4111-111-111-119")).to.equal("valid Visa");
      });

      it("4111-111-111-118 is a bad checksum for Visa", function () {
        expect(creditcard.type("4111-111-111-118")).to.equal("invalid Visa");
      });

      it("4111-111-111-17 is too short for Visa", function () {
        expect(creditcard.type("4111-111-111-17")).to.equal("invalid Visa");
      });

      it("4111-1111-1111-1111-9 is too long for Visa", function () {
        expect(creditcard.type("4111-1111-1111-1111-9")).to.equal(
          "invalid Visa",
        );
      });

      it("4111-1111-1111-14 is the wrong length for Visa", function () {
        expect(creditcard.type("4111-1111-1111-14")).to.equal("invalid Visa");
      });
    });

    context("Mastercard", function () {
      it("5555 5555 5555 4444 is valid for Mastercard", function () {
        expect(creditcard.type("5555 5555 5555 4444")).to.equal(
          "valid Mastercard",
        );
      });

      it("5111-1111-1111-1111 is a bad checksum for Mastercard", function () {
        expect(creditcard.type("5111-1111-1111-1111")).to.equal(
          "invalid Mastercard",
        );
      });

      it("5555-5555-5555-558 is the wrong length for Mastercard", function () {
        expect(creditcard.type("5555-5555-5555-558")).to.equal(
          "invalid Mastercard",
        );
      });
    });

    context("American Express", function () {
      it("3411 111111 11111 is valid for American Express", function () {
        expect(creditcard.type("3411 111111 11111")).to.equal(
          "valid American Express",
        );
      });

      it("3700-000000-00002 is valid for American Express", function () {
        expect(creditcard.type("3700-000000-00002")).to.equal(
          "valid American Express",
        );
      });

      it("3700-000000-00001 is a bad checksum for American Express", function () {
        expect(creditcard.type("3700-000000-00001")).to.equal(
          "invalid American Express",
        );
      });

      it("3700-1234-5678-9012 is the wrong length for American Express", function () {
        expect(creditcard.type("3700-1234-5678-9012")).to.equal(
          "invalid American Express",
        );
      });
    });

    context("Discover Card", function () {
      it("6011111111111117 is valid for Discover Card", function () {
        expect(creditcard.type("6011111111111117")).to.equal(
          "valid Discover Card",
        );
      });

      it("6565 4444 5555 6666 is valid for Discover Card", function () {
        expect(creditcard.type("6565 4444 5555 6666")).to.equal(
          "valid Discover Card",
        );
      });

      it("6011111111111111 is a bad checksum for Discover Card", function () {
        expect(creditcard.type("6011111111111111")).to.equal(
          "invalid Discover Card",
        );
      });

      it("6565 4444 5555 661 is the wrong length for Discover Card", function () {
        expect(creditcard.type("6565 4444 5555 661")).to.equal(
          "invalid Discover Card",
        );
      });
    });

    context("unknown", function () {
      it("1234-5678-9015 is valid but unknown", function () {
        expect(creditcard.type("1234-5678-9015")).to.equal("valid unknown");
      });

      it("1234 5678 9012 3456 785 is valid but unknown", function () {
        expect(creditcard.type("1234 5678 9012 3456 785")).to.equal(
          "valid unknown",
        );
      });

      it("1234 5678 9012 3456 7896 is too long to be a credit card number", function () {
        expect(creditcard.type("1234 5678 9012 3456 7896")).to.equal(
          "invalid unknown",
        );
      });

      it("1234-5678-903 is too short to be a credit card number", function () {
        expect(creditcard.type("1234-5678-903")).to.equal("invalid unknown");
      });
    });
  });
});
