const { default: FireClass } = require("./Support/FirebaseClass");
const { default: StripeClass } = require("./Support/StripeClass");
const { default: Util, default: UtilClass } = require("./Support/UtilsClass");


exports.Stripe = StripeClass
exports.firebase = FireClass
exports.utilities = UtilClass