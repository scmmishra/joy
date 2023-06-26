import { useEventListener } from "@vueuse/core";
import { useShortcuts } from "./useShortcuts";

// Define a type for the modifier keys
type Modifier = "meta" | "ctrl" | "shift" | "alt";

// Define a type for the shortcut keys
export type ShortcutKeys = {
  key: string;
  modifier?: Modifier;
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

  let modifier = combination.modifier?.toLowerCase();
  let key = combination.key.toLowerCase();

  const empty = {
    _combination: null,
    _handler: null,
  };

  const alphabeticalKey = /^[a-z]{1}$/i.test(combination.key);

  if (!handler || !combination || !key) return empty;

  if (typeof handler !== "function") {
    console.warn("[defineShortcuts] Handler must be a function");
    return empty;
  }

  if (modifier === "shift" && !alphabeticalKey) {
    console.warn(
      "[defineShortcuts] Shift key can only be used with alphabetical keys"
    );
    return empty;
  }

  if (modifier && !["meta", "ctrl", "shift", "alt"].includes(modifier)) {
    console.warn(
      "[defineShortcuts] Modifier must be one of: meta, ctrl, shift, alt"
    );

    return empty;
  }

  if (modifier === "meta" && !macOS.value) {
    modifier = "ctrl";
  }

  if (key === "esc") {
    key = "escape";
  }

  if (["del", "delete"].includes(key)) {
    key = "backspace";
  }

  return {
    _combination: { key, modifier },
    _handler: handler,
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
  const { usingInput } = useShortcuts();

  const { _combination, _handler } = verifyShortcutConfig(combination, handler);
  if (!_combination || !_handler) return;

  const onKeyDown = (e: KeyboardEvent) => {
    if (!e.key) return;
    console.log(e.key.toLowerCase());

    if (!_combination.modifier && usingInput.value) {
      // disable shortcuts when input is focused
      return;
    }

    if (_combination.modifier) {
      if (e.metaKey && _combination.modifier !== "meta") return;
      if (e.ctrlKey && _combination.modifier !== "ctrl") return;
      if (e.altKey && _combination.modifier !== "alt") return;
      if (e.shiftKey && _combination.modifier !== "shift") return;

      if (e.key.toLowerCase() === _combination.key) {
        handler(e);
      }
      return;
    }

    // no meta key should be accepted
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
    if (e.key === _combination.key) {
      handler(e);
    }
  };

  useEventListener("keydown", onKeyDown);
};
