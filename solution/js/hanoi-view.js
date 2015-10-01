(function() {
  window.Hanoi = window.Hanoi || {};

  var View = window.Hanoi.View = function(game, $el) {
    this.$el = $el;
    this.game = game;
    this.setupTowers();
    this.render();
    this.attachListeners();
    this.firstTower = null;
  }

  View.prototype.setupTowers = function() {
    var towers = "<ul class='towers group'></ul>";
    this.$el.append(towers);
    var tower = "<li class='tower'></li>"
    var $towersList = this.$el.find(".towers");
    for(var i = 0; i< 3; i++){
      $towersList.append(tower);
    }
  }

  View.prototype.render = function() {
    var towers = this.game.towers;
    var currentTower;
    for(var i = 0; i < 3; i++){
      currentTower = towers[i];
      var $currentTower = $(".tower:nth-child(" + (i + 1) + ")");
      $currentTower.html(this.populateTower(currentTower));
    }
  }

  View.prototype.populateTower = function(tower) {
    var towerString = "";
    for (var i = 0; i < tower.length; i++) {
      var idString = "id='ring"+tower[i]+"'"
      towerString = "<li class='ring'"+idString+">" + " " + "</li>" + towerString;
    }
    return "<ul>" + towerString + "</ul>";
  }

  // View.prototype.getMove = function () {
  //   var firstTower =
  // };

  View.prototype.attachListeners = function () {
    var view = this;
    this.$el.on("click", ".tower", function(e){
      var $tower = $(e.currentTarget);
      var idx = $(".tower").index($tower);
      if (view.firstTower === null){
        view.firstTower = idx;

        $tower.toggleClass("clicked");
      } else {
        view.game.move(view.firstTower, idx);
        $(".tower:nth-child(" + (view.firstTower+1) + ")").toggleClass("clicked");
        view.firstTower = null;
        view.render();
        view.checkWin();
      }
    })
  };

  View.prototype.checkWin = function() {
    if (this.game.isWon()) {
      alert('YOU WON');
    }
  };
})();
