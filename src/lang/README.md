
# Translation Files Documentation

This folder contains all the translation files for the multilingual support system.

## How to Edit Translations

### Adding/Editing Translations

1. **English (en.json)**: Base language file - all keys should be defined here first
2. **Tamil (ta.json)**: Tamil translations
3. **Telugu (te.json)**: Telugu translations  
4. **Hindi (hi.json)**: Hindi translations
5. **Malayalam (ml.json)**: Malayalam translations
6. **Kannada (kn.json)**: Kannada translations

### File Structure

Each translation file follows this structure:

```json
{
  "nav": {
    "home": "Home",
    "about": "About Us",
    "creditHealth": "Credit Health",
    "impact": "Impact", 
    "faq": "FAQs",
    "contact": "Contact Us"
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "subtitle": "Find answers to common questions about our services",
    "stillHaveQuestions": "Still Have Questions?",
    "getInTouch": "Our team is here to help. Get in touch for personalized assistance.",
    "contactUs": "Contact Us",
    "learnServices": "Learn About Our Services",
    "questions": [
      {
        "question": "What is a Credit Score?",
        "answer": "A credit score is a 3-digit number..."
      }
    ]
  },
  "company": {
    "tagline": "REBUILD CREDIT, REGAIN YOUR FUTURE"
  }
}
```

### How to Use in Components

In your React components, use the `useLanguage` hook:

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

const MyComponent = () => {
  const { t } = useLanguage();
  
  return (
    <h1>{t('faq.title')}</h1>
  );
};
```

### Adding New Translation Keys

1. Add the key to `en.json` first
2. Add corresponding translations to all other language files
3. Use the new key in your components with `t('your.new.key')`

### Preview Languages

To preview different languages:
1. Click the language switcher in the top-right corner
2. Select any language to see the translation instantly
3. The selected language is saved in localStorage and persists across page refreshes

### Font Support

The system automatically loads appropriate fonts for each language:
- Tamil: Noto Sans Tamil
- Telugu: Noto Sans Telugu  
- Hindi: Noto Sans Devanagari
- Malayalam: Noto Sans Malayalam
- Kannada: Noto Sans Kannada
- English: System fonts

### Adding More Languages

1. Create a new JSON file in this folder (e.g., `bn.json` for Bengali)
2. Add the language info to `src/contexts/LanguageContext.tsx` in the `languages` array
3. Add font support in `src/components/FontProvider.tsx` if needed
4. Update the CSS in `src/styles/fonts.css` for the new language

### Best Practices

- Keep translation keys descriptive and hierarchical
- Always test translations in the UI to ensure proper formatting
- For long text, break it into smaller, manageable chunks
- Maintain consistency in terminology across all languages
- Consider cultural context when translating, not just literal meaning
