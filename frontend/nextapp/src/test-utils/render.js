import { render as rtlRender } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme";

export function render(ui, options = {}) {
  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <MantineProvider theme={theme}>{children}</MantineProvider>
    ),
    ...options,
  });
}

export * from "@testing-library/react";
