Snowman = function(){
    /*body*/
    var snowTex = THREE.ImageUtils.loadTexture("Images/snow.jpg");
    snowTex.repeat.set(4, 4);
    snowTex.wrapS = THREE.RepeatWrapping;
    snowTex.wrapT = THREE.RepeatWrapping;

    var bottomGeo = new THREE.SphereGeometry(2.5, 10, 10);
    var middleGeo = new THREE.SphereGeometry(2, 10, 10);
    var topGeo = new THREE.SphereGeometry(1, 10, 10);

    var snowMat = new THREE.MeshPhongMaterial({color: 0xDBFFFF, ambient: 0xDBFFFF, map:snowTex});

    var bottom = new THREE.Mesh(bottomGeo, snowMat);
    var middle = new THREE.Mesh(middleGeo, snowMat);
    var top = new THREE.Mesh(topGeo, snowMat);

    var body = new THREE.Group();

    bottom.translateY(2.5);
    middle.translateY(5.5);
    top.translateY(8);

    body.add(bottom);
    body.add(middle);
    body.add(top);

    /*hat*/
    var hatTopGeo = new THREE.CylinderGeometry(1, 1, 1, 10, 10);
    var hatBrimGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.25, 10, 10);

    var hatMat = new THREE.MeshPhongMaterial({color: 0x0000FF});

    var hatTop = new THREE.Mesh(hatTopGeo, hatMat);
    var hatBrim = new THREE.Mesh(hatBrimGeo, hatMat);

    var hat = new THREE.Group();

    hatTop.translateY(0.25);

    hat.add(hatTop);
    hat.add(hatBrim);

    /*arm*/
    var shoulderGeo = new THREE.CylinderGeometry(0.25, 0.25, 2, 10, 10);
    var fingerGeo = new THREE.CylinderGeometry(0.15, 0.15, 1, 10, 10);

    var armMat = new THREE.MeshPhongMaterial({color: 0x0000FF});

    var shoulder1 = new THREE.Mesh(shoulderGeo, armMat);
    var finger1 = new THREE.Mesh(fingerGeo, armMat);
    var finger2 = new THREE.Mesh(fingerGeo, armMat);
    var finger3 = new THREE.Mesh(fingerGeo, armMat);
    var shoulder2 = new THREE.Mesh(shoulderGeo, armMat);
    var finger4 = new THREE.Mesh(fingerGeo, armMat);
    var finger5 = new THREE.Mesh(fingerGeo, armMat);
    var finger6 = new THREE.Mesh(fingerGeo, armMat);

    shoulder1.translateY(6);
    shoulder1.translateX(2.5);
    shoulder1.rotateZ(1.5);
    finger1.translateY(6.5);
    finger1.translateX(3.5);
    finger1.rotateZ(-0.30);
    finger2.translateY(6);
    finger2.translateX(4);
    finger2.rotateZ(-1.5);
    finger3.translateY(5.5);
    finger3.translateX(3.5);
    finger3.rotateZ(0.30);

    shoulder2.translateY(6);
    shoulder2.translateX(-2.5);
    shoulder2.rotateZ(1.5);
    finger4.translateY(6.5);
    finger4.translateX(-3.5);
    finger4.rotateZ(0.30);
    finger5.translateY(6);
    finger5.translateX(-4);
    finger5.rotateZ(1.5);
    finger6.translateY(5.5);
    finger6.translateX(-3.5);
    finger6.rotateZ(-0.30);

    var arm1 = new THREE.Group();
    var arm2 = new THREE.Group();

    arm1.add(shoulder1);
    arm1.add(finger1);
    arm1.add(finger2);
    arm1.add(finger3);

    arm2.add(shoulder2);
    arm2.add(finger4);
    arm2.add(finger5);
    arm2.add(finger6);

    /*eye*/

    var eyeGeo = new THREE.SphereGeometry(0.15, 10, 10);

    var eyeMat = new THREE.MeshPhongMaterial({color: 0xff0000});

    var eye1 = new THREE.Mesh(eyeGeo, eyeMat);
    var eye2 = new THREE.Mesh(eyeGeo, eyeMat);

    eye1.translateY(8);
    eye1.translateZ(1);
    eye1.translateX(-0.5);
    eye2.translateY(8);
    eye2.translateZ(1);
    eye2.translateX(0.5);

    var eyes = new THREE.Group();

    eyes.add(eye1);
    eyes.add(eye2);

    /*Grouping*/
    var snowmanGroup = new THREE.Group();

    hat.translateY(8.5);

    snowmanGroup.add(body);
    snowmanGroup.add(hat);
    snowmanGroup.add(arm1);
    snowmanGroup.add(arm2);
    snowmanGroup.add(eyes);

    return snowmanGroup;
};

Snowman.prototype = Object.create(THREE.Object3D.prototype);
Snowman.prototype.constructor = Snowman;
