var creditcard = require("../creditcard.js");
var assert = require("chai").assert;

describe("normalize", function () {
  it("should strip spaces", function () {
    assert.equal(
      creditcard.normalize("4111 1111 1111 1111"),
      "4111111111111111",
    );
  });
  it("should strip dashes", function () {
    assert.equal(
      creditcard.normalize("5555-5555-5555-4444"),
      "5555555555554444",
    );
  });
  it("should join array", function () {
    assert.equal(
      creditcard.normalize(["3400", "123456", "78905"]),
      "340012345678905",
    );
  });
  it("should return a single string unchanged", function () {
    assert.equal(creditcard.normalize("6011111111111117"), "6011111111111117");
  });
});

describe("luhn10", function () {
  context("valid card number", function () {
    it("4567-8901-2345-6783 is valid", function () {
      assert.equal(creditcard.luhn10("4567-8901-2345-6783"), true);
    });

    it("5555-5555-5555-4444 as an array is valid", function () {
      assert.equal(creditcard.luhn10(["5555", "5555", "5555", "4444"]), true);
    });
  });
  context("invalid card number", function () {
    it("4111 1111 1111 1110 is invalid", function () {
      assert.equal(creditcard.luhn10("4111 1111 1111 1110"), false);
    });
  });
});

describe("type", function () {
  context("Visa", function () {
    it("4111 1111 1111 1111 is valid for Visa", function () {
      assert.equal(creditcard.type("4111 1111 1111 1111"), "valid Visa");
    });

    it("4567-8901-2345-6783 is valid for Visa", function () {
      assert.equal(creditcard.type("4567-8901-2345-6783"), "valid Visa");
    });

    it("4111-111-111-119 is valid for Visa", function () {
      assert.equal(creditcard.type("4111-111-111-119"), "valid Visa");
    });

    it("4111-111-111-119 is a bad checksum for Visa", function () {
      assert.equal(creditcard.type("4111-111-111-118"), "invalid Visa");
    });

    it("4111-111-111-17 is too short for Visa", function () {
      assert.equal(creditcard.type("4111-111-111-17"), "invalid Visa");
    });

    it("4111-1111-1111-1111-9 is too long for Visa", function () {
      assert.equal(creditcard.type("4111-1111-1111-1111-9"), "invalid Visa");
    });

    it("4111-1111-1111-14 is the wrong length for Visa", function () {
      assert.equal(creditcard.type("4111-1111-1111-14"), "invalid Visa");
    });
  });

  context("Mastercard", function () {
    it("5555 5555 5555 4444 is valid for Mastercard", function () {
      assert.equal(creditcard.type("5555 5555 5555 4444"), "valid Mastercard");
    });

    it("5111-1111-1111-1111 is a bad checksum for Mastercard", function () {
      assert.equal(
        creditcard.type("5111-1111-1111-1111"),
        "invalid Mastercard",
      );
    });

    it("5555-5555-5555-558 is the wrong length for Mastercard", function () {
      assert.equal(creditcard.type("5555-5555-5555-558"), "invalid Mastercard");
    });
  });

  context("American Express", function () {
    it("3411 111111 11111 is valid for American Express", function () {
      assert.equal(
        creditcard.type("3411 111111 11111"),
        "valid American Express",
      );
    });

    it("3700-000000-00002 is valid for American Express", function () {
      assert.equal(
        creditcard.type("3700-000000-00002"),
        "valid American Express",
      );
    });

    it("3700-000000-00001 is a bad checksum for American Express", function () {
      assert.equal(
        creditcard.type("3700-000000-00001"),
        "invalid American Express",
      );
    });

    it("3700-1234-5678-9012 is the wrong length for American Express", function () {
      assert.equal(
        creditcard.type("3700-1234-5678-9012"),
        "invalid American Express",
      );
    });
  });

  context("Discover Card", function () {
    it("6011111111111117 is valid for Discover Card", function () {
      assert.equal(creditcard.type("6011111111111117"), "valid Discover Card");
    });

    it("6565 4444 5555 6666 is valid for Discover Card", function () {
      assert.equal(
        creditcard.type("6565 4444 5555 6666"),
        "valid Discover Card",
      );
    });

    it("6011111111111111 is a bad checksum for Discover Card", function () {
      assert.equal(
        creditcard.type("6011111111111111"),
        "invalid Discover Card",
      );
    });

    it("6565 4444 5555 661 is the wrong length for Discover Card", function () {
      assert.equal(
        creditcard.type("6565 4444 5555 661"),
        "invalid Discover Card",
      );
    });
  });

  context("unknown", function () {
    it("1234-5678-9015 is valid but unknown", function () {
      assert.equal(creditcard.type("1234-5678-9015"), "valid unknown");
    });

    it("1234 5678 9012 3456 785 is valid but unknown", function () {
      assert.equal(creditcard.type("1234 5678 9012 3456 785"), "valid unknown");
    });

    it("1234 5678 9012 3456 7896 is too long to be a credit card number", function () {
      assert.equal(
        creditcard.type("1234 5678 9012 3456 7896"),
        "invalid unknown",
      );
    });

    it("1234-5678-903 is too short to be a credit card number", function () {
      assert.equal(creditcard.type("1234-5678-903"), "invalid unknown");
    });
  });
});
