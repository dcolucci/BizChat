window.BizChat = {

  // Stores functions to return HTML for dialogues within conversation
  // Order here does not matter -- dialogue sequence should be
  // specified within this.dialogueOrder
  Dialogues: {
    siteIntro: function () {
      return '<p>Let us know who you are! Stating what you\'ve done prior to founding your business gives you and the company additional legitimacy and validation.</p>';
    },

    userIntro: function () {
      return "<ul><li>My name is<form class='user-response-form'><input class='user-input' id='user-name'></input></form></li><li>and I'm the<form class='user-response-form'><input class='user-input' id='user-title'></input></form></li><li>of<form class='user-response-form'><input class='user-input' id='user-company-name'></input></form></li><li>Prior to starting this company, I<form class='user-response-form'><input class='user-input' id='user-background'></input></form></li><li>where I<form class='user-response-form'><input class='user-input' id='user-accomplishment'></input></form></li></ul>";
    },

    siteValueProp: function () {
      return "<p>Impressive! I'd love to hear more about your company. Let's start with your value proposition.</p>";
    },

    userValueProp: function () {
      return "<ul><li>For<form class='user-response-form'><input class='user-input' id='target-customers'></input></form></li><li>who/that<form class='user-response-form'><input class='user-input' id='pain-point'></input></form></li><li>,<form class='user-response-form'><input class='user-input' id='product-name'></input></form></li><li>is<form class='user-response-form'><input class='user-input' id='product-type'></input></form></li><li>that<form class='user-response-form'><input class='user-input' id='key-benefits'></input></form></li></ul>";
    },

    userFirmSize: function () {
      return "<ul><li>My team has<form class='user-response-form'><input class='user-input' id='firm-size'></input></form></li></ul>";
    },

    siteValuePropResponse: function () {
      return "<p>Very nice. Being able to clearly articulate your target customers, their challenges and how you solve them is critical.</p>";
    }
  },

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

  // Store data retrieved from user responses
  collectedData: {},

  // Keep track of current line for which user is entering info
  $currentLine: null,

  // Store callback to call upon user hitting return to enter response
  nextCallback: function () {},

  // Kick off the dialogue sequence between site and user
  // Sequentially calls functions referenced in this.dialogueOrder
  kickoffChat: function () {
    this.bindSubmitHandler();

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

  // Bind event handler to chat window for form submissions
  bindSubmitHandler: function () {
    $('#chat-window').on(
      'submit',
      '.user-response-form',
      this.submitResponse.bind(this)
    );
  },

  // Processes a dialogue
  // Processes response collection within dialogue
  handleDialogue: function (dialogueName, callback) {
    var $html = $(this.Dialogues[dialogueName]());
    var $dialogueHolder = $('<div>')
      .addClass('large-12')
      .addClass('columns');
    var $dialogueBubble = $('<div>')
      .addClass('dialogue-bubble')
      .addClass('large-6')
      .addClass('columns');
    $dialogueHolder.append($dialogueBubble);
    $('#chat-window').append($dialogueHolder);

    var $inputLines = $($html.find('li'));
    var outerCallback = callback;

    if ($inputLines.length > 0) {
      var that = this;
      var $list = $('<ul>');
      $dialogueBubble.append($list);
      $dialogueBubble.addClass('user-response');

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

        that.nextCallback = queueLine.bind(that, that.appendLine.bind(that, $list));
        callback();
      };

      queueLine(that.appendLine.bind(that, $list));

    } else {
      $dialogueBubble.addClass('site-response');
      $dialogueBubble.append($html);
      setTimeout(outerCallback, 1500);
    }
  },

  // Appends this.$currentLine to $el
  appendLine: function ($el) {
    $el.append(this.$currentLine);
    $el.find('.user-input').focus();
  },

  // Called when user hits return
  // Does nothing unless this.$currentLine is non-null
  submitResponse: function (event) {
    event.preventDefault();

    if (this.$currentLine === null) {
      return;
    }

    var response = this.$currentLine.find('.user-input').val();

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
