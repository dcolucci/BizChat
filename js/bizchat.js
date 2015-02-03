window.BizChat = {

  // Specify the conversational sequence by reordering
  // the dialogue template names in this array.
  // Dialogue names correspond to functions within this.Dialogues
  DialogueOrder: [
    "siteIntro",
    "userIntro",
    "siteValueProp",
    "userValueProp",
    "userFirmSize",
    "siteValuePropResponse"
  ],

  // Store data retrieved from user inputs to send to server
  CollectedData: {},

  initialize: function () {
    var otherCallback = function () {
      console.log("hi again");
    };

    var callback = function () {
      setTimeout(otherCallback, 1000);
      console.log("hi");
    };

    setTimeout(callback, 1000);
  },

  handleDialogue: function (dialogueName) {
    var $html = $(this.Dialogues[dialogueName]());
    var $inputLines = $($html.find('li'));

    var that = this;
    $inputLines.each (function () {
      that.handleLine($(this));
    });
  },

  handleLine: function ($line) {
    console.log($line.html());
  },

  endConvo: function () {
    alert("the end");
  },

  Dialogues: {
    siteIntro: function () {
      return '<span>Let us know who you are! Stating what you\'ve done prior to founding your business gives you and the company additional legitimacy and validation.</span>';
    },

    userIntro: function () {
      return '<ul><li>here is one</li><li>here is two</li><li>here is three</li></ul>';
    },

    siteValueProp: function () {

    },

    userValueProp: function () {

    },

    userFirmSize: function () {

    },

    siteValuePropResponse: function () {

    }
  }
}
