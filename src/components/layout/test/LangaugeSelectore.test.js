// LanguageSelector.test.js
import { fireEvent, render, screen } from "@testing-library/react";
import Providers from "components/Providers";
import i18n from "dictonaries/i18n";
import { themeContext } from "hooks/context/ThemeContext";
import { I18nextProvider } from "react-i18next";
import LanguageSelector from "../main_header/SelectLanguage";

jest.mock("src/assets/images/ic_flag_ar.svg", () => "AR_Flag");
jest.mock("src/assets/images/ic_flag_en.svg", () => "EN_Flag");

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
