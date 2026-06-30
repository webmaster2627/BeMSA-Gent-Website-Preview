function updateLanguageFlagAlt(lang) {

    const flagMap = {
        en: {
            src: "../../Download CI/Languageflags/English.webp",
            alt: "English"
        },
        fr: {
            src: "../../Download CI/Languageflags/french.png",
            alt: "Français"
        },
        nl: {
            src: "../../Download CI/Languageflags/OIP.webp",
            alt: "Nederlands"
        }
    };

    const flags = document.querySelectorAll(".current-language-flag");

    flags.forEach(flag => {
        if (flagMap[lang]) {
            flag.src = flagMap[lang].src;
            flag.alt = flagMap[lang].alt;
        }
    });
}

function updateLanguageFlag(lang) {

    const flagMap = {
        en: {
            src: "../Download CI/Languageflags/English.webp",
            alt: "English"
        },
        fr: {
            src: "../Download CI/Languageflags/french.png",
            alt: "Français"
        },
        nl: {
            src: "../Download CI/Languageflags/OIP.webp",
            alt: "Nederlands"
        }
    };

    const flags = document.querySelectorAll(".current-language-flag");

    flags.forEach(flag => {
        if (flagMap[lang]) {
            flag.src = flagMap[lang].src;
            flag.alt = flagMap[lang].alt;
        }
    });
}

async function setLanguage(lang) {
    // Save selected language
    localStorage.setItem("language", lang);
    updateLanguageFlag(lang);

    // Load translation file
    const response = await fetch(`TranslationFiles/lang/${lang}.json`);
    const translations = await response.json();

    // Apply translations
    document.querySelectorAll("[data-translate]").forEach(element => {
        const key = element.getAttribute("data-translate");

        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
}

// Load saved language on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem("language") || "en";

    setLanguage(savedLanguage);
});


// TranslationFiles/language.js

async function setLanguageAlt(lang) {
    // Save selected language
    localStorage.setItem("language", lang);
    updateLanguageFlagAlt(lang);

    // Determine correct path
    let path = "../TranslationFiles/lang/";

    // If page is index.html (root)
    if (
        window.location.pathname.endsWith("index.html") ||
        window.location.pathname === "/" ||
        window.location.pathname.endsWith("/website/")
    ) {
        path = "TranslationFiles/lang/";
    }

    // Load translation file
    const response = await fetch(`${path}${lang}.json`);
    const translations = await response.json();

    // Apply translations
    document.querySelectorAll("[data-translate]").forEach(element => {
        const key = element.getAttribute("data-translate");

        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
}

// Load saved language on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem("language") || "en";

    setLanguageAlt(savedLanguage);
});