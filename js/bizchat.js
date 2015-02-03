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
    var index = 0;
    var currDialogue = '';
    var that = this;

    var queueDialogue = function (callback) {
      if (index === that.DialogueOrder.length) {
        return;
      }

      currDialogue = that.DialogueOrder[index];
      index++;

      callback(
        currDialogue,
        queueDialogue.bind(that, that.handleDialogue.bind(that))
      );
    };

    queueDialogue(this.handleDialogue.bind(this));
  },

  handleDialogue: function (dialogueName, callback) {
    var $html = $(this.Dialogues[dialogueName]());
    var $inputLines = $($html.find('li'));

    var html = this.Dialogues[dialogueName]();
    console.log(html);

    // var that = this;
    // $inputLines.each (function () {
    //   that.handleLine($(this));
    // });

    setTimeout(callback, 2000);
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
      return '<span>this is the site value prop</span>';
    },

    userValueProp: function () {
      return '<span>this is the user value prop</span>';
    },

    userFirmSize: function () {
      return '<span>this is the user firm size</span>';
    },

    siteValuePropResponse: function () {
      return '<span>this is the site value prop response</span>';
    }
  }
}
