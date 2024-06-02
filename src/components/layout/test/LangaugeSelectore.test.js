// LanguageSelector.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSelector from "../MainHeader/SelectLanguage";
import { themeContext } from "src/hooks/Context/ThemeContext";
import { I18nextProvider } from "react-i18next";
import i18n from "src/dictonaries/i18n";
import Providers from "src/components/Providers";

jest.mock("src/assets/Images/ic_flag_ar.svg", () => "AR_Flag");
jest.mock("src/assets/Images/ic_flag_en.svg", () => "EN_Flag");

const mockProps = {
  onOpen: jest.fn(),
  onClose: jest.fn(),
  anchorEl: null,
};

const mockThemeContextValue = {
  setDirection: jest.fn(),
};

const renderWithProviders = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <Providers>
      <I18nextProvider i18n={i18n}>
        <themeContext.Provider value={providerProps}>
          {ui}
        </themeContext.Provider>
      </I18nextProvider>
    </Providers>,

    renderOptions
  );
};

describe("LanguageSelector Component", () => {
  test("renders language button with correct flag", () => {
    const providerProps = {
      value: mockThemeContextValue,
    };

    renderWithProviders(
      <Providers>
        <LanguageSelector {...mockProps} />
      </Providers>,

      { providerProps }
    );

    const languageButton = screen.getByRole("button");
    expect(languageButton).toBeInTheDocument();

    expect(screen.getAllByAltText(/english|arabic/i)[0]).toBeInTheDocument();
  });

  // test("opens and closes the menu on button click", () => {
  //   const providerProps = {
  //     value: mockThemeContextValue,
  //   };

  //   renderWithProviders(
  //     <Providers>
  //       <LanguageSelector {...mockProps} />
  //     </Providers>,
  //     { providerProps }
  //   );

  //   const languageButton = screen.getByRole("button");
  //   fireEvent.click(languageButton);

  //   const menu = screen.getAllByAltText(/english|arabic/i)[0];
  //   expect(menu).toBeInTheDocument();

  //   // Close the menu
  //   fireEvent.click(document.body);
  //   expect(mockProps.onClose).toHaveBeenCalled();
  // });

  test("changes language and updates flag on menu item click", () => {
    const providerProps = {
      value: mockThemeContextValue,
    };

    renderWithProviders(
      <Providers>
        <LanguageSelector {...mockProps} />
      </Providers>,
      { providerProps }
    );

    const languageButton = screen.getByRole("button");
    fireEvent.click(languageButton);

    const arabicOption = screen.getByText("Arabic");
    fireEvent.click(arabicOption);

    expect(i18n.language).toBe("ar");

    renderWithProviders(
      <Providers>
        <LanguageSelector {...mockProps} />
      </Providers>,
      { providerProps }
    );
  });
});
