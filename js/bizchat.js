window.BizChat = {

  // Specify the conversational sequence by reordering
  // the dialogue template names in this array.
  // Dialogue names correspond to functions within this.Dialogues
  dialogueOrder: [
    "siteIntro",
    "userIntro",
    "siteValueProp",
    "userValueProp",
    "userFirmSize",
    "siteValuePropResponse"
  ],

  // Store data retrieved from user inputs to send to server
  collectedData: {},

  // Keep track of current line for which user is entering info
  $currentLine: '',

  nextCallback: function () {},

  kickoffChat: function () {
    var index = 0;
    var currDialogue = '';
    var that = this;

    key('return', function () {
      that.submitResponse.call(that);
    });

    var queueDialogue = function (callback) {
      if (index === that.dialogueOrder.length) {
        return;
      }

      currDialogue = that.dialogueOrder[index];
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

    if ($inputLines.length > 0) {
      var that = this;

      var lineQueue = [];
      $inputLines.each (function () {
        lineQueue.push(this);
      });

      var index = 0;
      var queueLine = function (callback) {
        if (index === lineQueue.length) {
          return;
        }

        that.$currentLine = lineQueue[index];
        index++;

        that.nextCallback = queueLine.bind(that, that.appendLine.bind(that));
        callback();
      };

      queueLine(that.appendLine.bind(that));

    } else {
      $('#chat-window').append($html);
    }

    // setTimeout(callback, 2000);
    callback();
  },

  appendLine: function () {
    // this.$currentLine = $line;
    $('#chat-window').append(this.$currentLine);
  },

  submitResponse: function () {
    var response = this.$currentLine.find('.user-response').val();
    // validate response
    // add to collectedData
    console.log(response);
    this.nextCallback();
  },

  endConvo: function () {
    alert("the end");
  },

  Dialogues: {
    siteIntro: function () {
      return '<p>Let us know who you are! Stating what you\'ve done prior to founding your business gives you and the company additional legitimacy and validation.</p>';
    },

    userIntro: function () {
      return "<ul><li>here is one</li><li>here is two<input class='user-response'></input></li><li>here is three</li></ul>";
    },

    siteValueProp: function () {
      return '<p>this is the site value prop</p>';
    },

    userValueProp: function () {
      return '<p>this is the user value prop</p>';
    },

    userFirmSize: function () {
      return '<p>this is the user firm size</p>';
    },

    siteValuePropResponse: function () {
      return '<p>this is the site value prop response</p>';
    }
  }
}
