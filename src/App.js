import "./App.css";
import { Suspense, useState } from "react";
import i18next from "i18next";
import { initReactI18next, Trans, useTranslation } from "react-i18next";

const translationEn = {
  welcome: "Welcome!",
  sample: "Sample <bold><italics>text</italics></bold>.",
  changed: "You have changed the language {{count}} time.",
  changed_plural: "You have changed the language {{count}} times.",
}
const translationFr = {
  welcome: "Bienvenu!",
  sample: "Exemple de <bold><italics>texte</italics></bold>.",
  changed: "Vous avez changé la langue {{count}} fois."
}

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEn },
      fr: { translation: translationFr },
    },
    lng: "en",
    fallbackLang: "en",
    interpolation: { escapeValue:  false },
  });

function App() {
  const [count, setCount] = useState(0);
  const [selectedLang, setLang] = useState("en");
  const { t, i18n } = useTranslation();

  const onChange = (event) => {
    const val = event.target.value;
    setLang(val)
    setCount(prev => prev + 1);
    i18n.changeLanguage(val);
  }
  return (
    <Suspense fallback="Loading...">
      <div className="App">
        <header className="App-header">
          <h1>{t('welcome')}</h1>
          <p>
            <Trans components={{ /* tell Trans how to process tags that are seen */
              bold: <strong />,
              italics: <i />,
            }}>
              sample
            </Trans>
          </p>
          <p>
            {t('changed', { count })}
          </p>
          <select name="language" onChange={onChange} value={selectedLang}>
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
        </header>
      </div>
    </Suspense>
  );
}

export default App;
