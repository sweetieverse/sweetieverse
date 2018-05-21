const fb = global.window ? window.firebase : null;

export async function setUser(id, data) {
  if (!fb) return null;
  const ref = fb.database().ref(`players/${id}`);
  return ref.update(data);
}

export async function updateUserGamepads(id, gamepads) {
  if (!fb) return null;
  const ref = fb.database().ref(`players/${id}/gamepads`);
  return ref.update(gamepads);
}
