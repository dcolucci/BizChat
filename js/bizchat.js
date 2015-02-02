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

  // Used to sequentially process dialogues within conversation
  DialogueQueue: [],

  // Store data retrieved from user inputs to send to server
  CollectedData: {},

  initialize: function () {
    for (var i = 0; i < this.DialogueOrder.length; i++) {
      this.DialogueQueue.push(this.DialogueOrder[i]);
    };

    while (this.DialogueQueue.length > 0) {
      this.handleDialogue(this.DialogueQueue.splice(0,1)[0]);
    };

    this.endConvo();
  },

  handleDialogue: function (dialogueName) {
    var $html = $(this.Dialogues[dialogueName]());
    var $inputLines = $($html.find('li'));

    $inputLines.each (function () {
      console.log($(this).html());

    });


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
