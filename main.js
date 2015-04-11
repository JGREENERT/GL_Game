require([], function(){
    // detect WebGL
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
    document.body.appendChild(gbox);
    gbox.appendChild( renderer.domElement );

    // setup a scene and camera
    var scene	= new THREE.Scene();
    var camera	= new THREE.PerspectiveCamera(60, CANVAS_WIDTH / CANVAS_HEIGHT, 0.01, 1000);
    camera.position.y = 30;
    camera.position.z = 40;

    var onRenderFcts= [];

    // handle window resize events
    var winResize	= new THREEx.WindowResize(renderer, camera);

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
    var snowman = new Snowman();
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

    /*
    onRenderFcts.push(function(delta, now){
        camera.position.x += (mouse.x*30 - camera.position.x) * (delta*3);
        camera.position.y += (mouse.y*30 - camera.position.y) * (delta*3);
        camera.lookAt( scene.position )
    });
    */

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
            case 48:
                break;
            case 70:
                break;
            case 71:
                break;
            case 80:
                break;
            case 37:
                break;
            case 38:
                break;
            case 39:
                break;
            case 40:
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
    var grass_tex = THREE.ImageUtils.loadTexture("Images/snow.jpg");
    grass_tex.repeat.set(4,4);
    grass_tex.wrapS = THREE.RepeatWrapping;
    grass_tex.wrapT = THREE.RepeatWrapping;
    var groundPlane = new THREE.PlaneBufferGeometry(40, 40, 10, 10);
    var groundMat = new THREE.MeshPhongMaterial({color:0xDBFFFF, ambient:0xDBFFFF, map:grass_tex});
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
    //		Rendering Loop runner						//
    //////////////////////////////////////////////////////////////////////////////////
    var lastTimeMsec= null;
    requestAnimationFrame(function animate(nowMsec){

        requestAnimationFrame( animate );

        lastTimeMsec	= lastTimeMsec || nowMsec-1000/60;
        var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec);
        lastTimeMsec	= nowMsec;

        //TODO: Add Movement and Collision Checking Here

        /*Add Code Inside if you want to be able to pause it*/
        if(!pauseAnim) {

            }

        // call each update function
        onRenderFcts.forEach(function(f){
            f(deltaMsec/1000, nowMsec/1000)
        });
    })
});

