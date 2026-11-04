const Portraits = (() => {
  const IMAGE_PATH = "images/characters/";

  function load(suspect, kind, onLoad) {
    const image = new Image();
    image.className = "photo__image";
    image.decoding = "async";
    image.alt = suspect.name + ", " + suspect.role.toLowerCase();
    image.addEventListener("load", () => onLoad(image));
    image.src = IMAGE_PATH + suspect.id + "-" + kind + ".png";
  }

  // Shows a silhouette until the drawing exists, then swaps it in.
  function fill(container, suspect, kind) {
    container.innerHTML =
      '<svg class="photo__blank" viewBox="0 0 100 100" aria-hidden="true">' +
      '<rect width="100" height="100" fill="url(#hatch-bone)" opacity=".12"/>' +
      '<circle cx="50" cy="38" r="17" fill="#e9e1cf" opacity=".16"/>' +
      '<path d="M16 100 C16 70 32 60 50 60 C68 60 84 70 84 100 Z" fill="#e9e1cf" opacity=".16"/>' +
      "</svg>";
    load(suspect, kind, (image) => container.replaceChildren(image));
  }

  // Adds a drawing on top of whatever is there once it exists.
  function layer(container, suspect, kind) {
    container.replaceChildren();
    load(suspect, kind, (image) => container.appendChild(image));
  }

  return { fill, layer };
})();
