window.BizChat = {
  TemplateOrder: [
    "this",
    "is",
    "the",
    "sample",
    "template",
    "order"
  ],

  TemplateQueue: [],

  initialize: function () {
    for (var i = 0; i < this.TemplateOrder.length; i++) {
      this.TemplateQueue.push(this.TemplateOrder[i]);
    };

    while (this.TemplateQueue.length > 0) {
      this.handleTemplate(this.TemplateQueue.splice(0,1)[0]);
    };

    this.endConvo();
  },

  handleTemplate: function (templateName) {
    console.log(templateName);
  },

  endConvo: function () {
    alert("the end");
  }
}
