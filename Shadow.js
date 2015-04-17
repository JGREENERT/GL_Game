/**
 * Created by Ethan on 4/16/2015.
 */
Shadow = function() {
    var mgrSpec = new THREE.Color(0.992157, 0.941176, 0.807843);
    var mgrAmb = new THREE.Color(0.329412, 0.223529, 0.027451);
    var shadowMat = new THREE.MeshPhongMaterial({
        color: 0xFF0000,
        diffuse: 0xFF0000,
        ambient: mgrAmb.getHex(),
        specular: mgrSpec.getHex(),
        shininess: 27.897400
    });
    var shadowGeo = new THREE.CylinderGeometry(2.5, 2.5, 0.1, 30);
    var shadow = new THREE.Mesh(shadowGeo, shadowMat);
    return shadow;
};

Shadow.prototype = Object.create (THREE.Object3D.prototype);
Shadow.prototype.constructor = Shadow;