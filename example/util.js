console.log = function(msg) {
  const preNode = document.createElement('pre');
  preNode.textContent  += `${msg}`;
  document.body.appendChild(preNode);
}
