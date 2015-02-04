window.BizChat = {

  // Stores functions to return HTML for dialogues within conversation
  // Order here does not matter -- dialogue sequence should be
  // specified within this.dialogueOrder
  Dialogues: {
    siteIntro: function () {
      return '<p>Let us know who you are! Stating what you\'ve done prior to founding your business gives you and the company additional legitimacy and validation.</p>';
    },

    userIntro: function () {
      return "<ul><li>here is one<input class='user-response'></input></li><li>here is two<input class='user-response'></input></li><li>here is three<input class='user-response'></input></li></ul>";
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
  $currentLine: null,

  // Store callback to call upon user hitting return to enter response
  nextCallback: function () {},

  // Kick off the dialogue sequence between site and user
  // Sequentially calls functions referenced in this.dialogueOrder
  kickoffChat: function () {
    this.bindKeys();

    var index = 0;
    var currDialogue = '';
    var that = this;
    var queueDialogue = function (callback) {
      if (index === that.dialogueOrder.length) {
        that.endConvo();
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

  // Key bindings to be created upon chat kickoff
  bindKeys: function () {
    var that = this;

    key('return', function () {
      that.submitResponse.call(that);
    });
  },

  handleDialogue: function (dialogueName, callback) {
    var $html = $(this.Dialogues[dialogueName]());
    var $inputLines = $($html.find('li'));
    var outerCallback = callback;

    if ($inputLines.length > 0) {
      var that = this;

      var lineQueue = [];
      $inputLines.each (function () {
        lineQueue.push($(this));
      });

      var index = 0;
      var queueLine = function (callback) {
        if (index === lineQueue.length) {
          setTimeout(outerCallback, 1500);
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
      setTimeout(outerCallback, 1500);
    }
  },

  appendLine: function () {
    $('#chat-window').append(this.$currentLine);
  },

  // Called when user hits return
  // Does nothing unless this.$currentLine is non-null
  submitResponse: function () {
    if (this.$currentLine === null) {
      return;
    }

    var response = this.$currentLine.find('.user-response').val();

    // validate response
    // add to collectedData

    console.log(response);

    this.$currentLine = null;
    this.nextCallback();
  },

  // Logic to be carried out on conversation end
  endConvo: function () {
    // Add logic for desired behavior
    // e.g., send this.collectedData to server
  },
}
