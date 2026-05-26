Recrée entièrement src/components/Button/Button.tsx et Button.css 
en utilisant uniquement les tokens du design system.

TAILLES :
- default : height 40px, padding vertical --spacing-small, 
  padding horizontal --spacing-medium
- compact : height 32px, padding vertical --spacing-xsmall, 
  padding horizontal --spacing-medium

TYPOGRAPHIE (les deux tailles) :
- font-family : --font-family-sans
- font-size : --typography-body-medium-strong-font-size (14px)
- font-weight : --typography-body-medium-strong-font-weight (600)
- line-height : --typography-body-medium-strong-line-height (20px)
- letter-spacing : --typography-body-medium-strong-letter-spacing

FORME :
- border-radius : --radius-small
- border-width : --border-default

COULEURS par hiérarchie :
- default : fond transparent, bordure --color-border-default, 
  texte --color-action-default-enabled
- strong : fond --color-action-default-enabled, 
  sans bordure, texte blanc
- negative : fond --color-status-negative-emphasized, 
  sans bordure, texte blanc
- brand : fond --color-content-brand-primary, 
  sans bordure, texte blanc
- minimal : fond transparent, sans bordure, 
  texte --color-action-default-enabled

ÉTATS (tous les hiérarchies) :
- hover : couleur --color-action-default-hover
- pressed : couleur --color-action-default-pressed
- focus-visible : outline --border-focus solid --color-border-focus, 
  outline-offset 2px
- disabled : opacité 0.4, pointer-events none
- loading : spinner CSS animé, label masqué, aria-busy true

LAYOUTS : text | text-icon | icon-text | icon-only
- icônes via prop "icon" (@phosphor-icons/react)
- taille icône : 16px en default, 14px en compact
- icon-only : aria-label obligatoire

Ne crée pas de nouveau fichier, modifie uniquement 
Button.tsx et Button.css existants.