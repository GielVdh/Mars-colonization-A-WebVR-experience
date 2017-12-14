export default mesh => {

  const opacities = [],
    materials = mesh.material;
  console.log(materials);
  for (let i = 0;i < materials.length;i ++) {
    materials[i].transparent = true;
    opacities.push(materials[i].opacity);
  }

  mesh.userData.originalOpacities = opacities;

};
