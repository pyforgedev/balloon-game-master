var balloon = $(".balloon");
var counter = 0;
var audioPool = [];
var isPaused = false;
var activeTimeouts = [];
var audioCtx = null;
var bgmNode = null;
var musicEnabled = true;
var sfxEnabled = true;

function playBGM() {
  if (!musicEnabled) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create oscillator nodes for a simple retro chiptune loop
    var osc1 = audioCtx.createOscillator();
    var osc2 = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();
    
    osc1.type = 'triangle';
    osc2.type = 'sine';
    
    // Minimalistic bassline and melody frequencies
    var bassline = [110, 130, 146, 165, 110, 130, 146, 165];
    var melody = [220, 261, 293, 329, 392, 329, 293, 220];
    
    var tempo = 0.25; // timing in seconds
    var time = audioCtx.currentTime;
    
    // Schedule loop
    for (var i = 0; i < 150; i++) {
      var noteIndex = i % bassline.length;
      osc1.frequency.setValueAtTime(bassline[noteIndex], time + (i * tempo));
      osc2.frequency.setValueAtTime(melody[noteIndex] * 1.5, time + (i * tempo));
    }
    
    gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime); // keep it soft
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc1.start();
    osc2.start();
    
    bgmNode = {
      stop: function() {
        try {
          osc1.stop();
          osc2.stop();
        } catch(e) {}
      },
      pause: function() {
        if (audioCtx.state === 'running') {
          audioCtx.suspend();
        }
      },
      resume: function() {
        if (audioCtx.state === 'suspended' && musicEnabled) {
          audioCtx.resume();
        }
      }
    };
  } catch(e) {
    console.warn("Web Audio API not supported or blocked");
  }
}

function createAudioPool(src, size) {
  var pool = [];
  for (var i = 0; i < size; i++) {
    var audio = new Audio(src);
    audio.preload = "auto";
    pool.push(audio);
  }
  return pool;
}

function playSound(pool) {
  if (!sfxEnabled) return;
  for (var i = 0; i < pool.length; i++) {
    if (pool[i].paused) {
      pool[i].play();
      return;
    }
  }
  pool[0].play();
}

function clearAllGameTimeouts() {
  activeTimeouts.forEach(function(t) {
    clearTimeout(t);
  });
  activeTimeouts = [];
}

function start() {
  var balloonColors = [
    {main: ['#ff6b9d', '#c44569'], stroke: '#8b2e4d'},
    {main: ['#4facfe', '#00f2fe'], stroke: '#0284c7'},
    {main: ['#43e97b', '#38f9d7'], stroke: '#059669'},
    {main: ['#fa709a', '#fee140'], stroke: '#dc2626'},
    {main: ['#a8edea', '#fed6e3'], stroke: '#7c3aed'},
    {main: ['#ffecd2', '#fcb69f'], stroke: '#ea580c'}
  ];

  var totalBalloons = 20;
  var resolvedBalloons = 0;
  var gameEnded = false;

  function checkGameOver() {
    resolvedBalloons++;
    if (resolvedBalloons >= totalBalloons && !gameEnded) {
      endGame();
    }
  }

  function endGame() {
    if (gameEnded) return;
    gameEnded = true;
    clearAllGameTimeouts();
    if (bgmNode) {
      bgmNode.stop();
    }
    $('.balloon').stop(true, false).fadeOut(300);
    
    var winQuotes = [
      "Sharpshooter status unlocked! Perfect 20/20!",
      "Aim bot absolute! You popped them all!",
      "Magnificent! No balloon stood a chance!",
      "Legendary shooting! 100% accuracy!",
      "Unstoppable! You are a true marksman!"
    ];
    
    var loseQuotes = [
      "Missed some? The balloons mock your aim!",
      "Gravity: 1. You: 0. Try again!",
      "Balloons flew away laughing. Better luck next time!",
      "Close one! But the balloons escaped!",
      "Not bad, but those balloons are pretty fast!"
    ];

    var finalQuote = (counter === totalBalloons) 
      ? winQuotes[Math.floor(Math.random() * winQuotes.length)]
      : loseQuotes[Math.floor(Math.random() * loseQuotes.length)];
      
    $('.score-box .quote-text').text(finalQuote);
    $('.score-box').addClass('ready');
    $('.replay').off('click').on('click', function(e) {
      e.preventDefault();
      window.location.reload();
    });
  }

  for (var i = 0; i < totalBalloons; i++) {
    (function(index) {
      var t = setTimeout(function() {
        if (gameEnded || isPaused) return;

        var balloonCopy = balloon.clone();
        var color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        
        var gradientId = 'balloonGrad' + index;
        var shineId = 'shine' + index;
        
        var svg = balloonCopy.find('svg');
        svg.find('linearGradient').attr('id', gradientId);
        svg.find('radialGradient').attr('id', shineId);
        svg.find('ellipse').first().attr('fill', 'url(#' + gradientId + ')').attr('stroke', color.stroke);
        svg.find('ellipse').eq(1).attr('fill', 'url(#' + shineId + ')');
        svg.find('path').first().attr('stroke', color.stroke);
        svg.find('circle').attr('fill', color.stroke);
        svg.find('path').eq(1).attr('fill', color.stroke);
        svg.find('path').eq(2).attr('fill', color.stroke);
        
        svg.find('linearGradient stop').eq(0).attr('style', 'stop-color:' + color.main[0] + ';stop-opacity:1');
        svg.find('linearGradient stop').eq(1).attr('style', 'stop-color:' + color.main[1] + ';stop-opacity:1');
        
        var startLeft = Math.random() * 100;
        balloonCopy.css({
          left: startLeft + '%',
          bottom: '-150px'
        });
        balloonCopy.appendTo("body");
        
        balloonCopy.on('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (isPaused || gameEnded) return;
          var clickedBalloon = $(this);
          if (clickedBalloon.data('clicked')) {
            return;
          }
          clickedBalloon.data('clicked', true);
          
          playSound(audioPool);
          clickedBalloon.stop(true, false);
          clickedBalloon.fadeOut(150, function() {
            clickedBalloon.remove();
            checkGameOver();
          });
          counter = counter + 1;
          $(".counter").html(counter);
        });
        
        var randomDuration = 16000 - Math.random() * 4000;
        var randomEndLeft = Math.random() * 100;
        
        balloonCopy.animate({
          bottom: "110%", 
          left: randomEndLeft + "%"
        }, randomDuration, 'linear', function() {
          $(this).remove();
          checkGameOver();
        });
        
      }, index * 500);
      activeTimeouts.push(t);
    })(i);
  }

  // Backup safety timeout
  var safetyTimeout = window.setTimeout(function() {
    if (!gameEnded) {
      endGame();
    }
  }, 26000);
  activeTimeouts.push(safetyTimeout);

  balloon.remove();

  // Settings Handlers
  $('.settings-btn').off('click').on('click', function(e) {
    e.stopPropagation();
    $('.settings-container').toggleClass('open');
  });

  $(document).on('click', function() {
    $('.settings-container').removeClass('open');
  });

  function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
      $('#pause-btn').text('Resume').addClass('paused');
      $('.pause-overlay').addClass('active');
      if (bgmNode) {
        bgmNode.pause();
      }
      $('.balloon').addClass('paused-state').each(function() {
        $(this).stop(true, false);
      });
    } else {
      $('#pause-btn').text('Pause').removeClass('paused');
      $('.pause-overlay').removeClass('active');
      if (bgmNode) {
        bgmNode.resume();
      }
      $('.balloon').removeClass('paused-state').each(function() {
        var currentBottom = $(this).css('bottom');
        var remainingPct = (parseFloat($(window).height()) - parseFloat(currentBottom)) / parseFloat($(window).height());
        var randomEndLeft = Math.random() * 100;
        $(this).animate({
          bottom: "110%",
          left: randomEndLeft + "%"
        }, 12000 * remainingPct, 'linear', function() {
          $(this).remove();
          checkGameOver();
        });
      });
    }
  }

  $('#pause-btn').off('click').on('click', function() {
    togglePause();
  });

  $('#resume-overlay-btn').off('click').on('click', function() {
    togglePause();
  });

  $('#bgm-toggle-btn').off('click').on('click', function() {
    musicEnabled = !musicEnabled;
    if (musicEnabled) {
      $(this).text('Music: ON');
      if (!bgmNode) {
        playBGM();
      } else {
        bgmNode.resume();
      }
    } else {
      $(this).text('Music: OFF');
      if (bgmNode) {
        bgmNode.pause();
      }
    }
  });

  $('#sfx-toggle-btn').off('click').on('click', function() {
    sfxEnabled = !sfxEnabled;
    if (sfxEnabled) {
      $(this).text('SFX: ON');
    } else {
      $(this).text('SFX: OFF');
    }
  });

  $('#reset-btn').off('click').on('click', function() {
    window.location.reload();
  });
}

function preloadPopSound() {
  audioPool = createAudioPool('Shotgun.mp3', 5);
  
  // Set up start button
  $('#start-game-btn').on('click', function() {
    $('.welcome-overlay').fadeOut(300, function() {
      $(this).remove();
      start();
      playBGM();
    });
  });
}

preloadPopSound();
