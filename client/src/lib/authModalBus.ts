let open = false;
const listeners = new Set<(v: boolean) => void>();

export function openAuthModal() {
  open = true;
  for (const l of Array.from(listeners)) l(open);
}

export function closeAuthModal() {
  open = false;
  for (const l of Array.from(listeners)) l(open);
}

export function subscribeAuthModal(listener: (v: boolean) => void) {
  listeners.add(listener);
  listener(open);
  return () => {
    listeners.delete(listener);
  };
}
