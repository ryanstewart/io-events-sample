// To get the API key and token for Trello I just used the Sandbox they have - https://developers.trello.com/sandbox */

var Trello = require("node-trello");
var t = new Trello("< Trello API key >", "< Trello user token >");
var assetURL = "https://assets.adobe.com/file?location=https%3A%2F%2Fcc-us1-prod.adobesc.com%2Fapi%2Fv1%2Fassets%2F"
var newListID = "< Trello List ID for new Assets >";
var updatedListID = "< Trello List ID for new Assets >";

/**
 * Responds to events triggered by Adobe I/O Events
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */


exports.handleCCAssetEvent = function handleCCAssetEvent(req, res) {
  // This handles the challenge that is called  when the webhook is registered
  if(req.method === "GET") {
    var result = "No challenge";
    if(req.query["challenge"]) {
      result = req.query["challenge"];
      console.log("got challenge: " + req.query["challenge"]);
    } else {
      res.setHeader('content-type', 'text/html; charset=UTF-8');
      console.log("no challenge");
    }
    res.status(200).send(result);

    /* This is the code that handles the results of an event */
  } else if (req.method === "POST") {
    var listID = newListID;
    console.log("webhook invoked with an event from : " + req.body.source + " and type " + req.body.asset.type);
    if(req.body.asset.type == "asset_updated") {
      listID = updatedListID;
    }
    console.log(req.body);
    // This uses some string manipulation to build a reachable URL for the description of the Trello card. Could probably break at any time.
    t.post("/1/cards", {name: req.body.asset.filename, idList: listID, desc: "[Creative Cloud Link](" + assetURL + req.body.asset.asset_id.substring(15) + ")"}, function(err, data) {
      if (err) {
        console.log("err " + err);
        res.status(400).send('Something went wrong');
      } else {
        console.log(data);
        res.status(200).send(req.body);
      }
    });
  } else {
    res.status(400).send('Something went wrong');
  }
};
