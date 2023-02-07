import type { Namespaces, Translation, Translations } from './i18n-types';
import { baseLocale } from './i18n-util';

export type NamespaceOrRoot = Namespaces | '*';

export type TranslationForNamespace<S extends NamespaceOrRoot> =
  S extends Namespaces ? Translations[S] : Translation;

/**
 * Merges the default translation of a namespace with a given translation.
 * @note Use `*` as the namespace to merge the default translation of the root.
 */
export function mergeTranslations<
  S extends NamespaceOrRoot,
  T extends Partial<TranslationForNamespace<S>>
>(namespace: S, translation: T) {
  const baseLocaleTranslation =
    namespace === '*'
      ? require(`./${baseLocale}`).default
      : require(`./${baseLocale}/${namespace}`).default;

  return {
    ...baseLocaleTranslation,
    ...translation,
  } as T;
}
