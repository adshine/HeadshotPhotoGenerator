import { HeadshotStyle } from './types';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate-grey',
    name: 'Corporate Grey',
    description: 'Classic and clean, on a neutral grey backdrop.',
    prompt: 'A professional corporate headshot. The subject should be in a smart business suit or blazer. Use classic Rembrandt or butterfly lighting to create a look that is both professional and approachable. The background is a solid, neutral grey. The expression should be confident and friendly.',
    thumbnail: 'https://storage.googleapis.com/aistudio-ux-team-public/codelab-assets/headshot-makeover/corporate.jpg'
  },
  {
    id: 'tech-office',
    name: 'Modern Tech Office',
    description: 'A contemporary look with a blurred office background.',
    prompt: 'A modern, approachable headshot. The subject is in business-casual attire. The setting is a bright, contemporary tech office, but the background should be softly blurred to keep the focus on the person. The lighting should appear natural, as if from a large window.',
    thumbnail: 'https://storage.googleapis.com/aistudio-ux-team-public/codelab-assets/headshot-makeover/tech.jpg'
  },
  {
    id: 'outdoor-natural',
    name: 'Outdoor Natural',
    description: 'Friendly and approachable with soft, natural lighting.',
    prompt: 'An outdoor headshot taken during the golden hour for warm, flattering light. The subject is in casual-professional clothing. The background should be pleasant, out-of-focus greenery or a simple park setting with a soft, creamy bokeh.',
    thumbnail: 'https://storage.googleapis.com/aistudio-ux-team-public/codelab-assets/headshot-makeover/outdoor.jpg'
  },
  {
    id: 'black-and-white',
    name: 'Artistic B&W',
    description: 'A dramatic and timeless monochrome portrait.',
    prompt: `Create a fine art, minimalist, and moody black and white studio portrait. The composition should be a tight head-and-shoulders shot with a shallow depth of field, creating a smoothly blurred, dark gray gradient background. Use a soft, directional key light from one side to produce dramatic, sculpted shadows on the cheeks and jawline (a chiaroscuro effect) with medium-high contrast. The monochrome toning should be neutral, with rich midtones and preserved detail in the highlights. Crucially, preserve the natural, high-detail skin texture with only subtle cleanup. The final image must be a powerful, soulful, and timeless portrait. Avoid busy backgrounds, harsh specular hotspots, and over-smoothed skin.`,
    thumbnail: 'https://storage.googleapis.com/aistudio-ux-team-public/codelab-assets/headshot-makeover/b_and_w.jpg'
  },
  {
    id: 'studio-warm',
    name: 'Warm Studio',
    description: 'A welcoming portrait with warm-toned lighting.',
    prompt: 'A warm and inviting studio headshot. Use a single warm key light to create a friendly and intimate atmosphere. The background should be a simple, dark-colored (brown, deep red, or navy) textured backdrop. The subject should have a relaxed and genuine smile.',
    thumbnail: 'https://storage.googleapis.com/aistudio-ux-team-public/codelab-assets/headshot-makeover/warm.jpg'
  },
  {
    id: 'retro-filter',
    name: 'Retro Filter',
    description: 'A vintage-inspired look with a retro color palette.',
    prompt: 'A headshot with a distinct retro or vintage film aesthetic. The color palette should be warm, with slightly desaturated tones reminiscent of 1970s film stock. Add a subtle grain and perhaps a hint of lens flare to enhance the nostalgic feel. The subject\'s attire should subtly complement the vintage mood.',
    thumbnail: 'https://storage.googleapis.com/aistudio-ux-team-public/codelab-assets/headshot-makeover/retro.jpg'
  },
];