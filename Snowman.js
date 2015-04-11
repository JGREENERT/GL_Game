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

    var hatMat = new THREE.MeshPhongMaterial({color: 0x808080});

    var hatTop = new THREE.Mesh(hatTopGeo, hatMat);
    var hatBrim = new THREE.Mesh(hatBrimGeo, hatMat);

    var hat = new THREE.Group();

    hatTop.translateY(0.25);

    hat.add(hatTop);
    hat.add(hatBrim);

    /*arm*/


    var arm1 = new THREE.group();
    var amr2 = new THREE.group();

    /*Grouping*/
    var snowmanGroup = new THREE.Group();

    hat.translateY(8.5);

    snowmanGroup.add(body);
    snowmanGroup.add(hat);

    return snowmanGroup;
};

Snowman.prototype = Object.create(THREE.Object3D.prototype);
Snowman.prototype.constructor = Snowman;
