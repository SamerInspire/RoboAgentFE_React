import { fireEvent, render } from "@testing-library/react";
import { themeContext } from "hooks/Context/ThemeContext";
import CurrentThemeSelector from "../MainHeader/DarkModeSelector";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "styles/theme";

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <ThemeProvider theme={lightTheme()}>
      <themeContext.Provider
        value={{
          direction: "rtl",
          currentTheme: lightTheme(),
          setCurrentTheme: jest.fn(),
          themeStyles: lightTheme(),
          setDirection: jest.fn(),
        }}
      >
        {ui}
      </themeContext.Provider>
    </ThemeProvider>
  );
};

describe("CurrentThemeSelector component", () => {
  test("renders without crashing", () => {
    const providerProps = {
      value: { currentTheme: "light", setCurrentTheme: jest.fn() },
    };
    const { container } = renderWithContext(<CurrentThemeSelector />, {
      providerProps,
    });
    expect(container.firstChild).toHaveClass("MuiBox-root");
  });

  test("displays the correct theme text", () => {
    const providerProps = {
      value: { currentTheme: "light", setCurrentTheme: jest.fn() },
    };
    const { getByText } = renderWithContext(<CurrentThemeSelector />, {
      providerProps,
    });
    expect(getByText("Light mode")).toBeInTheDocument();
  });

  test("displays the correct icon", () => {
    const providerProps = {
      value: { currentTheme: "light", setCurrentTheme: jest.fn() },
    };
    const { getByTestId } = renderWithContext(<CurrentThemeSelector />, {
      providerProps,
    });
    expect(getByTestId("Brightness7Icon")).toBeInTheDocument();

    providerProps.value.currentTheme = "dark";
    const { rerender } = renderWithContext(<CurrentThemeSelector />, {
      providerProps,
    });
    rerender(<CurrentThemeSelector />);
    expect(getByTestId("Brightness4Icon")).toBeInTheDocument();
  });

  test("toggles theme on click", () => {
    const setCurrentThemeMock = jest.fn();
    const providerProps = {
      value: { currentTheme: "light", setCurrentTheme: setCurrentThemeMock },
    };
    const { getByText } = renderWithContext(<CurrentThemeSelector />, {
      providerProps,
    });

    fireEvent.click(getByText("Dark mode"));
    expect(setCurrentThemeMock).toHaveBeenCalledWith("dark");

    providerProps.value.currentTheme = "dark";
    const { rerender } = renderWithContext(<CurrentThemeSelector />, {
      providerProps,
    });
    rerender(<CurrentThemeSelector />);

    fireEvent.click(getByText("Dark mode"));
    expect(setCurrentThemeMock).toHaveBeenCalledWith("light");
  });
});
