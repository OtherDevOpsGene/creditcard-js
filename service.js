"use strict";

import {type} from "./creditcard.js";
import {RestClient} from "./rest-client.js";

const processorUrl = "https://example.org/does/not/exist";

export class CreditCardProcessor {
  constructor(restClient) {
    this.restClient = restClient;
  }

  charge(cardNo, exp, amount) {
    if (!cardNo) {
      throw new Error("Credit card number must be supplied.");
    }
    if (!exp) {
      throw new Error("Credit card expiration date must be supplied.");
    }
    if (!amount) {
      throw new Error("Amount to charge must be supplied.");
    }

    let cc = type(cardNo);
    if (!cc.valid) {
      throw new Error("Not a valid credit card number, type " + cc.cardType);
    }
    if ("unknown" === cc.cardType) {
      throw new Error("Unknown credit card type.");
    }

    // let restClient = new RestClient(processorUrl);
    let response = this.restClient.post({
      cardNumber: cardNo,
      cardExpiration: exp,
      amount: amount,
    });

    return response.status;
  }
}
