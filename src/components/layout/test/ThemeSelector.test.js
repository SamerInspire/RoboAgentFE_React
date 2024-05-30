import { fireEvent, render } from "@testing-library/react";
import { themeContext } from "src/hooks/Context/ThemeContext";
import CurrentThemeSelector from "../MainHeader/DarkModeSelector";

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <themeContext.Provider {...providerProps}>{ui}</themeContext.Provider>,
    renderOptions
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

    fireEvent.click(getByText("Light mode"));
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
