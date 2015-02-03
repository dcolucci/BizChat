var dialogueQueue = [];

for (var i = 0; i < this.DialogueOrder.length; i++) {
  dialogueQueue.push(this.DialogueOrder[i]);
};

var that = this;
while (dialogueQueue.length > 0) {
  that.handleDialogue(dialogueQueue.splice(0,1)[0]);
};

this.endConvo();
