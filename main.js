require([], function(){
    if( !Detector.webgl ){
        Detector.addGetWebGLMessage();
        throw 'WebGL Not Available'
    }
    // setup webgl renderer full page
    var renderer	= new THREE.WebGLRenderer();
    var CANVAS_WIDTH = 600, CANVAS_HEIGHT = 400;
    renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
    var gbox = document.getElementById('graphicsbox');
    var pauseAnim = false;
    var array = [];
    var dropSpeed = .12;
    var addFire = false;
    var snowmanHit = false;
    document.body.appendChild(gbox);
    gbox.appendChild( renderer.domElement );

    // setup a scene and camera
    var scene	= new THREE.Scene();
    var camera	= new THREE.PerspectiveCamera(60, CANVAS_WIDTH / CANVAS_HEIGHT, 0.01, 1000);
    camera.position.y = 25;
    camera.position.z = 45;

    var onRenderFcts= [];

    // handle window resize events
    var winResize	= new THREEx.WindowResize(renderer, camera);

    //Start Game Clock
    var clock = new THREE.Clock();
    clock.start();

    //////////////////////////////////////////////////////////////////////////////////
    //		default 3 points lightning					//
    //////////////////////////////////////////////////////////////////////////////////

    //TODO: Add Lighting Here
    /*Moon Light*/
    var ambientLight= new THREE.AmbientLight(0xFFFFFF);
    ambientLight.position.set(16, -23, -15);
    scene.add( ambientLight);

    //////////////////////////////////////////////////////////////////////////////////
    //		add an object and make it move					//
    //////////////////////////////////////////////////////////////////////////////////

    //TODO: Add Objects Here
    /*Snowman*/
    var snowman = new Snowman();

    // var raindrop = new Raindrop();
    array.push(new Raindrop());
    for(var i = 0; i < 1; i++){
        array[i].position.y = 25+i;
        array[i].position.z = Math.random() * 30 - 10;
        array[i].position.x = Math.random() * 30 - 10;
        scene.add(array[i]);
    }
    scene.add(snowman);

    camera.lookAt(new THREE.Vector3(0, 5, 0));
    //////////////////////////////////////////////////////////////////////////////////
    //		Camera Controls							//
    //////////////////////////////////////////////////////////////////////////////////
    var mouse	= {x : 0, y : 0};
    document.addEventListener('mousemove', function(event){
        mouse.x	= ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.width ) * 2 - 1;
        mouse.y	= 1 - ((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height);
    }, false);

    //////////////////////////////////////////////////////////////////////////////////
    //		Button Controls							//
    //////////////////////////////////////////////////////////////////////////////////
    window.addEventListener("keydown", moveSomething, false);
    window.addEventListener("keyup", moveSomethingelse, false);

    var keys = [];

    function moveSomething(e) {
        switch (e.keyCode) {
            case 87: // W
                snowman.rotateY(0.2);
                snowman.position.z -= 1;
                break;
            case 83: //S
                snowman.rotateY(0.2);
                snowman.position.z += 1;
                break;
            case 65: //A
                snowman.rotateY(0.2);
                snowman.position.x -= 1;
                break;
            case 68: // D
                snowman.rotateY(0.2);
                snowman.position.x += 1;
                break;
        }
    }

    function moveSomethingelse(e) {
        keys[e.keyCode] = false;
    }

    //////////////////////////////////////////////////////////////////////////////////
    //		Texture Mapping						//
    //////////////////////////////////////////////////////////////////////////////////

    /*Ground*/
    var snowTex = THREE.ImageUtils.loadTexture("Images/snow2.jpg");
    snowTex.repeat.set(4,4);
    snowTex.wrapS = THREE.RepeatWrapping;
    snowTex.wrapT = THREE.RepeatWrapping;
    var groundPlane = new THREE.PlaneBufferGeometry(40, 40, 10, 10);
    var groundMat = new THREE.MeshPhongMaterial({color:0xDBFFFF, ambient:0xDBFFFF, map:snowTex});
    var ground = new THREE.Mesh (groundPlane, groundMat);
    ground.rotateX(THREE.Math.degToRad(-90));
    scene.add (ground);

    //////////////////////////////////////////////////////////////////////////////////
    //		render the scene						//
    //////////////////////////////////////////////////////////////////////////////////
    onRenderFcts.push(function(){
        renderer.render( scene, camera );
    });

    //////////////////////////////////////////////////////////////////////////////////
    //		Lose Animation					//
    //////////////////////////////////////////////////////////////////////////////////

    var gameLost = function()
    {
        console.log("Lost");
        snowman.position.y -= 1;
        snowman.rotateY(1.5);
    };

    var gameHitLost = function(){
        snowman.rotateY(1.5);
        document.getElementById("endMsg").innerHTML = "Game Over!";
    }

    //////////////////////////////////////////////////////////////////////////////////
    //		Rendering Loop runner						//
    //////////////////////////////////////////////////////////////////////////////////
    var lastTimeMsec= null;
    requestAnimationFrame(function animate(nowMsec){

        requestAnimationFrame( animate );

        lastTimeMsec	= lastTimeMsec || nowMsec-1000/60;
        var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec);
        lastTimeMsec	= nowMsec;

        //TODO: Add Movement and Collision Checking Here

        for(var i = 0; i < array.length; i++){
            if(array[i].position.y < 4 && array[i].position.x -2 < snowman.position.x &&
                array[i].position.x +2 > snowman.position.x && array[i].position.z -2 < snowman.position.z &&
                array[i].position.z +2 > snowman.position.z){
                snowmanHit = true;
            }
        }
        /*Check to see if character is off map*/
        if(snowman.position.x > 20 || snowman.position.x < -20 || snowman.position.z > 20
            || snowman.position.z < -20) {
            gameLost();
        }
        else
        if(snowmanHit){
            for(var i = 0; i < array.length; i++){
                scene.remove(array[i]);
            }
            gameHitLost();
        } else
        {
            document.getElementById("Score").textContent = "Score: " + clock.getElapsedTime() + " sec";
        }

        /*Add Code Inside if you want to be able to pause it*/
        if(!pauseAnim) {

        }

        // call each update function
        for(var i = 0; i < array.length; i++){
            if(array[i].position.y >= 0) {
                array[i].position.y -= dropSpeed;
            } else{
                array[i].position.y = 25;
                array[i].position.z = Math.random() * 30 - 10;
                array[i].position.x = Math.random() * 30 - 10;
            }
        }
        if(clock.getElapsedTime() % 10 < 1){
            if(addFire) {
                dropSpeed += .03;
                array.push(new Raindrop());
                array[array.length-1].position.y = 25 + i;
                array[array.length-1].position.z = Math.random() * 30 - 10;
                array[array.length-1].position.x = Math.random() * 30 - 10;
                scene.add(array[array.length-1]);
                addFire = false;
            }
        }
        if(clock.getElapsedTime() % 10 > 1){
            addFire = true;
        }
        onRenderFcts.forEach(function(f){
            f(deltaMsec/1000, nowMsec/1000)
        });
    })
});

