export default mesh => {
  const opacities = [],
    materials = mesh.material.materials ? mesh.material.materials : [mesh.material];

  for (let i = 0;i < materials.length;i ++) {
    materials[i].transparent = true;
    opacities.push(materials[i].opacity);
  }

  mesh.userData.originalOpacities = opacities;

};
