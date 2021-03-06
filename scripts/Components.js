/* =========================================================================
 *
 * Components.js
 *  This contains all components for the tutorial (ideally, components would
 *  each live in their own module)
 *
 *  Components are just data. 
 *
 * ========================================================================= */
;(function(){
    // XXXXXXXXXXXXXXXXXXXXXXXXXX
    // TODO: this is gnarly, needs to be refactor
    var IMAGES = {
        boxman1: new Image(),
        boxgirl1: new Image(),
        boxpac: new Image(),
        boxrobot: new Image(),
        boxzombie: new Image(),
        reddrangle: new Image(),
        boxghost: new Image()
    };
    HUNGRYBOX._images = IMAGES;

    HUNGRYBOX.skinsInfo = [
        { sprite: 'boxman1', name: 'Default' },
        {
            sprite: 'boxgirl1', name: 'Wifey',
            unlock: { highScore: 100 }
        },
        {
            sprite: 'boxrobot', name: 'RoboRect',
            unlock: { highScore: 350 }
        },
        {
            sprite: 'reddrangle', name: 'ReddRangle',
            unlock: { highScore: 620 }
        },
        {
            sprite: 'boxzombie', name: 'Zombox',
            unlock: { deaths: 60 }
        },
        {
            sprite: 'boxpac', name: 'PacRect',
            unlock: { totalRectsEaten: 20000 }
        },
        // TODO: Add more unlocks
        {
            sprite: 'boxghost', name: 'Ghost',
            unlock: { totalRectsEaten: 10000000, hide: true }
        },
    ];

    // setup src of images
    _.each(IMAGES, function(val, key){
        IMAGES[key].src = HUNGRYBOX.config.imageHostPrefix + key + '.png';
    });
    // XXXXXXXXXXXXXXXXXXXXXXXXXX

    // Appearance 
    // --------------------------------------
    HUNGRYBOX.Components.Appearance = function ComponentAppearance ( params ){
        // Appearance specifies data for color and size
        params = params || {};

        this.colors = params.colors;
        if(!this.colors){
            // generate random color if not passed in (get 6 random hex values)
            this.colors = {
                r: 255,
                g: 255,
                b: 255
            };
        }

        this.size = params.size || (1 + (Math.random() * 30 | 0));

        return this;
    };
    HUNGRYBOX.Components.Appearance.prototype.name = 'appearance';

    // Appearance - Image
    // -------------------------------------- 
    HUNGRYBOX.Components.AppearanceImage = function ComponentAppearanceImage ( params ){
        params = params || {};

        // name matches key in IMAGES object
        this.sprite = params.sprite || 'boxman1';

        // NOTE: size is retrieved from appearance component
        this.image = IMAGES[this.sprite];

        return this;
    };
    HUNGRYBOX.Components.AppearanceImage.prototype.name = 'appearanceImage';

    // Health
    // --------------------------------------
    HUNGRYBOX.Components.Health = function ComponentHealth ( value ){
        value = value || 20;
        this.value = value;

        return this;
    };
    HUNGRYBOX.Components.Health.prototype.name = 'health';

    // Position
    // --------------------------------------
    HUNGRYBOX.Components.Position = function ComponentPosition ( params ){
        params = params || {};

        // Generate random values if not passed in
        // NOTE: For the tutorial we're coupling the random values to the canvas'
        // width / height, but ideally this would be decoupled (the component should
        // not need to know the canvas's dimensions)
        this.x = params.x || this.generateX();
        this.y = params.y || this.generateY();

        return this;
    };
    HUNGRYBOX.Components.Position.prototype.generateX = function(){
        return 20 + (Math.random() * (HUNGRYBOX.$canvas.width - 20) | 0);
    };
    HUNGRYBOX.Components.Position.prototype.generateY = function(){
        return 20 + (Math.random() * (HUNGRYBOX.$canvas.height - 20) | 0);
    };
    HUNGRYBOX.Components.Position.prototype.name = 'position';

    // playerControlled 
    // --------------------------------------
    HUNGRYBOX.Components.PlayerControlled = function ComponentPlayerControlled ( params ){
        this.pc = true;
        return this;
    };
    HUNGRYBOX.Components.PlayerControlled.prototype.name = 'playerControlled';

    // otherPlayer
    // --------------------------------------
    HUNGRYBOX.Components.OtherPlayer = function ComponentOtherPlayer ( params ){
        // if this box was another player
        this.otherPlayer = true;

        this.playerName = params.playerName || 'AnonymousCoward';
        this.isGood = params.isGood !== undefined ? params.isGood : true;

        return this;
    };
    HUNGRYBOX.Components.OtherPlayer.prototype.name = 'otherPlayer';

    // Collision
    // --------------------------------------
    HUNGRYBOX.Components.Collision = function ComponentCollision ( params ){
        this.collides = true;
        return this;
    };
    HUNGRYBOX.Components.Collision.prototype.name = 'collision';
})();
