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
    var dropSpeed = .35;
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
    /*Loading Fireball Texture*/
    var fireballTex = THREE.ImageUtils.loadTexture("Images/fireball.jpg");
    console.log(fireballTex);

    /*Snowman*/
    var snowman = new Snowman();

    /*Fireballs*/
    array.push(new Fireball(fireballTex));
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
                snowman.position.z -= 2;
                break;
            case 83: //S
                snowman.rotateY(0.2);
                snowman.position.z += 2;
                break;
            case 65: //A
                snowman.rotateY(0.2);
                snowman.position.x -= 2;
                break;
            case 68: // D
                snowman.rotateY(0.2);
                snowman.position.x += 2;
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

    var gameLost = function(type)
    {
        console.log(type);
        if(type)
        {
            snowman.position.y -= 1;
            snowman.rotateY(1.5);
            if(snowman.position.y < -100)
            {
                setAlert();
            }
        }
        else
        {
            console.log("here");
            snowman.position.z -= 1;
            snowman.rotateY(1.5);
            if(snowman.position.z < -20) {
                snowman.position.y -= 1;
                if(snowman.position.y < -100)
                    setAlert();
            }
        }
    };

    var setAlert = function()
    {
        gameOver = true;
        if(!alert("Game Over"))
            window.location.reload();
    };


    //////////////////////////////////////////////////////////////////////////////////
    //		Rendering Loop runner						//
    //////////////////////////////////////////////////////////////////////////////////
    var lastTimeMsec= null;
    var gameOver = false;
    requestAnimationFrame(function animate(nowMsec){

        if(!gameOver)
            requestAnimationFrame( animate );
        else
            return;

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
            gameLost(true);
        }
        else
        if(snowmanHit){
            for(var i = 0; i < array.length; i++){
                scene.remove(array[i]);
            }
            gameLost(false);
        } else
        {
            document.getElementById("Score").textContent = "Score: " + clock.getElapsedTime() + " sec";
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
                array.push(new Fireball(fireballTex));
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

