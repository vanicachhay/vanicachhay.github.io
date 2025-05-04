
//MATH FUNCTION CODE/ BUMPER CODE FROM https://jsfiddle.net/outis/bA8YE/1/ 
Math.Vector = function (x, y) {
    this.x = x;
    this.y = y;
  };
  Math.Vector.prototype = {
    clone: function () {
      return new Math.Vector(this.x, this.y);
    },
    negate: function () {
      this.x = -this.x;
      this.y = -this.y;
      return this;
    },
    neg: function () {
      return this.clone().negate();
    },
    addeq: function (v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    },
    subeq: function (v) {
      return this.addeq(v.neg());
    },
    add: function (v) {
      return this.clone().addeq(v);
    },
    sub: function (v) {
      return this.clone().subeq(v);
    },
    multeq: function (c) {
      this.x *= c;
      this.y *= c;
      return this;
    },
    diveq: function (c) {
      this.x /= c;
      this.y /= c;
      return this;
    },
    mult: function (c) {
      return this.clone().multeq(c);
    },
    div: function (c) {
      return this.clone().diveq(c);
    },
    dot: function (v) {
      return this.x * v.x + this.y * v.y;
    },
    length: function () {
      return Math.sqrt(this.dot(this));
    },
    normal: function () {
      return this.clone().diveq(this.length());
    }
  };
  //original positions
  let originalGatePos, originalResetPos;
  //number of digits submitted
  let digitCount = 0;
  //function to generate random hex/color for every spawned circle
  function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // random spawn of boxes when any digit stored
  function randomizeGateAndReset() {
    const gate = $("#gate");
    const reset = $("#reset");
  
    const gateW = gate.outerWidth();
    const gateH = gate.outerHeight();
    const resetW = reset.outerWidth();
    const resetH = reset.outerHeight();
  
    const padding = 60;
    const maxWidth = $(window).width();
    const maxHeight = $(window).height();
  
    const gateLeft = Math.random() * (maxWidth - gateW - padding);
    const gateTop = Math.random() * (maxHeight - gateH - 200) + 150;
  
    const resetLeft = Math.random() * (maxWidth - resetW - padding);
    const resetTop = Math.random() * (maxHeight - resetH - 200) + 150;
  
    gate.css({
      left: gateLeft + 'px',
      top: gateTop + 'px'
    });
  
    reset.css({
      left: resetLeft + 'px',
      top: resetTop + 'px'
    });
  }
  
  
  function evade(evt) {
    var $this = $(this),
        offset = $this.offset(),
        center = {
          x: offset.left + $this.outerWidth() / 2,
          y: offset.top + $this.outerHeight() / 2
        }, //center of circle
        dist = new Math.Vector(center.x - evt.pageX, center.y - evt.pageY),
        closest = $this.outerWidth()*1.2; //multiplier of distance added
  
    if (dist.length() >= closest) return; //proximity
  
    var delta = dist.normal().multeq(closest).sub(dist), //new positive
        newCorner = {
          left: offset.left + delta.x,
          top: offset.top + delta.y
        };
  
    // tries to stay in window
    var padding = 20;
    newCorner.left = Math.max(padding, Math.min($(window).width() - $this.outerWidth() - padding, newCorner.left));
    newCorner.top = Math.max(150, Math.min($(window).height() - $this.outerHeight() - padding, newCorner.top)); // doesnt go to title
  
    $this.offset(newCorner);
  
    // creates gate for storing digits and adds reset gate for resetting
    let gate = $("#gate").offset();
    let reset = $("#reset").offset();
    let gateW = $("#gate").width();
    let gateH = $("#gate").height();
    let resetW = $("#reset").width();
    let resetH = $("#reset").height();

    let withinBox = (box, w, h) =>
      newCorner.left > box.left &&
      newCorner.left + $this.width() < box.left + w &&
      newCorner.top + $this.height() > box.top &&
      newCorner.top < box.top + h;

    if (withinBox(gate, gateW, gateH)) {
      storeDigit($this);
      return;
    }

    if (withinBox(reset, resetW, resetH)) {
      $this.remove(); // remove the digit
      resetGame();
      return;
    }

    
  }
  //store digit and convert into text
  function storeDigit($el) {
    let digit = $el.text();
    if (digitCount === 3 || digitCount === 6) {
      $("#stored").append("-"); // insert dash after 3rd and 6th digit
    }
    $("#stored").append(digit);
    digitCount++;
    
    if (digitCount === 10) { //once 10 digits are entered it shows you final and resets and spawns circles
      const number = $("#stored").text().trim();
      alert("hopefully this is your number: "+ number);
      $("#stored").text(""); // Clear stored digits
      digitCount = 0; // Reset digit count
      $(".circle").remove();
      spawnCircles();
      $(".bumper").on("mouseover", beginEvade);
      $(".bumper").on("mouseout", endEvade); 
      return;
    }
  
    $el.remove(); //removes circle when it hits gate and calls spawnCircles function to make it harder
    randomizeGateAndReset();
    spawnCircles();
    $(".bumper").on("mouseover", beginEvade);
    $(".bumper").on("mouseout", endEvade);
  }
  
  function spawnCircles() { //spawn random colored circles 1-9 in different places
  
    for (let i = 0; i <= 9; i++) {
      let $digit = $('<div class="circle bumper">' + i + '</div>');
      let xPos = Math.random() * ($(window).width() - 60);
      let yPos = Math.random() * ($(window).height() - 200) + 30;
  
      // prevent circles from spawning on the gate
      let gate = $("#gate").offset();
      let gateHeight = $("#gate").outerHeight();
      let gateWidth = $("#gate").outerWidth();
  
      if (xPos >= gate.left && xPos <= gate.left + gateWidth && yPos >= gate.top && yPos <= gate.top + gateHeight) {
        yPos += gateHeight + 100; // if spawned near adds 100 to position
      }

      // prevetns circles from spawning on reset
      let reset = $("#reset").offset();
      let resetWidth = $("#reset").outerWidth();
      let resetHeight = $("#reset").outerHeight();

      if (
        xPos >= reset.left && xPos <= reset.left + resetWidth &&
        yPos >= reset.top && yPos <= reset.top + resetHeight
      ) {
        yPos += resetHeight + 100;
      }

  
      $digit.css({
        left: xPos + 'px',
        top: yPos + 'px',
        width: '20px',
        height: '20px',
        backgroundColor: randomColor()  // random color
      });
      
      $("body").append($digit); 
  
      // add random movement every few seconds
      setInterval(() => randomMove($digit), 150);
    }
  }
  //moves circles in random direction times speed
  function randomMove($circle) {
    var randomDirection = Math.random() * Math.PI * 14; 
    var speed = 20; 
  
    var moveX = Math.cos(randomDirection) * speed;
    var moveY = Math.sin(randomDirection) * speed;
  
    var newLeft = $circle.position().left + moveX;
    var newTop = $circle.position().top + moveY;
  
    // prevent circles from moving past window
    newLeft = Math.max(0, Math.min(newLeft, $(window).width() - $circle.outerWidth()));
    newTop = Math.max(150, Math.min(newTop, $(window).height() - 100)); //-100 so doesnt go into title 
  
    $circle.offset({ left: newLeft, top: newTop });
  }
  //functions to avoid mouse on hover
  function beginEvade() {
    $(this).bind("mousemove", evade);
  }
  
  function endEvade() {
    $(this).unbind("mousemove", evade);
  }
  //new function to reset game if balls fall into there
  function resetGame() {
    $("#stored").text(""); 
    digitCount = 0; 
    $(".circle").remove();

    //when reset goes back to original position
    if (originalGatePos) {
      $("#gate").offset(originalGatePos);
    }
    if (originalResetPos) {
      $("#reset").offset(originalResetPos);
    }

    spawnCircles();
    $(".bumper").on("mouseover", beginEvade);
    $(".bumper").on("mouseout", endEvade); 
  }
  

  $(function () {
    spawnCircles();
    originalGatePos = $("#gate").offset();
    originalResetPos = $("#reset").offset();
    $(".bumper").on("mouseover", beginEvade);
    $(".bumper").on("mouseout", endEvade);
  
  
  });