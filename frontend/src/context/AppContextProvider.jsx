import { useState } from "react";
import AppContext from "./AppContext";
// import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

let AppContextProvider = (props) => {
  // const { i18n } = useTranslation();
  let { t } = useTranslation("global");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    i18next.changeLanguage(newLang);
  };

  const languages = {
    en: "English",
    hin: "हिंदी",
    mar: "मराठी",
  };

  const screens = {
    home: {
      name: t("home.navigation.home"),
      path: "/home",
    },
    awareness: {
      name: t("home.navigation.learn_the_difference"),
      path: "/awareness",
    },
    check: {
      name: t("home.navigation.check_dbt_status"),
      path: "/check",
    },
    help_center: {
      name: t("home.navigation.help_center"),
      path: "/help-center",
    },
    community: {
      name: t("home.navigation.community"),
      path: "/community",
    },
    resources: {
      name: t("home.navigation.tools_and_resources"),
      path: "/resources",
    },
    contact: {
      name: t("home.navigation.call_and_chat_support"),
      path: "/contacts",
    }, // Add this line
  };

  // const screens = {
  //   home: "/home",
  //   awareness: "/awareness",
  //   check: "/check",
  //   chatbot: "/chatbot",
  //   community: "/community",
  //   resources: "/resources",
  //   contact: "/contact", // Add this line
  // };

  // const changeLanguage = (lang) => {
  //   i18n.changeLanguage(lang);
  //   setLanguage(lang);
  // };

  const [menuOpen, setMenuOpen] = useState(false);

  let value = {
    language,
    setLanguage,
    changeLanguage,
    loading,
    setLoading,
    languages,
    menuOpen,
    setMenuOpen,
    screens,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
