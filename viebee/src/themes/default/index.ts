import type { ThemeConfig } from "antd";

/**
 * VieBee Ant Design Heritage Theme Tokens
 * Warm Honey Gold (#d97706, #f59e0b) paired with Terracotta (#c2410c)
 * and deep Vietnamese Indigo (#1e1b4b).
 */
export const viebeeTheme: ThemeConfig = {
  token: {
    fontFamily: "'Poppins', 'Be Vietnam Pro', sans-serif",
    colorPrimary: "#d97706",
    colorInfo: "#d97706",
    colorSuccess: "#166534",
    colorWarning: "#f59e0b",
    colorError: "#b91c1c",
    colorTextBase: "#0f172a",
    colorBgBase: "#ffffff",
    borderRadius: 8,
  },
  components: {
    Button: {
      colorPrimary: "#d97706",
      colorPrimaryHover: "#b45309",
      colorPrimaryActive: "#92400e",
      borderRadius: 8,
      fontWeight: 600,
    },
    Card: {
      borderRadiusLG: 12,
    },
    Tag: {
      borderRadiusSM: 6,
    },
    Modal: {
      borderRadiusLG: 16,
    },
  },
};

export default viebeeTheme;
