import { useEventListener } from "@vueuse/core";
import { useShortcuts } from "./useShortcuts";

// Define a type for the shortcut keys
export type ShortcutKeys = {
  key: string;
  shiftKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
};

/**
 * Verify the shortcut configuration and return the combination and handler.
 * @param combination - The shortcut combination to verify.
 * @param handler - The function to execute when the shortcut is triggered.
 * @returns An object containing the combination and handler.
 */
function verifyShortcutConfig(
  combination: ShortcutKeys,
  handler: (e: KeyboardEvent) => void
) {
  const { macOS } = useShortcuts();
  let key = combination.key.toLowerCase();

  const empty = {
    _combination: null,
    _handler: null,
    hasModifier: false,
  };

  const alphabeticalKey = /^[a-z]{1}$/i.test(combination.key);

  if (!handler || !combination || !key) return empty;

  if (typeof handler !== "function") {
    console.warn("[defineShortcuts] Handler must be a function");
    return empty;
  }

  if (combination.shiftKey && !alphabeticalKey) {
    console.warn(
      "[defineShortcuts] Shift key can only be used with alphabetical keys"
    );
    return empty;
  }

  if (combination.metaKey && !macOS.value) {
    combination.metaKey = false;
    combination.ctrlKey = true;
  }

  if (key === "esc") {
    key = "escape";
  }

  if (["del", "delete"].includes(key)) {
    key = "backspace";
  }

  return {
    _combination: { ...combination, key },
    _handler: handler,
    hasModifier:
      combination.shiftKey ||
      combination.ctrlKey ||
      combination.altKey ||
      combination.metaKey,
  };
}

/**
 * Define a keyboard shortcut.
 * @param combination - The shortcut combination to define.
 * @param handler - The function to execute when the shortcut is triggered.
 */
export const defineShortcuts = (
  combination: ShortcutKeys,
  handler: (e: KeyboardEvent) => void
) => {
  const { _combination, _handler, hasModifier } = verifyShortcutConfig(
    combination,
    handler
  );
  if (!_combination || !_handler) return;

  const onKeyDown = (e: KeyboardEvent) => {
    const { usingInput } = useShortcuts();

    if (!e.key) return;

    if (!hasModifier && usingInput.value) {
      // disable shortcuts when input is focused
      return;
    }

    if (hasModifier) {
      if (e.metaKey && !_combination.metaKey) return;
      if (e.ctrlKey && !_combination.ctrlKey) return;
      if (e.altKey && !_combination.altKey) return;
      if (e.shiftKey && !_combination.shiftKey) return;

      if (e.key.toLowerCase() === _combination.key) {
        handler(e);
      }
    } else {
      // no meta key should be accepted
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (e.key === _combination.key) {
        handler(e);
      }
    }
  };

  useEventListener("keydown", onKeyDown);
};
