import type { Hyperlink } from '.'

export interface DisplayApp {
  /**
   * Label
   * @description The label or title of the Display Application.
   */
  label: string
  /**
   * Links
   * @description The collection of link details for this Display Application.
   */
  links: Hyperlink[]
};
