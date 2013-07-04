Games.Views.Canvas = Backbone.View.extend({

  template: HandlebarsTemplates['canvas/canvas'],

  initialize: function() {
    $('#canvas-container').html(this.render().el);
    this.gallows();
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  callDrawFunctions: function(index) {
    this.drawFunctions()[index](); // get function at index, call it
  },

  drawFunctions: function() {
   return [
      function() {},
      this.noose,
      this.head,
      this.body,
      this.leftLeg,
      this.rightLeg,
      this.leftArm,
      this.rightArm,
      this.sadFace
    ];
  },

  gallows: function() {
    canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(70,290);
    ctx.lineTo(70,25);
    ctx.moveTo(70,25);
    ctx.lineTo(140,25);
    ctx.closePath();
    ctx.stroke();
  },

  noose: function() {
    canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(140,25);
    ctx.lineTo(150,50);
    ctx.closePath();
    ctx.stroke();
  },

  head: function() {
    canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(150,70,20,0,Math.PI*2);
    ctx.closePath();
    ctx.stroke();
  },

  body: function() {
    canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(150, 90);
    ctx.lineTo(150, 140);
    ctx.closePath();
    ctx.stroke();
  },

  leftLeg: function() {
    canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(150, 140);
    ctx.lineTo(125, 190);
    ctx.closePath();
    ctx.stroke();
  },

  rightLeg: function() {
    canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(150, 140);
    ctx.lineTo(175, 190);
    ctx.closePath();
    ctx.stroke();
  },

  leftArm: function() {
    canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(150, 110);
    ctx.lineTo(185, 100);
    ctx.closePath();
    ctx.stroke();
  },

  rightArm: function() {
    canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(150, 110);
    ctx.lineTo(115, 100);
    ctx.closePath();
    ctx.stroke();
  },

  sadFace: function() {
    canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(155,80);
    ctx.arc(150,80,5,0,Math.PI,true);
    ctx.moveTo(145,65);
    ctx.arc(145,65,2,0,Math.PI*2,true);
    ctx.moveTo(155,65);
    ctx.arc(155,65,2,0,Math.PI*2,true);
    ctx.closePath();
    ctx.stroke();
  }

});
